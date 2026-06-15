"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { Eye } from "lucide-react";
import Image from "next/image";

const ApplicationsTable = ({ jobs }) => {
  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[900px]">
          {/* HEADER */}
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Applied</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          {/* BODY */}
          <Table.Body>
            {jobs?.map((app) => (
              <Table.Row key={app._id?.$oid || app._id}>
                {/* JOB TITLE (LOGO + TITLE) */}
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                      {app.companyLogo ? (
                        <Image
                          src={app.companyLogo}
                          alt="logo"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">
                          {app.companyName?.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <p className="text-white font-medium">{app.jobTitle}</p>
                      <p className="text-xs text-gray-400">
                        {app.jobCategory || "Job"}  
                      </p>
                    </div>
                  </div>
                </Table.Cell>

                {/* COMPANY */}
                <Table.Cell>{app.companyName}</Table.Cell>

                {/* APPLIED DATE */}
                <Table.Cell>
                  {new Date(app.createdAt).toLocaleDateString()}
                </Table.Cell>

                {/* STATUS */}
                <Table.Cell>
                  <div className="flex flex-col gap-1">
                    {/* main status */}
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 w-fit">
                      Applied
                    </span>

                    {/* extra states (future-ready) */}
                    <div className="flex gap-2 text-[10px] text-gray-400">
                      <span>Review</span>
                      <span>•</span>
                      <span>Shortlisted</span>
                    </div>
                  </div>
                </Table.Cell>

                {/* ACTIONS */}
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="flat">
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button size="sm" variant="flat">
                      Details
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default ApplicationsTable;
