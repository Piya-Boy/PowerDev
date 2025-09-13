// app/(admin)/layout.tsx

"use client";

import SidebarProvider from "@/components/admin/context/SidebarContext";
import Header from "@/components/admin/layout/Header";
import Sidebar from "@/components/admin/layout/Sidebar";
import Backdrop from "@/components/admin/layout/Backdrop";
import React from "react";
import { useSidebar } from "@/components/admin/context/SidebarContext";
import { ThemeProvider } from "@/components/admin/context/ThemeContext";
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <Sidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        <Header />
        <div className="p-2 mx-auto max-w-(--breakpoint-2xl) md:p-2">{children}</div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}