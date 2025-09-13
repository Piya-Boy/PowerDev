"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/admin/context/SidebarContext";
import { 
  User, 
  LayoutDashboard, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronRight,
  Users,
  Settings,
  FileText,
  BarChart3,
  Package,
  MessageSquare,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Target,
  CreditCard,
  FileCheck,
  TrendingUp,
  FileSignature,
  FolderOpen
} from "lucide-react";
import Footer from "@/components/admin/layout/Footer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SubMenuItem = {
  name: string;
  path: string;
  role?: string[];
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  role?: string[];
  submenu?: SubMenuItem[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "แดชบอร์ด",
    path: "/dashboard",
    role: ["admin", "member"],
  },
  {
    icon: <Settings />,
    name: "ทั่วไป",
    role: ["admin", "member"],
    submenu: [
      { name: "ปัญหา", path: "/problems", role: ["admin", "member"] },
      { name: "สินค้า", path: "/products", role: ["admin", "member"] },
      { name: "ผลงาน", path: "/portfolio", role: ["admin", "member"] },
      { name: "เรทราคา", path: "/rate", role: ["admin", "member"] },
    ],
  },
  {
    icon: <Briefcase />,
    name: "จัดการโปรเจค",
    role: ["admin", "member"],
    submenu: [
      { name: "โปรเจคทั้งหมด", path: "/projects", role: ["admin", "member"] },
      { name: "แพ็ปไลน์โปรเจค", path: "/projects/pipeline", role: ["admin", "member"] },
      { name: "จัดการงาน", path: "/projects/tasks", role: ["admin", "member"] },
      { name: "ติดตามเวลา", path: "/projects/time", role: ["admin", "member"] },
    ],
  },
  {
    icon: <FileSignature />,
    name: "จัดการเอกสาร",
    role: ["admin", "member"],
    submenu: [
      { name: "สัญญา", path: "/documents/contract", role: ["admin", "member"] },
      { name: "เอกสารโปรเจค", path: "/documents/project", role: ["admin", "member"] },
      { name: "เอกสารลูกค้า", path: "/documents/client", role: ["admin", "member"] },
      { name: "เอกสารการเงิน", path: "/documents/finance", role: ["admin", "member"] },
      { name: "เอกสารคู่มือ", path: "/documents/manual", role: ["admin", "member"] }
    ],
  },
  {
    icon: <DollarSign />,
    name: "จัดการการเงิน",
    role: ["admin"],
    submenu: [
      { name: "รายการบัญชี", path: "/finance/account", role: ["admin"] },
      { name: "การชำระเงิน", path: "/finance/payments", role: ["admin"] },
      { name: "รายรับ", path: "/finance/income", role: ["admin"] },
      { name: "ค่าใช้จ่าย", path: "/finance/expenses", role: ["admin"] },
    ],
  },
  {
    icon: <Users />,
    name: "จัดการผู้ใช้",
    role: ["admin"],
    submenu: [
      { name: "ผู้ใช้ทั้งหมด", path: "/users", role: ["admin"] },
      { name: "บัญชีการเงิน", path: "/users/finance", role: ["admin"] },

    ],
  },

];

export default function Sidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // 1. เพิ่ม user mock object
  const mockUser = {
    name: "Admin User",
    role: "admin", // เปลี่ยนเป็น "admin" เพื่อดูเมนูทั้งหมด
  };

  // 2. ฟิลเตอร์ navItems ตาม role
  const filteredNavItems = navItems.filter(
    (item) => !item.role || item.role.includes(mockUser.role)
  );

  // 3. ฟังก์ชันจัดการการเปิด/ปิดเมนู
  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => {
      // ถ้าเมนูนี้เปิดอยู่แล้ว ให้ปิด
      if (prev.includes(menuName)) {
        return prev.filter(name => name !== menuName);
      }
      // ถ้าเมนูนี้ยังไม่เปิด ให้ปิดเมนูอื่นทั้งหมดแล้วเปิดเมนูนี้
      return [menuName];
    });
  };

  // 4. ตรวจสอบว่าเมนูย่อยมี active item หรือไม่
  const hasActiveSubmenu = (submenu: SubMenuItem[]) => {
    return submenu.some(item => isActive(item.path));
  };

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav) => (
        <li key={nav.name}>
          {nav.submenu ? (
            // เมนูที่มี submenu
            <Collapsible
              open={openMenus.includes(nav.name)}
              onOpenChange={() => toggleMenu(nav.name)}
            >
              <CollapsibleTrigger asChild>
                <div
                  className={`menu-item group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3 w-full cursor-pointer transition-all duration-1000 ease-in-out ${
                    hasActiveSubmenu(nav.submenu) ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <>
                      <span className="menu-item-text flex-1 text-left">{nav.name}</span>
                      <div className={`transition-transform duration-300 ease-in-out ${openMenus.includes(nav.name) ? 'rotate-90' : 'rotate-0'}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </>
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1 duration-1000">
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ul className="ml-6 mt-2 space-y-1 animate-in transition-transform duration-600 ease-in-out ">
                    {nav.submenu
                      .filter(subItem => !subItem.role || subItem.role.includes(mockUser.role))
                      .map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.path}
                            className={`block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-1000 ease-in-out hover:translate-x-1 hover:scale-105 ${
                              isActive(subItem.path) ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // เมนูธรรมดาที่ไม่มี submenu
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3 transition-all duration-1000 ease-in-out hover:scale-105 ${
                  isActive(nav.path) ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                <span
                  className={
                    isActive(nav.path)
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300"
                  }
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white shadow-lg dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
              />
              <span className="block mr-1 font-medium text-gray-600 dark:text-gray-300 text-lg uppercase">
                {mockUser.name}
              </span>
            </>
          ) : (
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          )}
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <MoreHorizontal />
                )}
              </h2>
              {renderMenuItems(filteredNavItems)}
            </div>
          </div>
        </nav>
      </div>
      <Footer />
    </aside>
  );
}