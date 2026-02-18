import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/sections/back-to-top";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
