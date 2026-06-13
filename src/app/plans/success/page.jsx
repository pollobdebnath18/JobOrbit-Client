import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getSubscriptionPlans } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, metadata } = session;

  if (status === "open") {
    redirect("/");
  }

  const customerEmail = customer_details?.email?.trim().toLowerCase();
  // console.log(customerEmail, "customerEmail");
  if (status == "complete") {
    const subsInfo = {
      planId: metadata?.planId,
      email: customerEmail,
    };
    console.log("Subscription info:", subsInfo);
    const result = await getSubscriptionPlans(subsInfo);
    console.log("Subscription result:", result);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center border border-green-500/20">
              <CheckCircle2 size={56} className="text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Payment Successful
          </h1>

          <p className="mt-2 text-gray-400 text-lg">
            Your subscription has been activated.
          </p>

          {/* Email */}
          <div className="mt-3 rounded-2xl bg-black/30 border border-white/10 p-5">
            <p className="text-sm text-gray-500">Confirmation sent to</p>

            <p className="mt-1 text-white font-medium text-lg break-all">
              {customerEmail}
            </p>
          </div>

          {/* Info */}
          <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-left">
            <h3 className="font-semibold mb-3">What happens next?</h3>

            <ul className="space-y-2 text-gray-300">
              <li>✓ Subscription is now active</li>
              <li>✓ Plan features unlocked</li>
              <li>✓ You can upgrade or downgrade anytime</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 rounded-xl bg-blue-600 py-3 font-medium hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/pricing"
              className="flex-1 rounded-xl border border-white/10 py-3 hover:bg-white/5 transition"
            >
              View Plans
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-3 text-sm text-gray-500">
            Need help? Contact support anytime.
          </p>
        </div>
      </div>
    </main>
  );
}
