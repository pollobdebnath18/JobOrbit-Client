import React from "react";
import RegisterCompanyPage from "./RegisterCompanyPage";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

const companyPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id);
  //   console.log(user, "from companypage");
  return (
    <div>
      <RegisterCompanyPage
        recruiter={user}
        recruiterCompany={company}
      ></RegisterCompanyPage>
    </div>
  );
};

export default companyPage;
