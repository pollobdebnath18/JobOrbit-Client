"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // input handler
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // validation
  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email";
    }

    if (!formData.password) return "Password is required";

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  // submit
  const handleSignIn = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        throw new Error(res.error.message || "Login failed");
      }

      setSuccess("Login successful!");
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to continue to JobOrbit
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="bordered"
              placeholder="Enter your email"
              className="w-full text-white"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>

            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="bordered"
                placeholder="Enter your password"
                className="w-full text-white pr-10"
                required
              />

              {/* EYE ICON (RIGHT INSIDE INPUT) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              {success}
            </div>
          )}

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
            isLoading={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* SIGN IN */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don t have an account?</span>

          <Link
            href="/auth/signup"
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}
