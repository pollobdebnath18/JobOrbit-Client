"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createCompany = async (newCompany) => {
  return serverMutation("api/companies", newCompany);
};

export const statusUpdate = async (id, status) => {
  const result =  serverMutation(`api/companies/${id}`, {status}, "PATCH");
  revalidatePath('/dashboard/admin/companies')
  return result ;
};
