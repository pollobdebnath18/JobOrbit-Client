"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log("user : ", user, "ispending : ", isPending);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header
      className="
        bg-black
        text-white
        sticky top-0 z-50
        border-b border-white/10
        shadow-[0_4px_30px_rgba(0,0,0,0.8)]
      "
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* ================= LOGO ================= */}
        <Link href="/" className="text-xl font-bold tracking-wide text-white">
          JobOrbit
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden md:flex items-center gap-7 text-sm text-gray-300">
          <li className="hover:text-white transition">
            <Link href="/jobs">Jobs</Link>
          </li>

          <li className="hover:text-white transition">
            <Link href="/companies">Companies</Link>
          </li>

          <li className="hover:text-white transition">
            <Link href="/pricing">Pricing</Link>
          </li>

          {/* Divider */}
          <div className="h-5 w-px bg-white/50 mx-2" />

          {/* AUTH SECTION */}
          {user ? (
            <li className="flex items-center gap-2">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-600"
              />

              <span className="text-sm text-white font-medium flex gap-5 items-center">
                Hi, {user?.name} 
                <span>
                  <Button onClick={handleSignOut}>SignOut</Button>
                </span>
              </span>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/signup"
                  className="bg-white text-black px-4 py-2 rounded-full font-medium"
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div
          className="
            md:hidden
            bg-black
            border-t border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.9)]
            px-4 py-4 space-y-4
          "
        >
          <Link href="/jobs" className="block hover:text-white">
            Jobs
          </Link>

          <Link href="/companies" className="block hover:text-white">
            Companies
          </Link>

          <Link href="/pricing" className="block hover:text-white">
            Pricing
          </Link>

          <hr className="border-white/10" />

          {/* AUTH SECTION */}
          {user ? (
            <li className="flex items-center gap-2">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-600"
              />

              <span className="text-sm text-white font-medium flex gap-5 items-center">
                Hi, {user.name}
                <span>
                  <Button onClick={handleSignOut}>SignOut</Button>
                </span>
              </span>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/auth/signin"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/signup"
                  className="bg-white text-black px-4 py-2 rounded-full font-medium"
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
