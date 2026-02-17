import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { CASINO_AFFILIATE_QUERY } from "@/sanity/lib/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const readClient = createClient({ projectId, dataset, apiVersion, useCdn: false });
  const casino = await readClient.fetch(CASINO_AFFILIATE_QUERY, { slug });

  if (!casino?.affiliateLink) {
    return NextResponse.redirect(new URL("/casinos", request.url));
  }

  const writeToken = process.env.SANITY_WRITE_TOKEN;
  if (writeToken) {
    const writeClient = createClient({ projectId, dataset, apiVersion, token: writeToken, useCdn: false });
    writeClient.patch(casino._id).inc({ clicks: 1 }).commit().catch(() => {});
  }

  return NextResponse.redirect(casino.affiliateLink);
}
