import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJobForm from "./ApplyJobForm";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    return redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center max-w-lg">
          <div className="text-5xl mb-4">🚫</div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Access Restricted
          </h2>

          <p className="text-gray-400">Only job seekers can apply for jobs.</p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const planData = await getPlanById(user?.plan) || 'seeker_free';
  const plan = planData?.[0]
  console.log(plan);

  const job = await getJobById(id);

  const percentage = (applications.length / plan.maxApplicationPerMonth) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Apply for Job</h1>

          <p className="text-gray-400 mt-2">
            Track your monthly application usage.
          </p>
        </div>

        {/* Usage Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Monthly Applications</p>

              <h2 className="text-3xl font-bold">
                {applications.length}
                <span className="text-gray-500">
                  /{plan.maxApplicationPerMonth}
                </span>
              </h2>
            </div>

            <div className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full">
              {plan.name} Plan
            </div>
          </div>

          {/* Progress */}
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                applications.length >= plan.maxApplicationPerMonth
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min(percentage, 100)}%`,
              }}
            />
          </div>

          <p className="text-gray-400 mt-3 text-sm">
            {plan.maxMonthlyApplications - applications.length > 0
              ? `${
                  plan.maxMonthlyApplications - applications.length
                } applications remaining`
              : "Monthly limit reached"}
          </p>
        </div>

        {/* Limit Reached */}
        {applications.length >= plan.maxApplicationPerMonth ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>

            <h3 className="text-2xl font-bold text-red-300 mb-3">
              Application Limit Reached
            </h3>

            <p className="text-gray-300 mb-6">
              Upgrade your plan to continue applying for more jobs this month.
            </p>

            <Link
              href="/plans"
              className="inline-flex px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Upgrade Plan →
            </Link>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur">
            <ApplyJobForm job={job} applicant={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
