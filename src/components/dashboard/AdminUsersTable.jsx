"use client";

import { updateUserRole } from "@/lib/actions/users";
import { Avatar, Button, Chip, Table } from "@heroui/react";
import { Briefcase, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * AdminUsersTable (client component)
 *
 * Renders the users table using HeroUI's compound Table API:
 * Table > Table.ScrollContainer > Table.Content > Table.Header / Table.Body
 *
 * Every user starts as 'active'. Admin actions per row:
 * - Seeker:    "Make Recruiter", "Suspend"
 * - Recruiter: "Make Seeker", "Suspend"
 *
 * Role changes go through a confirm modal, then call updateUserRole (server
 * action) and refresh server data. Suspend is applied optimistically to
 * local state, then synced to /api/admin/users/:id/suspend; it rolls back
 * if that call fails.
 *
 * Props:
 * - users: [{ id, name, email, avatarUrl, role: 'seeker' | 'recruiter', joinDate, status: 'active' | 'suspended' }]
 */

const statusColorMap = {
  active: "success",
  suspended: "danger",
};

const roleColorMap = {
  seeker: "accent",
  recruiter: "warning",
};

export default function AdminUsersTable({ users }) {
  const router = useRouter();

  const [localUsers, setLocalUsers] = useState(users || []);
  const [pendingId, setPendingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const patchUser = (userId, changes) => {
    setLocalUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...changes } : u)),
    );
  };

  // Apply a change optimistically, call the API, and roll back on failure.
  // Adjust the endpoint/method below to match your real API route.
  const updateUser = async (userId, changes, endpoint) => {
    const previous = localUsers.find((u) => u.id === userId);
    if (!previous) return;

    setPendingId(userId);
    patchUser(userId, changes);

    try {
      const res = await fetch(`/api/admin/users/${userId}/${endpoint}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Failed to update user ${userId}`);
    } catch (err) {
      console.error(err);
      // Roll back to the previous values on failure.
      patchUser(userId, previous);
    } finally {
      setPendingId(null);
    }
  };

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    const nextRole = selectedUser.role === "seeker" ? "recruiter" : "seeker";

    setIsConfirming(true);
    try {
      await updateUserRole(selectedUser.id, nextRole);
      patchUser(selectedUser.id, { role: nextRole });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsConfirming(false);
      setOpenModal(false);
      setSelectedUser(null);
    }
  };

  const handleSuspend = (user) =>
    updateUser(user.id, { status: "suspended" }, "suspend");

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Users table" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>User name</Table.Column>
              <Table.Column>Email address</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Join date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {localUsers.map((user) => (
                <Table.Row key={user.id} id={user.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image src={user.avatarUrl} />
                        <Avatar.Fallback>
                          {getInitials(user.name)}
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="text-muted">{user.email}</Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={roleColorMap[user.role]}
                      size="sm"
                      variant="soft"
                    >
                      <span className="inline-flex items-center gap-1">
                        {user.role === "recruiter" ? (
                          <Briefcase className="size-3" />
                        ) : (
                          <UserIcon className="size-3" />
                        )}
                        {user.role === "recruiter" ? "Recruiter" : "Seeker"}
                      </span>
                    </Chip>
                  </Table.Cell>

                  <Table.Cell className="text-muted">
                    {user.joinDate || "—"}
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={statusColorMap[user.status]}
                      size="sm"
                      variant="soft"
                    >
                      {user.status === "active" ? "Active" : "Suspended"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      {user.role === "seeker" ? (
                        <Button
                          isDisabled={pendingId === user.id}
                          size="sm"
                          variant="tertiary"
                          onPress={() => handleRoleChange(user)}
                        >
                          Make Recruiter
                        </Button>
                      ) : (
                        <Button
                          isDisabled={pendingId === user.id}
                          size="sm"
                          variant="tertiary"
                          onPress={() => handleRoleChange(user)}
                        >
                          Make Seeker
                        </Button>
                      )}
                      <Button
                        isDisabled={pendingId === user.id}
                        size="sm"
                        variant="danger-soft"
                        onPress={() => handleSuspend(user)}
                      >
                        Suspend
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white/80 rounded-xl p-6 w-[350px] shadow-xl">
            <h2 className="text-lg font-semibold">Change User Role</h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to make <b>{selectedUser?.name}</b> a{" "}
              {selectedUser?.role === "seeker" ? "Recruiter" : "Seeker"}?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="secondary"
                isDisabled={isConfirming}
                onPress={() => setOpenModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                isDisabled={isConfirming}
                onPress={confirmRoleChange}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
