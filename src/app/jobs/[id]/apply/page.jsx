import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyJobForm from "./ApplyJobForm";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  console.log(user, "user session in apply page");
  if (!user) {
    return redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div className="text-white py-34 text-center text-lg">
        Only job seekers can apply for jobs
      </div>
    );
  }
  const job = await getJobById(id);
  return (
    <div>
      <ApplyJobForm job={job} applicant={user} />
    </div>
  );
};

export default ApplyPage;
