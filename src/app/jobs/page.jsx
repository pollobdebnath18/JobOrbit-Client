import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api/jobs";

const JobsPage = async ({ searchParams }) => {
  const jobs = await getJobs();

  const params = await searchParams;

  const search = params?.search || "";
  const type = params?.type || "";
  const category = params?.category || "";
  const remote = params?.remote || "false";

  let filteredJobs = jobs;

 if (search) {
   const q = search.toLowerCase();

   filteredJobs = filteredJobs.filter((job) => {
     const title = job.jobTitle?.toLowerCase() || "";
     const company = job.companyName?.toLowerCase() || "";

     return title.includes(q) || company.includes(q);
   });
 }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.jobType === type);
  }

  if (category) {
    filteredJobs = filteredJobs.filter((job) => job.jobCategory === category);
  }

  if (remote === "true") {
    filteredJobs = filteredJobs.filter((job) => job.isRemote === true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse Jobs</h1>

      {/* ✅ ADD FILTER HERE */}
      <div className="mb-6">
        <JobFilter />
      </div>

      <h2 className="text-sm text-gray-400 mb-4">
        Jobs found: {filteredJobs.length}
      </h2>

      {/* JOB GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
