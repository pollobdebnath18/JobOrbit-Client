import AdminUsersTable from "@/components/dashboard/AdminUsersTable";
import { getUsersList } from "@/lib/api/users";

const AdminUsersPage = async () => {
  const data = await getUsersList();

  // Adjust this mapping to match your real API response shape.
  const users = (data?.users ?? []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl ?? u.avatar_url ?? null,
    role: u.role, // 'seeker' | 'recruiter'
    joinDate: u.joinDate ?? u.join_date,
    status: u.status, // 'active' | 'suspended'
  }));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">
          Users <span className="text-zinc-500">({users.length})</span>
        </h2>
      </div>

      <AdminUsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;
