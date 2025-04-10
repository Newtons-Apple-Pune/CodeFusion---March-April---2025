"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-blue-700">
          CyberSecureDocs
        </h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="text-gray-600 hover:text-blue-700">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-700">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-700">Contact</a>
        </nav>
        <div className="flex gap-4 items-center">
          {status === "authenticated" ? (
            <>
              <span className="text-sm text-gray-600">Hi, {session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-blue-700">
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
