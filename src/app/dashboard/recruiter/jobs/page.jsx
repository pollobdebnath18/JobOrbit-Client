import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Table, Button } from "@heroui/react";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Briefcase } from "@gravity-ui/icons";

const RecruiterJobs = async () => {
  const companyId = "company_123";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5" />
        <h1 className="text-xl font-semibold">Recruiter / Manage Jobs</h1>
      </div>

      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[800px]">
            {/* HEADER */}
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            {/* BODY */}
            <Table.Body>
              {jobs?.map((job) => (
                <Table.Row key={job._id?.$oid || job._id}>
                  <Table.Cell className="font-medium">
                    {job.jobTitle}
                  </Table.Cell>

                  <Table.Cell>{job.jobCategory}</Table.Cell>

                  <Table.Cell>{job.location}</Table.Cell>

                  <Table.Cell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </Table.Cell>

                  {/* ACTIONS COLUMN */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="flat">
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button size="sm" variant="flat">
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button size="sm" variant="danger" color="flat">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
};

export default RecruiterJobs;
