import React from "react";
import { useRouter } from "next/navigation";

const ForbiddenPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-4xl">⛔</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">403 Forbidden</h1>

        {/* Message */}
        <p className="text-gray-300 text-sm mb-6">
          You don’t have permission to access this page. Please sign in with the
          correct account or return home.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-full py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => router.push("/auth/signin")}
            className="w-full py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
