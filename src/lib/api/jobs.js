import { serverFetch } from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () => {
  return serverFetch("api/jobs");
};

export const getJobById = async(id)=>{
  return serverFetch(`api/jobs/${id}`);
}
export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseURL}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return res.json();
};
