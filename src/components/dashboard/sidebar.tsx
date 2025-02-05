"use client"

import { cn } from "@/lib/utils";
import { BarChart3, LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Trading",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Stats",
    href: "/dashboard/stats",
    icon: LineChart,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto">
      <div className="py-4">
        <div className="px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-2 text-sm text-black dark:text-white transition-colors dark:hover:bg-[#1F1F1F]",
                  pathname === item.href 
                    ? "dark:bg-[#1F1F1F] bg-zinc-200" 
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
