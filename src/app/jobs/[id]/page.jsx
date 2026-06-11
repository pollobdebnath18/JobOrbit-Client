import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id, "id");
  const job = await getJobById(id);
  console.log("Job details:", job);

  if (!job) {
    return <div className="text-white p-10 text-center">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      {/* MAIN CARD */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <Image
            src={job.companyLogo || "/avatar.png"}
            alt={job.companyName || 'company name'}
            width={50}
            height={50}
            className="rounded-lg border border-white/10"
          />

          <div>
            <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
            <p className="text-gray-400">{job.companyName}</p>
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400">
            {job.jobType}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
            {job.locationType}
          </span>

          <span className="px-3 py-1 text-xs rounded-full bg-purple-600/20 text-purple-400">
            {job.jobCategory}
          </span>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-300">
          <p>
            <span className="text-gray-500">Location:</span> {job.location}
          </p>

          <p>
            <span className="text-gray-500">Remote:</span>{" "}
            {job.isRemote ? "Yes" : "No"}
          </p>

          <p>
            <span className="text-gray-500">Salary:</span> {job.minSalary} -{" "}
            {job.maxSalary} {job.currency}
          </p>

          <p>
            <span className="text-gray-500">Deadline:</span> {job.deadline}
          </p>

          <p>
            <span className="text-gray-500">Status:</span> {job.status}
          </p>

          <p>
            <span className="text-gray-500">Posted:</span>{" "}
            {new Date(job.createdAt).toDateString()}
          </p>
        </div>

        {/* DESCRIPTION SECTIONS */}
        <div className="mt-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Requirements</h2>
            <p className="text-gray-400">{job.requirements}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Responsibilities</h2>
            <p className="text-gray-400">{job.responsibilities}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Benefits</h2>
            <p className="text-gray-400">{job.benefits}</p>
          </div>
        </div>

        {/* APPLY BUTTON */}
        <div className="mt-8 flex gap-3">
          <Link href={`/jobs/${id}/apply`}>
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium">
              Apply Now
            </button>
          </Link>

          <button className="border border-white/20 px-5 py-2 rounded-lg">
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
