import { execFile } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.DEPLOY_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appDir = "/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html";

  // Fire-and-forget: run deploy.sh in background, log to /tmp/deploy.log
  execFile("bash", ["-c", `cd ${appDir} && bash deploy.sh > /tmp/deploy.log 2>&1 &`]);

  return NextResponse.json({ ok: true, message: "Deploy started" });
}
