"use client";

import React from "react";
import { Card, Link, Button } from "@heroui/react";
import { MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import Image from "next/image";

const JobCard = ({ jobs }) => {
  const {
    _id,
    jobTitle,
    jobType,
    location,
    locationType,
    minSalary,
    maxSalary,
    currency,
    deadline,
    companyName,
    companyLogo,
  } = jobs;

  return (
    <Card className="w-full max-w-md p-5 bg-zinc-900 border border-white/10 rounded-xl shadow-md hover:shadow-xl transition">
  
      {/* TOP: logo + title + description */}
      <div className="flex  gap-3 items-center">
        <Image
          src={companyLogo || "/avatar.png"}
          alt={companyName || "company name"}
          width={40}
          height={40}
          className="rounded-md object-cover border"
        />

        <div>
          <p className="text-xl text-gray-500">{companyName}</p>
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-white leading-snug hover:text-primary transition">
          {jobTitle}
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {jobs.description ||
            "We are looking for a talented professional to join our team."}
        </p>
      </div>
      {/* 2 COLUMN INFO */}
      <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Briefcase className="size-4" />
          {jobType} • {locationType}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="size-4" />
          {location}
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="size-4" />
          {currency} {minSalary} - {maxSalary}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          Deadline: {deadline}
        </div>
      </div>
      {/* FOOTER BUTTONS */}
      <div className="mt-5 flex justify-between gap-3">
        <Link href={`/jobs/${jobs?._id}`} className="text-sm text-primary">
          View Details
        </Link>

        <Link href={`/jobs/${jobs?._id.toString()}`}>Apply Now</Link>
      </div>
    </Card>
  );
};

export default JobCard;
