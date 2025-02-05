"use client"

import { UserButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import { ThemeSwitch } from "../theme-switch";

export function DashboardNavbar() {
  return (
    <div className="h-14 border-b dark:border-[#1F1F1F] px-4 flex items-center justify-end">
      <div className="flex items-center justify-center gap-2">
        <ThemeSwitch />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
