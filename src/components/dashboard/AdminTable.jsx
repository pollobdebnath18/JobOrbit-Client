"use client";

import { statusUpdate } from "@/lib/actions/company";
import { Table, Button } from "@heroui/react";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminTable({ companies }) {
  const handleApprove = async (id) => {
    const result = await statusUpdate(id, "Approved");

    if (result.modifiedCount) {
      toast.success("Approved successfully");
    }
  };

  const handleReject = async (id) => {
    const result = await statusUpdate(id, "Rejected");

    if (result.modifiedCount) {
      toast.success("Rejected successfully");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#171717] overflow-hidden">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Company Approval table">
            <Table.Header>
              <Table.Column isRowHeader>Company Name</Table.Column>

              <Table.Column>Recruiter Email</Table.Column>

              <Table.Column>Job Count</Table.Column>

              <Table.Column>Status</Table.Column>

              <Table.Column>Date Submitted</Table.Column>

              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {companies?.map((company) => (
                <Table.Row key={company._id}>
                  {/* Company */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-9 h-9 rounded-lg object-cover bg-zinc-800"
                      />

                      <div>
                        <p className="text-white font-medium">
                          {company.companyName}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {company.location}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Recruiter */}
                  <Table.Cell>
                    <span className="text-zinc-300 text-sm">
                      {company.recruiterEmail}
                    </span>
                  </Table.Cell>

                  {/* Industry */}
                  <Table.Cell>
                    <span
                      className="
                    px-2 py-1 
                    rounded-full 
                    text-xs
                    bg-zinc-800
                    text-zinc-300
                    "
                    >
                      {company.jobCount}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    {company.status === "Pending" && (
                      <span
                        className="
                        flex items-center gap-2
                        text-yellow-400
                        text-sm
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        Pending
                      </span>
                    )}

                    {company.status === "Approved" && (
                      <span
                        className="
                        flex items-center gap-2
                        text-green-400
                        text-sm
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Approved
                      </span>
                    )}

                    {company.status === "Rejected" && (
                      <span
                        className="
                        flex items-center gap-2
                        text-red-400
                        text-sm
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        Rejected
                      </span>
                    )}
                  </Table.Cell>

                  {/* Date */}

                  <Table.Cell>
                    <span className="text-zinc-400 text-sm">
                      {new Date(company.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </Table.Cell>

                  {/* Actions */}

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex gap-2">
                      {company.status !== "Approved" && (
                        <Button
                          size="sm"
                          className="bg-green-500/10 text-green-400 border border-green-500/20"
                          onClick={() => handleApprove(company._id)}
                        >
                          <Check size={15} />
                          Approve
                        </Button>
                      )}

                      {company.status !== "Rejected" && (
                        <Button
                          size="sm"
                          className="bg-red-500/10 text-red-400 border border-red-500/20"
                          onClick={() => handleReject(company._id)}
                        >
                          <X size={15} />
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
