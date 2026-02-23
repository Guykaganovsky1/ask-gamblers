const SEO_PLATFORM_URL = process.env.SEO_PLATFORM_URL || 'http://localhost:3003';
const SITE_ID = process.env.SEO_SITE_ID || '';
const API_KEY = process.env.SEO_PLATFORM_API_KEY || '';

export interface SEOScanResult {
  url: string;
  score: number;
  issues: Array<{
    type: string;
    category: string;
    message: string;
    severity: number;
    recommendation: string;
  }>;
}

export interface SEORecommendation {
  type: 'keyword' | 'content' | 'technical' | 'backlink' | 'structure';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  data?: Record<string, any>;
}

export async function triggerScan(pages?: string[]): Promise<{
  total: number;
  scanned: number;
  averageScore: number;
}> {
  const response = await fetch('/api/seo-integration/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pages }),
  });

  if (!response.ok) {
    throw new Error('Scan failed');
  }

  return response.json();
}

export async function getRecommendations(): Promise<{
  recommendations: SEORecommendation[];
  summary: {
    totalIssues: number;
    avgScore: number;
    pagesAnalyzed: number;
  };
}> {
  const response = await fetch('/api/seo-integration/scan');

  if (!response.ok) {
    throw new Error('Failed to get recommendations');
  }

  return response.json();
}

export async function sendWebhook(event: string, data: Record<string, any>): Promise<void> {
  if (!SEO_PLATFORM_URL || !SITE_ID) {
    console.warn('[SEO] Platform not configured');
    return;
  }

  try {
    await fetch(`${SEO_PLATFORM_URL}/api/sites/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` }),
      },
      body: JSON.stringify({
        siteId: SITE_ID,
        event,
        data,
      }),
    });
  } catch (error) {
    console.error('[SEO] Webhook failed:', error);
  }
}

export function calculateContentScore(content: {
  title?: string;
  metaDescription?: string;
  h1?: string;
  wordCount?: number;
  images?: number;
  imagesWithAlt?: number;
}): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  if (!content.title) {
    issues.push('Missing title');
    score -= 15;
  } else if (content.title.length < 30 || content.title.length > 60) {
    issues.push('Title length not optimal (30-60 chars)');
    score -= 5;
  }

  if (!content.metaDescription) {
    issues.push('Missing meta description');
    score -= 10;
  } else if (content.metaDescription.length < 120 || content.metaDescription.length > 160) {
    issues.push('Meta description length not optimal (120-160 chars)');
    score -= 5;
  }

  if (!content.h1) {
    issues.push('Missing H1');
    score -= 12;
  }

  if (content.wordCount && content.wordCount < 300) {
    issues.push('Low word count');
    score -= 8;
  }

  if (content.images && content.imagesWithAlt !== undefined) {
    const missingAlt = content.images - content.imagesWithAlt;
    if (missingAlt > 0) {
      issues.push(`${missingAlt} images missing alt text`);
      score -= Math.min(missingAlt * 2, 10);
    }
  }

  return { score: Math.max(0, score), issues };
}
