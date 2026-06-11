"use client";

import { useState } from "react";
import { User, Briefcase, Check } from "lucide-react";

export default function PricingPage() {
  const [role, setRole] = useState("seeker");

  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      desc: "Start exploring opportunities",
      features: [
        "Up to 3 job applications / month",
        "Save up to 10 jobs",
        "Basic profile access",
        "Email job alerts",
      ],
    },
    {
      name: "Pro",
      price: "$19",
      desc: "For active job seekers",
      featured: true,
      features: [
        "30 job applications / month",
        "Unlimited saved jobs",
        "Application tracking dashboard",
        "Salary insights",
      ],
    },
    {
      name: "Premium",
      price: "$39",
      desc: "For serious career growth",
      features: [
        "Unlimited job applications",
        "Profile boost in search",
        "Early access to new jobs",
        "Priority support",
      ],
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      desc: "For new companies",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard visibility",
      ],
    },
    {
      name: "Growth",
      price: "$49",
      desc: "Scaling hiring teams",
      featured: true,
      features: [
        "Up to 10 active job posts",
        "Basic analytics dashboard",
        "Applicant tracking system",
        "Email support",
      ],
    },
    {
      name: "Enterprise",
      price: "$149",
      desc: "Large scale hiring",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics",
        "Featured job listings",
        "Team collaboration tools",
        "Custom branding",
      ],
    },
  ];

  const plans = role === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Choose a plan based on your role in HireLoop
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-14">
        <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur">
          <button
            onClick={() => setRole("seeker")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition text-sm font-medium
              ${
                role === "seeker"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400"
              }`}
          >
            <User size={16} />
            Job Seeker
          </button>

          <button
            onClick={() => setRole("recruiter")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition text-sm font-medium
              ${
                role === "recruiter"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400"
              }`}
          >
            <Briefcase size={16} />
            Recruiter
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 transition duration-300
              ${
                plan.featured
                  ? "border-blue-500 bg-blue-500/10 scale-[1.03]"
                  : "border-white/10 bg-white/5"
              }
              hover:-translate-y-2 hover:border-blue-400/50`}
          >
            {/* Badge */}
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 px-4 py-1 text-xs rounded-full font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="text-gray-400 mt-1">{plan.desc}</p>

            {/* Price */}
            <div className="mt-6 flex items-end gap-1">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className="text-gray-400 mb-1">/month</span>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-gray-300">
                  <Check size={18} className="text-green-400 mt-0.5" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button 
                  type="submit"
                  role="link"
                  className={`cursor-pointer mt-8 w-full py-3 rounded-xl font-medium transition
                ${
                  plan.featured
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                >
                  Get Started
                </button>
              </section>
            </form>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm space-y-1">
        <p>Powered by Stripe • Upgrade or downgrade anytime</p>
        <p>14-day money-back guarantee on all paid plans</p>
      </div>
    </div>
  );
}
