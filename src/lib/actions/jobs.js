"use server";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const createJob = async (newJobData) => {
  const res = await fetch(`${baseURL}/api/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  return res.json();
};
