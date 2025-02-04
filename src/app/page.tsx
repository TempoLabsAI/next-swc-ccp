import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Database, Globe, Shield, Star, Zap } from "lucide-react";
import Image from "next/image";
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
    avatar: "/avatars/avatar-1.png",
  },
  {
    name: "Michael Chen",
    role: "Founder, DataStack",
    content: "The best starter template I've used. Clean code, modern stack, and excellent documentation.",
    avatar: "/avatars/avatar-2.png",
  },
  {
    name: "Emma Williams",
    role: "Lead Developer",
    content: "Perfect balance of features and simplicity. Exactly what we needed for our MVP.",
    avatar: "/avatars/avatar-3.png",
  },
];

const pricingPlans = [
  {
    name: "Hobby",
    price: "$0",
    description: "Perfect for side projects",
    features: ["Up to 1,000 users", "Basic analytics", "Community support"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing businesses",
    features: ["Unlimited users", "Advanced analytics", "Priority support", "Custom domains"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Dedicated support", "Custom integrations", "SLA guarantee", "Advanced security"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="bg-secondary/10 hover:bg-secondary/20">
              <Star className="mr-1 h-3 w-3" /> Built with modern tech stack
            </Badge>

            <h1 className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Launch Faster with Tempo
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern full-stack starter template powered by Next.js, featuring authentication,
              database, and payment solutions out of the box.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link href="/sign-up">
                <Button size="lg" className="group">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p className="text-muted-foreground mt-2">Built with the best tools in the industry</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-6 bg-background rounded-lg shadow-sm">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Loved by Developers</h2>
            <p className="text-muted-foreground mt-2">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground mt-2">No hidden fees, no surprises</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={i === 1 ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
