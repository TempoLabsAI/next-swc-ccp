"use client"

import { UserButton } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { ThemeSwitch } from "../theme-switch";
import { Button } from "../ui/button";

export function DashboardNavbar() {
  const subscription = useQuery(api.subscriptions.getUserSubscription);

  const getDashboardUrl = useAction(api.subscriptions.getUserDashboardUrl);

  const router = useRouter();

  const handleManageSubscription = async () => {
    try {
      const result = await getDashboardUrl({
        customerId: subscription?.customerId!
      });
      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Error getting dashboard URL:", error);
    }
  };

  return (
    <div className="h-14 border-b dark:border-[#1F1F1F] px-4 flex items-center justify-end">
      <div className="flex items-center justify-center gap-2">
        <Button variant={"outline"} onClick={handleManageSubscription}>Manage Subscription</Button>
        <ThemeSwitch />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
