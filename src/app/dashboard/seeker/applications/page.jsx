import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import ApplicationsTable from "./ApplicationsTable";

const MyApplicationsPage = async () => {
  const user = await getUserSession();
  // console.log(user?.id, "from applications page");
  const jobs = await getApplicationsByApplicant(user?.id);
  console.log("APPLICATIONS:", jobs);

  return (
    <div className="min-h-screen bg-[#111] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          My Applications
        </h1>

        <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
          Track your job applications, monitor hiring status, and stay updated
          with interview progress in real time.
        </p>
      </div>

      <div
        className="
        rounded-xl 
        border border-gray-800
        bg-[#171717]
        overflow-hidden
      "
      >
        <ApplicationsTable jobs={jobs} />
      </div>
    </div>
  );
};

export default MyApplicationsPage;
