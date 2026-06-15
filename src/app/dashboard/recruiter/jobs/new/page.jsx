import React from "react";
import PostJobForm from "./PostJobForm";
import { getLoggedInRecruterCompany } from "@/lib/api/companies";

const PostJobPage = async () => {
  const company = await getLoggedInRecruterCompany();
//   console.log(company, "company");
  return (
    <div>
      <PostJobForm company={company?.data}></PostJobForm>
    </div>
  );
};

export default PostJobPage;
