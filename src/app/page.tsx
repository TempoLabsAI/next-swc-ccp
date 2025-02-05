import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Database, Globe, Shield, Star, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Authentication Ready",
    description: "Secure user authentication powered by Clerk, supporting multiple auth providers.",
    icon: Shield,
  },
  {
    title: "Real-time Database",
    description: "Built-in Convex database with real-time updates and automatic scaling.",
    icon: Database,
  },
  {
    title: "Global CDN",
    description: "Lightning-fast content delivery through Next.js and Vercel's global edge network.",
    icon: Globe,
  },
  {
    title: "Subscription Payments",
    description: "Integrated payment processing with Polar for subscription management.",
    icon: Zap,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechFlow",
    content: "This template saved us weeks of development time. The integration between services is seamless.",
    avatar: "",
  },
  {
    name: "Michael Chen",
    role: "Founder, DataStack",
    content: "The best starter template I've used. Clean code, modern stack, and excellent documentation.",
    avatar: "",
  },
  {
    name: "Emma Williams",
    role: "Lead Developer",
    content: "Perfect balance of features and simplicity. Exactly what we needed for our MVP.",
    avatar: "",
  },
];
export default function Home() {
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
      <Pricing />

      <Footer />
    </div>
  );
}
