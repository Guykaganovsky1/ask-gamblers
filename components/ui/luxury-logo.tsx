"use client";

import Link from "next/link";
import Image from "next/image";

export function LuxuryLogo() {
  return (
    <Link href="/" className="group flex items-center" style={{ direction: "ltr" }}>
      <Image
        src="/Ask_Gamblers_Logo.webp"
        alt="Ask Gamblers"
        width={81}
        height={34}
        className="transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </Link>
  );
}
