import React from "react";
import Link from "next/link";
import {ArrowLeft,  } from "@gravity-ui/icons";
import { Home, ShieldAlert } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-10 w-10 text-red-600" />
        </div>

        {/* Status */}
        <h1 className="mt-8 text-6xl font-bold text-gray-900">403</h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>

        <p className="mt-4 text-gray-500 leading-relaxed">
          Sorry, you don t have permission to access this page. Please login
          with the correct account or return to the dashboard.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>

          <Link
            href="javascript:history.back()"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-400">
          Error Code: 403 | Access Denied
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
