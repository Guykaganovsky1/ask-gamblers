import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, FEATURED_CASINOS_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Casino } from "@/sanity/lib/types";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "חדשות | קזינו רז",
  description: "חדשות קזינו, טיפים ומדריכים של משחקי הימור אונליין",
};

async function getNewsData() {
  try {
    const [posts, casinos] = await Promise.all([
      client.fetch<BlogPost[]>(POSTS_QUERY),
      client.fetch<Casino[]>(FEATURED_CASINOS_QUERY),
    ]);
    return {
      posts: posts ?? [],
      casinos: casinos ?? [],
    };
  } catch {
    return { posts: [], casinos: [] };
  }
}

export default async function NewsPage() {
  const { posts, casinos } = await getNewsData();
  const recentPosts = posts.slice(0, 5);
  const topCasinos = casinos.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-text-primary mb-4">
            חדשות קזינו
          </h1>
          <div className="w-24 h-1 bg-accent rounded-full" />
          <p className="text-text-muted mt-4 text-lg">
            עדכוני חדשות, מדריכים וטיפים מהעולם של קזינו אונליין
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Articles Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {posts.map((post, i) => (
                <article
                  key={post._id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-card/40 border border-border-glass/30 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-transparent">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage.url || `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.featuredImage.asset._ref.replace('image-', '').replace(/-(\w{4})$/, '.$1')}`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-accent/10 to-accent/5">
                        📰
                      </div>
                    )}
                    {/* Category Tag */}
                    {post.categories && post.categories[0] && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-accent/90 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        {post.categories[0].name}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-5 gap-3">
                    <div className="flex items-center gap-3 text-xs text-text-muted/70 font-medium">
                      <time dateTime={post.publishedAt}>
                        {post.publishedAt
                          ? formatDate(new Date(post.publishedAt))
                          : "עכשיו"}
                      </time>
                      <span>•</span>
                      <span>👁️ {Math.floor(Math.random() * 10000)} צפיות</span>
                    </div>

                    <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-text-muted line-clamp-2 flex-1">
                      {post.excerpt || "מאמר חדש בקטגוריית קזינו אונליין"}
                    </p>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-accent hover:text-accent-light font-bold text-sm transition-colors flex items-center gap-2 self-start mt-auto"
                    >
                      קרא עוד
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-colors">
                1
              </button>
              <button className="px-4 py-2 border border-border-glass text-text-muted hover:border-accent hover:text-accent rounded-lg transition-colors font-bold">
                2
              </button>
              <button className="px-4 py-2 border border-border-glass text-text-muted hover:border-accent hover:text-accent rounded-lg transition-colors font-bold">
                3
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* About This Category */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 p-6">
              <h3 className="font-heading text-lg font-black text-text-primary mb-3">
                אודות חדשות קזינו
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                בחדשות הקזינו תמצאו את הטריאגה העדכנית ביותר מעולם ההימורים
                האונליין. מטיפים למשחקנים, דרך כללים משפטיים, ועד להערכות
                אתרים חדשים.
              </p>
            </div>

            {/* Recent News */}
            {recentPosts.length > 0 && (
              <div className="rounded-2xl bg-card/50 border border-border-glass/30 p-6">
                <h3 className="font-heading text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent rounded-full" />
                  חדשות אחרונות
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post._id}
                      className="group flex gap-3 pb-4 border-b border-border-glass/20 last:border-b-0 last:pb-0 hover:opacity-70 transition-opacity"
                    >
                      {post.featuredImage && (
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-transparent">
                          <Image
                            src={post.featuredImage.url || `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${post.featuredImage.asset._ref.replace('image-', '').replace(/-(\w{4})$/, '.$1')}`}
                            alt={post.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="font-heading text-sm font-bold text-text-primary hover:text-accent transition-colors line-clamp-2 block"
                        >
                          {post.title}
                        </Link>
                        <time className="text-xs text-text-muted/60 mt-1 block">
                          {post.publishedAt
                            ? formatDate(new Date(post.publishedAt))
                            : "עכשיו"}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Rated Casinos */}
            {topCasinos.length > 0 && (
              <div className="rounded-2xl bg-card/50 border border-border-glass/30 p-6">
                <h3 className="font-heading text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent rounded-full" />
                  קזינוים מובחרים
                </h3>
                <div className="space-y-3">
                  {topCasinos.map((casino) => (
                    <div
                      key={casino._id}
                      className="flex gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border-glass/20"
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-2xl font-black">
                        {casino.icon || "🎰"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-sm text-text-primary truncate">
                          {casino.name}
                        </h4>
                        <p className="text-xs text-text-muted/70 mt-1 line-clamp-1">
                          ⭐⭐⭐⭐⭐
                        </p>
                        <p className="text-xs text-accent font-bold mt-1">
                          בקר עכשיו →
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 p-6">
              <h3 className="font-heading text-lg font-black text-text-primary mb-3">
                הירשם לעדכונים
              </h3>
              <p className="text-sm text-text-muted mb-4">
                קבל חדשות קזינו חדשות ישר לתיבת הדואר שלך
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="הכנס דוא״ל"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border-glass text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-accent hover:bg-accent-light text-white font-bold rounded-lg transition-colors"
                >
                  הירשם
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
