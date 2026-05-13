import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const SEO_PLATFORM_KEY = process.env.SEO_PLATFORM_API_KEY || '';

interface ContentExport {
  casinos: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
  posts: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  categories: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
}

interface SeoWebhookBody {
  action?: string;
  data?: {
    recommendations?: unknown[];
    [key: string]: unknown;
  };
}

const CONTENT_QUERY = groq`
  {
    "casinos": *[_type == "casino" && defined(slug.current)]{
      _id,
      name,
      'slug': slug.current,
      description,
      seoDescription,
      _updatedAt
    },
    "posts": *[_type == "post" && defined(slug.current)]{
      _id,
      title,
      'slug': slug.current,
      "excerpt": coalesce(seoDescription, pt::text(body)[0..160]),
      _updatedAt
    },
    "categories": *[_type == "category" && defined(slug.current)]{
      _id,
      "title": coalesce(name, title),
      'slug': slug.current,
      description,
      _updatedAt
    }
  }
`;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${SEO_PLATFORM_KEY}`;
  
  if (SEO_PLATFORM_KEY && authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await client.fetch<ContentExport>(CONTENT_QUERY);
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://askgamblers.co.il';
    
    const pages = [
      { type: 'homepage', url: siteUrl, priority: 1 },
      ...content.casinos.map((c) => ({
        type: 'casino',
        url: `${siteUrl}/casinos/${c.slug}`,
        id: c._id,
        title: c.name,
        priority: 0.8,
      })),
      ...content.posts.map((p) => ({
        type: 'post',
        url: `${siteUrl}/blog/${p.slug}`,
        id: p._id,
        title: p.title,
        priority: 0.6,
      })),
      ...content.categories.map((c) => ({
        type: 'category',
        url: `${siteUrl}/categories/${encodePathSegment(c.slug)}`,
        id: c._id,
        title: c.title,
        priority: 0.5,
      })),
    ];

    return NextResponse.json({
      site: {
        url: siteUrl,
        name: 'Ask Gamblers',
        lastUpdated: new Date().toISOString(),
      },
      pages,
      stats: {
        totalCasinos: content.casinos.length,
        totalPosts: content.posts.length,
        totalCategories: content.categories.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown content export error';
    console.error('Content export error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function encodePathSegment(value: string) {
  return encodeURIComponent(value).replace(/'/g, '%27');
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${SEO_PLATFORM_KEY}`;
  
  if (SEO_PLATFORM_KEY && authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SeoWebhookBody;
    const { action, data } = body;

    switch (action) {
      case 'recommendations':
        console.log('[SEO] Received recommendations:', data);
        return NextResponse.json({ 
          received: true, 
          count: data?.recommendations?.length || 0 
        });

      case 'alerts':
        console.log('[SEO] Received alert:', data);
        return NextResponse.json({ received: true });

      case 'sync':
        return NextResponse.json({ 
          status: 'ready',
          lastSync: new Date().toISOString(),
        });

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    console.error('Webhook error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
