"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export default function SignUpPage() {
  // const [role, setRole] = useState("seeker");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      });

      if (error) {
        throw new Error(error.message || "Signup failed");
      }

      setSuccess("Account created successfully!");
      router.push("/");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Join JobOrbit and find your next opportunity
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="bordered"
              placeholder="Enter your name"
              className="w-full text-white"
              required
            />
          </div>

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
                className="absolute right-3 top-5 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <div className="flex flex-col gap-4 mt-4">
                <Label> Select Account Type</Label>
                <RadioGroup
                  defaultValue={formData.role}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: value,
                    }))
                  }
                  orientation="horizontal"
                  className="gap-6"
                >
                  <Radio value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Seeker</Label>
                    </Radio.Content>
                  </Radio>

                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter</Label>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              </div>
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
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* SIGN IN */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Already have an account?</span>

          <Link
            href="/auth/signin"
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
