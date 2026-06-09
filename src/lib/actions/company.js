"use server";

import { serverMutation } from "../core/server";


export const createCompany = async (newCompany) => {
  return serverMutation("api/companies", newCompany);
};

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompany) => {
//   const res = await fetch(`${baseURL}/api/companies`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(newCompany),
//   });
//   return res.json();
// };
