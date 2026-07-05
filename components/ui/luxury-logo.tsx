import Link from "next/link";
import Image from "next/image";

export function LuxuryLogo() {
  return (
    <Link href="/" prefetch={false} className="group flex items-center" style={{ direction: "ltr" }}>
      <Image
        src="/ask-gamblers-logo.svg"
        alt="Ask Gamblers"
        width={144}
        height={48}
        unoptimized
        priority
        className="transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
