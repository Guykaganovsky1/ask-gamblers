import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body?._type;

    switch (type) {
      case "casino":
        revalidatePath("/casinos");
        revalidatePath(`/casinos/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      case "post":
        revalidatePath("/blog");
        revalidatePath(`/blog/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      case "category":
        revalidatePath("/categories");
        revalidatePath(`/categories/${body?.slug?.current}`);
        revalidatePath("/");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
