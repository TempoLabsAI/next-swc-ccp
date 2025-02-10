import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { polar } from "@/lib/polar";

export default async function Home() {
  const { result } = await polar.products.list({
    organizationId: process.env.POLAR_ORGANIZATION_ID
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
      
      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing result={result as any} />

      <Footer />
    </div>
  );
}
