import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const SEO_PLATFORM_URL = process.env.SEO_PLATFORM_URL || 'http://localhost:3003';
const SITE_ID = process.env.SEO_SITE_ID || '';
const API_KEY = process.env.SEO_PLATFORM_API_KEY || '';

interface SitemapItem {
  slug: string;
  _updatedAt: string;
}

interface SitemapContent {
  casinos: SitemapItem[];
  posts: SitemapItem[];
  categories: SitemapItem[];
}

interface ScanRequestBody {
  pages?: unknown;
}

interface ScanPlatformResponse {
  analysis?: {
    score?: number;
    issues?: unknown[];
  };
}

interface ScanResult {
  url: string;
  score?: number;
  issues?: number;
  error?: string;
}

const SITEMAP_QUERY = groq`
  {
    "casinos": *[_type == "casino" && defined(slug.current)]{
      'slug': slug.current,
      _updatedAt
    },
    "posts": *[_type == "post" && defined(slug.current)]{
      'slug': slug.current,
      _updatedAt
    },
    "categories": *[_type == "category" && defined(slug.current)]{
      'slug': slug.current,
      _updatedAt
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScanRequestBody;
    const { pages: requestedPages } = body;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://askgamblers.co.il';
    
    let pagesToScan: string[] = [];

    if (requestedPages && Array.isArray(requestedPages) && requestedPages.every((page): page is string => typeof page === 'string')) {
      pagesToScan = requestedPages;
    } else {
      const content = await client.fetch<SitemapContent>(SITEMAP_QUERY);
      
      pagesToScan = [
        siteUrl,
        `${siteUrl}/casinos`,
        `${siteUrl}/blog`,
        `${siteUrl}/bonuses`,
        `${siteUrl}/games`,
        ...content.casinos.map((c) => `${siteUrl}/casinos/${c.slug}`),
        ...content.posts.map((p) => `${siteUrl}/blog/${p.slug}`),
        ...content.categories.map((c) => `${siteUrl}/categories/${encodePathSegment(c.slug)}`),
      ];
    }

    const batchSize = 5;
    const results: ScanResult[] = [];

    for (let i = 0; i < pagesToScan.length; i += batchSize) {
      const batch = pagesToScan.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(async (url) => {
          try {
            const response = await fetch(`${SEO_PLATFORM_URL}/api/sites/scan`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` }),
              },
              body: JSON.stringify({
                siteId: SITE_ID,
                url,
              }),
            });

            if (!response.ok) {
              return { url, error: `Scan failed: ${response.status}` };
            }

            const data = (await response.json()) as ScanPlatformResponse;
            return { url, score: data.analysis?.score, issues: data.analysis?.issues?.length };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown scan error';
            return { url, error: message };
          }
        })
      );

      results.push(...batchResults);
      
      if (i + batchSize < pagesToScan.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => !r.error).length;
    const avgScore = results
      .filter(r => r.score !== undefined)
      .reduce((acc, r) => acc + (r.score || 0), 0) / successCount || 0;

    return NextResponse.json({
      total: pagesToScan.length,
      scanned: successCount,
      failed: results.filter(r => r.error).length,
      averageScore: Math.round(avgScore),
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown scan trigger error';
    console.error('Scan trigger error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function encodePathSegment(value: string) {
  return encodeURIComponent(value).replace(/'/g, '%27');
}

export async function GET() {
  try {
    const response = await fetch(`${SEO_PLATFORM_URL}/api/sites/recommendations?siteId=${SITE_ID}`, {
      headers: {
        ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` }),
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown recommendations error';
    console.error('Get recommendations error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
