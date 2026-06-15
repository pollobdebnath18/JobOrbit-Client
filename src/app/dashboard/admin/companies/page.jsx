import AdminTable from "@/components/dashboard/AdminTable";
import { getAllCompanies } from "@/lib/api/companies";

const AdminCompaniesPage = async () => {
  const companies = await getAllCompanies();

  return (
    <div className="min-h-screen bg-[#111] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Company Approvals
        </h1>

        <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
          Review company registrations, approve trusted companies, and manage
          recruiter access.
        </p>
      </div>

      {/* Table */}
      <AdminTable companies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
