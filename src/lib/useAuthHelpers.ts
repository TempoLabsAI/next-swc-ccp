import { useAuth } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function useCanAccessDashboard() {
  const { userId } = useAuth();
  const subscriptionStatus = useQuery(api.subscriptions.getUserSubscriptionStatus);

  return userId && subscriptionStatus?.hasActiveSubscription;
}
