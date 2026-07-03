#!/usr/bin/env node
/**
 * Import daily casino/igaming news from public RSS feeds into Sanity.
 *
 * The script writes source-attributed summaries, not copied articles.
 * Usage: node scripts/import-casino-news.mjs [--dry-run] [--limit 5]
 */

import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

loadEnvFile(join(projectRoot, ".env.local"));
loadEnvFile(join(projectRoot, ".env"));

const DRY_RUN = process.argv.includes("--dry-run");
const LIMIT = getNumberArg("--limit", Number(process.env.NEWS_IMPORT_LIMIT || 5));
const MAX_AGE_DAYS = Number(process.env.NEWS_IMPORT_MAX_AGE_DAYS || 7);
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;

const AUTHOR_ID = "author-newsdesk";
const CATEGORY_ID = "cat-news";

const FEEDS = [
  { name: "Casino.org", url: "https://www.casino.org/news/feed/" },
  { name: "GamblingNews", url: "https://www.gamblingnews.com/feed/" },
  { name: "World Casino News", url: "https://news.worldcasinodirectory.com/feed/" },
  { name: "Yogonet", url: "https://www.yogonet.com/international/rss.xml" },
];

const RELEVANT_KEYWORDS = [
  "casino",
  "casinos",
  "gambling",
  "gaming",
  "igaming",
  "slot",
  "slots",
  "roulette",
  "blackjack",
  "poker",
  "baccarat",
  "jackpot",
  "bonus",
  "bonuses",
  "sportsbook",
  "betting",
  "operator",
  "license",
  "regulated",
  "regulation",
  "launch",
  "launches",
  "payment",
  "withdrawal",
  "deposit",
  "supplier",
  "studio",
  "live dealer",
  "responsible gambling",
  "player protection",
];

const BLOCKED_KEYWORDS = [
  "murder",
  "stabbing",
  "shooting",
  "assault",
  "flight passenger",
  "weapon",
  "deadly",
];

main().catch((error) => {
  console.error("Fatal import error:", error);
  process.exit(1);
});

async function main() {
  const rawItems = [];

  for (const feed of FEEDS) {
    const items = await fetchFeed(feed);
    console.log(`[${feed.name}] ${items.length} RSS items`);
    rawItems.push(...items);
  }

  const selected = selectItems(rawItems, LIMIT);
  console.log(`Selected ${selected.length} relevant items for import`);

  if (selected.length === 0) {
    console.log("No relevant casino news found today.");
    return;
  }

  const analyses = selected.map(buildNewsSummary);
  const posts = selected
    .map((item, index) => buildPostDocument(item, analyses[index]))
    .filter(Boolean);

  if (DRY_RUN) {
    for (const post of posts) {
      console.log(`[DRY RUN] ${post.title} -> /blog/${post.slug.current}`);
      console.log(`          source: ${post.sourceName} ${post.sourceUrl}`);
    }
    return;
  }

  await mutateSanity(posts);
  console.log(`Imported ${posts.length} source-attributed news posts.`);
}

async function fetchFeed(feed) {
  try {
    const response = await fetch(feed.url, {
      headers: {
        accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "user-agent": "AskGamblers.co.il news monitor (+https://askgamblers.co.il)",
      },
    });

    if (!response.ok) {
      console.warn(`[${feed.name}] skipped: HTTP ${response.status}`);
      return [];
    }

    const xml = await response.text();
    return parseFeed(xml, feed.name);
  } catch (error) {
    console.warn(`[${feed.name}] skipped: ${error.message}`);
    return [];
  }
}

function parseFeed(xml, sourceName) {
  const rssItems = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const atomItems = rssItems.length > 0
    ? []
    : [...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  const items = rssItems.length > 0 ? rssItems : atomItems;

  return items
    .map((item) => normaliseFeedItem(item, sourceName))
    .filter((item) => item.title && item.url);
}

function normaliseFeedItem(item, sourceName) {
  const title = cleanText(extractTag(item, "title"));
  const description = cleanText(
    extractTag(item, "description") || extractTag(item, "summary") || extractTag(item, "content:encoded")
  );
  const link = cleanUrl(extractTag(item, "link") || extractAtomLink(item));
  const pubDate = extractTag(item, "pubDate") || extractTag(item, "published") || extractTag(item, "updated");
  const sourcePublishedAt = parseDate(pubDate);

  return {
    id: hashId(link || `${sourceName}:${title}`),
    title,
    description,
    url: link,
    sourceName,
    sourcePublishedAt,
  };
}

function selectItems(items, limit) {
  const seen = new Set();
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const maxPerSource = Math.max(1, Math.ceil(limit / 3));

  const scored = items
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .filter((item) => item.score > 0)
    .filter((item) => !item.sourcePublishedAt || new Date(item.sourcePublishedAt).getTime() >= cutoff)
    .filter((item) => {
      const key = item.url || item.title.toLocaleLowerCase("en-US");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.sourcePublishedAt || 0).getTime() - new Date(a.sourcePublishedAt || 0).getTime();
    });

  const selected = [];
  const sourceCounts = new Map();

  for (const item of scored) {
    const count = sourceCounts.get(item.sourceName) || 0;
    if (count >= maxPerSource) continue;
    selected.push(item);
    sourceCounts.set(item.sourceName, count + 1);
    if (selected.length === limit) return selected;
  }

  for (const item of scored) {
    if (selected.some((selectedItem) => selectedItem.url === item.url)) continue;
    selected.push(item);
    if (selected.length === limit) return selected;
  }

  return selected;
}

