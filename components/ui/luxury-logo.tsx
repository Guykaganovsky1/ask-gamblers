"use client";

import Link from "next/link";
import Image from "next/image";

export function LuxuryLogo() {
  return (
    <Link href="/" className="group flex items-center" style={{ direction: "ltr" }}>
      <Image
        src="/Ask_Gamblers_Logo.png"
        alt="Ask Gamblers"
        width={126}
        height={42}
        className="transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </Link>
  );
}
