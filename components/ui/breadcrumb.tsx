import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(
    items.map((item) => ({
      name: item.label,
      url: item.href || "",
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="breadcrumb"
        className="w-full border-b border-accent/10"
        style={{ background: "rgba(168,85,247,0.04)" }}
      >
        <ol
          className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-2.5 text-xs"
          dir="rtl"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span className="text-text-muted/40 select-none">›</span>
                )}
                {isLast || !item.href ? (
                  <span className="font-semibold text-text-primary truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-accent transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