function scoreItem(item) {
  const text = `${item.title} ${item.description}`.toLocaleLowerCase("en-US");

  if (BLOCKED_KEYWORDS.some((keyword) => text.includes(keyword))) return 0;

  let score = 0;
  for (const keyword of RELEVANT_KEYWORDS) {
    if (text.includes(keyword)) score += item.title.toLocaleLowerCase("en-US").includes(keyword) ? 2 : 1;
  }

  if (/casino|igaming|gambling|gaming|slots?|poker|roulette|blackjack|baccarat/.test(text)) score += 2;
  if (/launch|releases?|bonus|jackpot|license|regulat|payment|withdrawal|operator/.test(text)) score += 1;

  return score >= 3 ? score : 0;
}

function buildPostDocument(item, analysis) {
  const slug = `news-${dateSlug(new Date())}-${slugify(item.title).slice(0, 58) || item.id}`;

  return {
    _id: `imported-casino-news-${item.id}`,
    _type: "post",
    title: analysis.titleHebrew,
    slug: { _type: "slug", current: slug },
    author: { _type: "reference", _ref: AUTHOR_ID },
    categories: [{ _type: "reference", _ref: CATEGORY_ID, _key: `cat-${item.id.slice(0, 8)}` }],
    publishedAt: new Date().toISOString(),
    body: buildBody(item, analysis),
    summaryAnswer: analysis.summaryAnswer,
    seoTitle: truncate(analysis.seoTitle, 65),
    seoDescription: truncate(analysis.seoDescription, 170),
    targetKeyword: "חדשות קזינו",
    keywords: analysis.keywords,
    estimatedReadTime: 2,
    sourceName: item.sourceName,
    sourceUrl: item.url,
    sourcePublishedAt: item.sourcePublishedAt,
    importedAt: new Date().toISOString(),
    newsSourceId: item.id,
  };
}

function buildBody(item, analysis) {
  return [
    block("תקציר", "h2"),
    block(analysis.summaryAnswer),
    block("מה חשוב לדעת", "h2"),
    ...analysis.takeaways.slice(0, 4).map((takeaway) => block(takeaway, "normal", [], { listItem: "bullet", level: 1 })),
    block("למה זה רלוונטי", "h2"),
    block(analysis.whyItMatters),
    block("מקור וקריאה נוספת", "h2"),
    linkedBlock(`הסיכום מבוסס על עדכון שפורסם ב-${item.sourceName}. `, "קראו את המקור המלא", item.url, "."),
    block("המידע נכתב כסיכום חדשותי קצר על בסיס פיד RSS ציבורי וקישור למקור. תנאי בונוסים, זמינות משחקים ורגולציה עשויים להשתנות, ולכן תמיד כדאי לבדוק את המקור ואת תנאי האתר לפני כל החלטה."),
  ];
}

async function mutateSanity(posts) {
  if (!PROJECT_ID || !WRITE_TOKEN) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
  }

  const mutations = [
    {
      createIfNotExists: {
        _id: CATEGORY_ID,
        _type: "category",
        title: "חדשות",
        name: "חדשות",
        slug: { _type: "slug", current: "news" },
        description: "סיכומי חדשות קזינו ואייגיימינג ממקורות ציבוריים עם קישור למקור.",
      },
    },
    {
      createIfNotExists: {
        _id: AUTHOR_ID,
        _type: "author",
        name: "מערכת Ask Gamblers",
        slug: { _type: "slug", current: "ask-gamblers-newsdesk" },
        role: "עורך חדשות",
        credentials: "סיכומי חדשות ממקורות ציבוריים עם קישור למקור",
      },
    },
    ...posts.map((post) => ({ createIfNotExists: post })),
  ];

  const response = await fetch(`https://${PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${WRITE_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Sanity mutation failed: HTTP ${response.status} ${body}`);
  }
}

