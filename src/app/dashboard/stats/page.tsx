import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { CreditCard, Database, FileJson, User } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export default async function StatsPage() {
  const user = await currentUser();

  const subscription = await fetchQuery(api.subscriptions.getUserSubscription);
  const hasActiveSubscription = subscription?.status === "active";

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Dashboard</h1>
        <p className="text-base text-muted-foreground">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Clerk User Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F] hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary dark:text-primary" />
              </div>
              <div>
                <CardTitle className="dark:text-white text-xl">User Information</CardTitle>
                <CardDescription className="dark:text-gray-400">Authentication details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 dark:text-white">
            <div className="grid gap-4">
              <InfoItem label="Full Name" value={user?.fullName || 'Not provided'} />
              <InfoItem label="Email" value={user?.primaryEmailAddress?.emailAddress} />
              <InfoItem label="User ID" value={user?.id} monospace />
              <InfoItem label="Created" value={new Date(user?.createdAt!).toLocaleDateString()} />
              <InfoItem label="Email Verified" value="Yes" />
              <InfoItem label="Auth Strategy" value="from_oauth_google" />
            </div>
          </CardContent>
        </Card>

        {/* Database User Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F] hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="h-5 w-5 text-primary dark:text-primary" />
              </div>
              <div>
                <CardTitle className="dark:text-white text-xl">Database Details</CardTitle>
                <CardDescription className="dark:text-gray-400">Convex database information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 dark:text-white">
            <div className="grid gap-4">
              <InfoItem label="Database ID" value={subscription?.userId || 'N/A'} monospace />
              <InfoItem label="Name" value={user?.fullName} />
              <InfoItem label="Email" value={user?.primaryEmailAddress?.emailAddress} />
              <InfoItem label="Token ID" value={subscription?.userId || 'N/A'} monospace />
              <InfoItem label="Last Updated" value={new Date().toLocaleDateString()} />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Information */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F] hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-primary dark:text-primary" />
              </div>
              <div>
                <CardTitle className="dark:text-white text-xl">Subscription</CardTitle>
                <CardDescription className="dark:text-gray-400">Your subscription details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 dark:text-white">
            <div className="flex items-center space-x-4">
              <Badge
                variant={hasActiveSubscription ? "default" : "destructive"}
                className="capitalize px-3 py-1 text-sm"
              >
                {subscription?.status || 'No subscription'}
              </Badge>
              {subscription?.currentPeriodEnd && (
                <p className="text-sm text-muted-foreground">
                  Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="grid gap-4">
              <InfoItem label="Plan Amount" value={`${subscription?.amount ?? 'N/A'}`} />
              <InfoItem label="Billing Interval" value={subscription?.interval || 'N/A'} capitalize />
              <InfoItem
                label="Current Period"
                value={subscription?.currentPeriodEnd
                  ? `${new Date(subscription._creationTime).toLocaleDateString()} - ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                  : 'N/A'}
              />
              <InfoItem
                label="Started At"
                value={subscription?._creationTime
                  ? new Date(subscription._creationTime).toLocaleDateString()
                  : 'N/A'}
              />
              <InfoItem label="Polar ID" value={subscription?.polarId || 'N/A'} monospace />
            </div>
          </CardContent>
        </Card>

        {/* Raw Data Preview */}
        <Card className="dark:bg-[#1F1F1F] dark:border-[#2F2F2F] hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileJson className="h-5 w-5 text-primary dark:text-primary" />
              </div>
              <div>
                <CardTitle className="dark:text-white text-xl">Raw Data</CardTitle>
                <CardDescription className="dark:text-gray-400">JSON data preview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-3 dark:text-white">Clerk User Data</p>
                <pre className="bg-black/5 dark:bg-black/50 dark:text-white p-4 rounded-lg overflow-auto text-xs max-h-[120px] font-mono">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-sm font-medium mb-3 dark:text-white">Subscription Data</p>
                <pre className="bg-black/5 dark:bg-black/50 dark:text-white p-4 rounded-lg overflow-auto text-xs max-h-[120px] font-mono">
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

function InfoItem({ label, value, monospace, capitalize }: {
  label: string;
  value?: string | null;
  monospace?: boolean;
  capitalize?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className={`text-sm ${monospace ? 'font-mono text-xs' : ''} ${capitalize ? 'capitalize' : ''}`}>
        {value || 'N/A'}
      </p>
    </div>
  );
}
