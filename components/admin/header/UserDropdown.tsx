"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "@/components/admin/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/admin/ui/dropdown/DropdownItem";
import { ChevronDown, ChevronUp, CircleUserRound, LogOut, Settings, } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.stopPropagation();
  setIsOpen((prev) => !prev);
}

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown} 
        className="flex items-center text-gray-700 cursor-pointer dark:text-gray-400 dropdown-toggle"
      >
        <span className="mr-3 relative overflow-hidden rounded-full h-11 w-11 flex items-center justify-center">
          <Image
            width={44}
            height={44}
            src="/images/logo.png"
            alt="User"
          />
          <span className="absolute bottom-0 -right-1 rounded-full p-0.5 bg-white dark:bg-gray-900">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-200 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-200 transition-transform duration-200" />
            )}
          </span>
        </span>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-200">
            Musharof Chowdhury
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            randomuser@pimjo.com
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
                <CircleUserRound className="w-5 h-5 text-gray-500 dark:text-gray-200 transition-transform duration-200" />
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Settings className="w-5 h-5 text-gray-500 dark:text-gray-200 transition-transform duration-200" />
              Account settings
            </DropdownItem>
          </li>
        </ul>
        <Link
          href="/signin"
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium rounded-lg group text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 "
        >
        <LogOut className="w-5 h-5 text-red-500 transition-transform duration-200" />
          Sign out
        </Link>
      </Dropdown>
    </div>
  );
}
