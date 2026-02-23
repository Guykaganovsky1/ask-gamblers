import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/sections/back-to-top";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <link rel="preload" as="image" href="/images/hero-bg.webp" />
      </head>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
