// import JobCard from "@/components/jobs/JobCard";
// import JobFilter from "@/components/jobs/JobFilter";
// import { getJobs } from "@/lib/api/jobs";

import JobsPagination from "@/components/dashboard/JobsPagination";
import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";
import { getJobs } from "@/lib/api/jobs";

const JobsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params?.page || "1";

  const jobs = await getJobs({
    search: params?.search || "",
    jobType: params?.type || "",
    jobCategory: params?.category || "",
    isRemote: params?.remote || "false",
  });
  // console.log(typeof (jobs.length));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse Jobs</h1>

      <JobFilter />

      <h2 className="text-sm text-gray-400 mb-4">Jobs found: {jobs.length} </h2>

      {jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} jobs={job} />
            ))}
          </div>
          <JobsPagination jobs={jobs} pages={Number(page)}></JobsPagination>
        </>
      ) : (
        <div>Not match any job</div>
      )}
    </div>
  );
};
export default JobsPage;
