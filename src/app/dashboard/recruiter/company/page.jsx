import { getUserSession } from "@/lib/core/session";
import RegisterCompanyPage from "./RegisterCompanyPage";
import { getRecruiterCompany } from "@/lib/api/companies";

const companyPage = async () => {
  try {
    const user = await getUserSession();
    console.log("USER:", user);

    let company = null;

    try {
      company = await getRecruiterCompany(user?.id);
      console.log("COMPANY:", company);
    } catch (err) {
      console.error("COMPANY FETCH ERROR:", err);
    }

    return (
      <RegisterCompanyPage recruiter={user} recruiterCompany={company.data} />
    );
  } catch (err) {
    console.error("PAGE ERROR:", err);
    return <div>Server Error</div>;
  }
};
export default companyPage;
