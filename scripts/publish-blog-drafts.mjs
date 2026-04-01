#!/usr/bin/env node
/**
 * Bulk-publish blog drafts from docs/blog-drafts/ to Sanity.
 * Parses metadata + markdown body from each file, creates draft documents,
 * then publishes them.
 *
 * Usage: node scripts/publish-blog-drafts.mjs [--dry-run]
 */

import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

dotenv.config({ path: join(projectRoot, '.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const AUTHOR_ID = 'author-raz';

// ── Parse a blog draft markdown file ──────────────────────────────
function parseDraft(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const parts = raw.split(/\n---\n/);
  const metaSection = parts[0];
  const contentSection = parts.slice(1).join('\n---\n').trim();

  const get = (key) => {
    const re = new RegExp(`\\*\\*${key}:\\*\\*\\s*(.+)`, 'i');
    const m = metaSection.match(re);
    return m ? m[1].trim() : null;
  };

  const title = get('title');
  const slug = get('slug');
  const seoTitle = get('seoTitle');
  const seoDescription = get('seoDescription');
  const targetKeyword = get('targetKeyword');
  const isMegaGuide = get('isMegaGuide') === 'true';
  const estimatedReadTime = parseInt(get('estimatedReadTime') || '0', 10);

  let keywords = [];
  const kwMatch = metaSection.match(/\*\*keywords:\*\*\s*\[([^\]]+)\]/i);
  if (kwMatch) {
    keywords = kwMatch[1].split(',').map((k) => k.trim().replace(/^["']|["']$/g, ''));
  }

  let body = contentSection;
  const contentStart = body.indexOf('\n\n');
  if (contentStart !== -1) {
    const firstLine = body.substring(0, contentStart);
    if (firstLine.startsWith('## Content')) {
      body = body.substring(contentStart + 2);
    }
  }

  return { title, slug, seoTitle, seoDescription, targetKeyword, keywords, isMegaGuide, estimatedReadTime, body };
}

// ── Convert markdown to Sanity Portable Text blocks ───────────────
let keyCounter = 0;
function randomKey() {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;
}

function parseInlineMarks(text) {
  const spans = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ _type: 'span', _key: randomKey(), text: text.substring(lastIndex, match.index), marks: [] });
    }
    if (match[2]) {
      spans.push({ _type: 'span', _key: randomKey(), text: match[2], marks: ['strong'] });
    } else if (match[3]) {
      spans.push({ _type: 'span', _key: randomKey(), text: match[3], marks: ['em'] });
    } else if (match[4] && match[5]) {
      const linkKey = `link-${randomKey()}`;
      spans.push({ _type: 'span', _key: randomKey(), text: match[4], marks: [linkKey] });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    spans.push({ _type: 'span', _key: randomKey(), text: text.substring(lastIndex), marks: [] });
  }

  if (spans.length === 0) {
    return [{ _type: 'span', _key: randomKey(), text, marks: [] }];
  }
  return spans;
}

function extractLinkDefs(text) {
  const defs = [];
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    defs.push({ _type: 'link', _key: `link-${randomKey()}`, href: match[2] });
  }
  return defs;
}

function markdownToPortableText(md) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;

  const textBlock = (text, style = 'normal') => ({
    _type: 'block', _key: randomKey(), style,
    children: parseInlineMarks(text),
    markDefs: extractLinkDefs(text),
  });

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }
    if (/^\[(?:כאן|חזור|הערה|CTA|קישור פנימי)/.test(line.trim())) { i++; continue; }

    const h4 = line.match(/^####\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);

    if (h4) { blocks.push(textBlock(h4[1], 'h4')); i++; continue; }
    if (h3) { blocks.push(textBlock(h3[1], 'h3')); i++; continue; }
    if (h2) { blocks.push(textBlock(h2[1], 'h2')); i++; continue; }

    // Table rows → plain text
    if (line.trim().startsWith('|')) {
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i].trim();
        if (!/^\|[\s-|]+\|$/.test(row)) {
          const cells = row.split('|').filter(Boolean).map((c) => c.trim()).join(' | ');
          blocks.push(textBlock(cells));
        }
        i++;
      }
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const t = line.replace(/^\d+\.\s+/, '');
      blocks.push({ _type: 'block', _key: randomKey(), style: 'normal', listItem: 'number', level: 1, children: parseInlineMarks(t), markDefs: extractLinkDefs(t) });
      i++; continue;
    }

    if (/^[-*]\s/.test(line)) {
      const t = line.replace(/^[-*]\s+/, '');
      blocks.push({ _type: 'block', _key: randomKey(), style: 'normal', listItem: 'bullet', level: 1, children: parseInlineMarks(t), markDefs: extractLinkDefs(t) });
      i++; continue;
    }

    // Regular paragraph
    let para = line;
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/^#{2,4}\s/) && !lines[i].match(/^[-*]\s/) && !lines[i].match(/^\d+\.\s/) && !lines[i].trim().startsWith('|')) {
      para += ' ' + lines[i].trim();
      i++;
    }
    blocks.push(textBlock(para.trim()));
  }

  return blocks;
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  const draftsDir = join(projectRoot, 'docs', 'blog-drafts');
  const files = readdirSync(draftsDir).filter((f) => f.endsWith('.md')).sort();

  console.log(`Found ${files.length} blog drafts\n`);

  const existingSlugs = await client.fetch(`*[_type == "post"]{"slug": slug.current}`);
  const slugSet = new Set(existingSlugs.map((p) => p.slug));

  const created = [];
  const skipped = [];

  for (const file of files) {
    const draft = parseDraft(join(draftsDir, file));

    if (!draft.title || !draft.slug) {
      console.log(`  Skipping ${file} - missing title or slug`);
      skipped.push(file);
      continue;
    }

    if (slugSet.has(draft.slug)) {
      console.log(`  Skipping ${file} - slug "${draft.slug}" already exists`);
      skipped.push(file);
      continue;
    }

    const body = markdownToPortableText(draft.body);

    const doc = {
      _type: 'post',
      title: draft.title,
      slug: { _type: 'slug', current: draft.slug },
      seoTitle: draft.seoTitle,
      seoDescription: draft.seoDescription ? draft.seoDescription.substring(0, 160) : undefined,
      targetKeyword: draft.targetKeyword,
      keywords: draft.keywords,
      isMegaGuide: draft.isMegaGuide,
      estimatedReadTime: draft.estimatedReadTime || undefined,
      publishedAt: new Date().toISOString(),
      author: { _type: 'reference', _ref: AUTHOR_ID },
      body,
    };

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would create: "${draft.title}" (${draft.slug})`);
      created.push({ file, title: draft.title, slug: draft.slug });
      continue;
    }

    try {
      const result = await client.create(doc);
      console.log(`  Created: "${draft.title}" -> ${result._id}`);
      created.push({ file, title: draft.title, slug: draft.slug, id: result._id });
      slugSet.add(draft.slug);
    } catch (err) {
      console.error(`  Failed: ${file} - ${err.message}`);
      skipped.push(file);
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Created: ${created.length} | Skipped: ${skipped.length}`);

  if (created.length > 0 && !DRY_RUN) {
    console.log('\nNew post URLs:');
    for (const post of created) {
      console.log(`  https://askgamblers.co.il/blog/${post.slug}`);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
