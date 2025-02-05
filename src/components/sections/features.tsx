import { Shield, Database, Globe, Zap, LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
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

export function Features() {
  return (
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
  );
}
