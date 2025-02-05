"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  interval: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Monthly",
    price: "$12",
    description: "Perfect for individual projects",
    features: ["Up to 1,000 users", "Basic analytics", "Community support"],
    interval: "month",
  },
  {
    name: "Yearly",
    price: "$100",
    description: "Save $44 annually",
    features: ["Everything in Monthly", "Priority support", "Custom domains", "Early access to features"],
    interval: "year",
  }
];

export function Pricing() {
  const handleSubscription = useAction(api.subscriptions.getProOnboardingCheckoutUrl);
  const user = useAuth()
  const router = useRouter()

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground mt-2">No hidden fees, no surprises</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <div key={i} className="flex flex-col justify-between p-6 bg-background max-w-sm w-full rounded-lg shadow-sm">
              <div>
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
              </div>
              <Button onClick={() => {
                console.log("CLICKED")
                if (!user?.isSignedIn) {
                  router.push("/sign-in")
                  return
                }
                console.log("SUBSCRIPTION")
                handleSubscription({
                  interval: plan.interval
                })
              }
              } className="w-full" variant={i === 1 ? "default" : "outline"}>
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
