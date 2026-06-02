"use client";

import React from "react";
import Link from "next/link";

// Gravity-style SVG icons (slightly larger)
const Icon = {
  facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.6.4-1 1-1z"
        fill="currentColor"
      />
    </svg>
  ),

  linkedin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9H3v12h3V9zm-1.5-6A1.5 1.5 0 1 0 4.5 6 1.5 1.5 0 0 0 4.5 3zM21 21h-3v-6c0-1.5-.5-2.5-2-2.5s-2 1-2 2.5V21h-3V9h3v1.7C14.7 9.6 15.8 9 17 9c2.5 0 4 1.8 4 5z"
        fill="currentColor"
      />
    </svg>
  ),

  twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 5.9c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4 1-1.5-1.6-4.3-1-4.9 1.2-.2.6-.2 1.2-.1 1.8-3.2-.2-6-1.7-7.9-4-.3.6-.4 1.2-.4 1.9 0 1.3.7 2.5 1.8 3.2-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3 3.6-.5.1-1 .2-1.5.1.4 1.5 1.9 2.6 3.5 2.6-1.4 1.1-3.2 1.8-5.1 1.8H2c1.9 1.2 4.2 1.9 6.6 1.9 7.9 0 12.2-6.6 12.2-12.3v-.6c.8-.5 1.4-1.2 2-2z"
        fill="currentColor"
      />
    </svg>
  ),
};

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* MAIN LAYOUT */}
        <div className="flex flex-col md:flex-row justify-between gap-20">
          {/* LEFT SIDE */}
          <div className="md:max-w-sm">
            <h2 className="text-white text-3xl font-bold">🚀 JobOrbit</h2>

            <p className="mt-4 text-sm text-gray-500 leading-6">
              The AI-native career platform built for people who take their work
              seriously and want smarter opportunities.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">
              <a className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-300">
                <Icon.facebook />
              </a>

              <a className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-300">
                <Icon.twitter />
              </a>

              <a className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-gray-300">
                <Icon.linkedin />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 flex-1">
            {/* PRODUCT */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Job Discovery
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-white">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="/salary" className="hover:text-white">
                    Salary Data
                  </Link>
                </li>
              </ul>
            </div>

            {/* NAVIGATION */}
            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/career" className="hover:text-white">
                    Career Library
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/brand" className="hover:text-white">
                    Brand Guideline
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white">
                    Newsroom
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">Copyright © 2026 — JobOrbit</p>

          <div className="flex gap-5 text-sm">
            <Link href="/terms" className="hover:text-white">
              Terms & Policy
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