function buildNewsSummary(item) {
  const description = item.description || item.title;
  const cleanDescription = truncate(description, 220);
  const topic = detectTopic(item);
  const sourceDate = item.sourcePublishedAt
    ? new Date(item.sourcePublishedAt).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" })
    : "בימים האחרונים";
  const summary = `${item.sourceName} פרסם ${sourceDate} עדכון בנושא ${topic}. הכותרת המקורית: "${truncate(item.title, 140)}". ${cleanDescription}`;

  return {
    titleHebrew: truncate(`עדכון ${topic}: ${item.title}`, 95),
    seoTitle: truncate(`חדשות קזינו: ${item.title}`, 65),
    seoDescription: truncate(summary, 170),
    summaryAnswer: summary,
    excerpt: cleanDescription,
    takeaways: [
      `העדכון הגיע ממקור חיצוני: ${item.sourceName}.`,
      `הנושא המרכזי הוא ${topic}, ולכן הוא עשוי להיות רלוונטי למעקב אחרי שוק הקזינו והאייגיימינג.`,
      "יש לבדוק את המקור ואת תנאי האתר לפני הסקת מסקנות מעשיות.",
    ],
    whyItMatters: "חדשות בתחום הקזינו משתנות במהירות ומשפיעות על זמינות משחקים, מבצעים, רגולציה ותנאי שימוש. הסיכום נועד לתת הקשר קצר ולהפנות למקור המלא.",
    keywords: ["חדשות קזינו", "קזינו אונליין", "אייגיימינג", topic, "משחק אחראי"],
  };
}

function detectTopic(item) {
  const text = `${item.title} ${item.description}`.toLocaleLowerCase("en-US");
  if (/slot|slots|game|games|studio|supplier|developer/.test(text)) return "משחקים חדשים";
  if (/bonus|promotion|free spins|jackpot|prize|tournament/.test(text)) return "בונוסים ומבצעים";
  if (/license|regulat|law|bill|ban|compliance|responsible/.test(text)) return "רגולציה ומשחק אחראי";
  if (/operator|launch|brand|market|platform|casino/.test(text)) return "מפעילים וקזינו אונליין";
  if (/payment|withdrawal|deposit|banking/.test(text)) return "תשלומים ומשיכות";
  if (/sportsbook|betting|sport/.test(text)) return "הימורי ספורט";
  return "קזינו ואייגיימינג";
}

function block(text, style = "normal", markDefs = [], extra = {}) {
  return {
    _type: "block",
    _key: randomKey(),
    style,
    markDefs,
    children: [{ _type: "span", _key: randomKey(), text, marks: [] }],
    ...extra,
  };
}

function linkedBlock(prefix, anchorText, href, suffix = "") {
  const markKey = `link-${randomKey()}`;
  return {
    _type: "block",
    _key: randomKey(),
    style: "normal",
    markDefs: [{ _type: "link", _key: markKey, href }],
    children: [
      { _type: "span", _key: randomKey(), text: prefix, marks: [] },
      { _type: "span", _key: randomKey(), text: anchorText, marks: [markKey] },
      { _type: "span", _key: randomKey(), text: suffix, marks: [] },
    ],
  };
}

function extractTag(xml, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? stripCdata(match[1]) : "";
}

function extractAtomLink(xml) {
  const match = xml.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return match ? match[1] : "";
}

function cleanText(value) {
  return decodeEntities(stripCdata(value))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/The post[\s\S]*?appeared first on[\s\S]*?\.?$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanUrl(value) {
  const url = decodeEntities(stripCdata(value)).trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (key.startsWith("utm_") || key === "fbclid" || key === "gclid") parsed.searchParams.delete(key);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function parseDate(value) {
  const time = Date.parse(decodeEntities(value || ""));
  return Number.isNaN(time) ? undefined : new Date(time).toISOString();
}

function decodeEntities(value = "") {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    ndash: "-",
    mdash: "-",
    hellip: "...",
  };

  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, key) => named[key.toLocaleLowerCase("en-US")] ?? match);
}

function stripCdata(value = "") {
  return value.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "");
}

function hashId(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function slugify(value) {
  return decodeEntities(value)
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function dateSlug(date) {
  return date.toISOString().slice(0, 10);
}

function truncate(value = "", maxLength) {
  const clean = String(value).replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}…`;
}

function randomKey() {
  return `k${Math.random().toString(36).slice(2, 10)}`;
}

function getNumberArg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  const value = Number(process.argv[index + 1]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/i);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}
