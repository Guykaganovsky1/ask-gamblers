import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogPost } from "@/sanity/lib/types";
import { BlogCard } from "@/components/ui/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "בלוג | קזינו רז",
  description: "מאמרים, מדריכים וטיפים לעולם הקזינו האונליין",
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(POSTS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading>בלוג</SectionHeading>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post._id} {...post} index={i} />
        ))}
      </div>
    </div>
  );
}
