'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { CreditCard, Router, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-[#1F1F1F]">
          <CardHeader>
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-[200px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function StatsPage() {
  const { user } = useUser();
  const router = useRouter()
  const subscription = useQuery(api.subscriptions.getUserSubscription);
  const getDashboardUrl = useAction(api.subscriptions.getUserDashboardUrl);
  const hasActiveSubscription = subscription?.status === "active";

  if (!user?.id || !user) {
    return <LoadingSkeleton />;
  }

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">View and manage your account information</p>
        <Button variant="default" className="mt-4" onClick={handleManageSubscription}>
          Manage Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clerk User Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F]">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5 dark:text-white" />
              <div>
                <CardTitle className="dark:text-white">Clerk User Information</CardTitle>
                <CardDescription>Authentication details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 dark:text-white">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-sm">{user.fullName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-sm font-mono text-xs">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm">{new Date(user.createdAt!).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Verified</p>
                <p className="text-sm">Yes</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auth Strategy</p>
                <p className="text-sm">from_oauth_google</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database User Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F]">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5 dark:text-white" />
              <div>
                <CardTitle className="dark:text-white">Database User Information</CardTitle>
                <CardDescription className="dark:text-white">Convex database details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 dark:text-white">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Database ID</p>
                <p className="text-sm font-mono text-xs">{subscription?.userId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-sm">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-sm">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Token ID</p>
                <p className="text-sm font-mono text-xs">{subscription?.userId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F]">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 dark:text-white" />
              <div>
                <CardTitle className="dark:text-white">Subscription Information</CardTitle>
                <CardDescription className="dark:text-white">Your subscription details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 dark:text-white">
            <div className="flex items-center space-x-4">
              <Badge
                variant={hasActiveSubscription ? "default" : "destructive"}
                className="capitalize"
              >
                {subscription?.status || 'No subscription'}
              </Badge>
              {subscription?.currentPeriodEnd && (
                <p className="text-sm text-muted-foreground">
                  Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Plan Amount</p>
                <p className="text-sm">$12.00</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billing Interval</p>
                <p className="text-sm capitalize">{subscription?.interval || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Period</p>
                <p className="text-sm">
                  {subscription?.currentPeriodEnd
                    ? `${new Date(subscription._creationTime).toLocaleDateString()} - ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Started At</p>
                <p className="text-sm">
                  {subscription?._creationTime
                    ? new Date(subscription._creationTime).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Polar ID</p>
                <p className="text-sm font-mono text-xs">{subscription?.polarId || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Raw Data Preview */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F]">
          <CardHeader>
            <CardTitle className="dark:text-white">Raw Data Preview</CardTitle>
            <CardDescription className="dark:text-white">JSON data from different sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2 dark:text-white">Clerk User Data</p>
                <pre className="dark:bg-black/50 dark:text-white p-4 rounded-lg overflow-auto text-xs max-h-[100px]">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2 dark:text-white">Subscription Data</p>
                <pre className="dark:bg-black/50 dark:text-white p-4 rounded-lg overflow-auto text-xs max-h-[100px]">
                  {JSON.stringify(subscription, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
