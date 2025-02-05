import { DashboardNavbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen dark:bg-[#0A0A0A] dark:text-white">
      {/* Sidebar */}
      <div className="w-64 border-r dark:border-[#1F1F1F]">
        <div className="h-14 flex items-center px-4 border-b dark:border-[#1F1F1F]">
          <div>
            <h1 className="text-sm font-semibold">Acme Inc</h1>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </div>
        </div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto">
          <div className="container p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
