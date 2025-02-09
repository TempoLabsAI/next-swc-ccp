import { DashboardNavbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen dark:bg-[#0A0A0A] dark:text-white">
      {/* Sidebar */}
      <div className="min-[1024px]:block hidden w-64 border-r dark:border-[#1F1F1F] h-full">
        <div className="h-14 flex items-center px-4 border-b dark:border-[#1F1F1F]">
          <Link href="/">
            <h1 className="text-sm font-semibold">Acme Inc</h1>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </Link>
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
