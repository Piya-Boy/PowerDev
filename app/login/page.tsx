"use client";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-6">
        <LoginForm />
        <Link href="/">
          <button className="cursor-pointer mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            กลับหน้าหลัก
          </button>
        </Link>
      </div>
    </div>
  );
}
