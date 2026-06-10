"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Label, InputGroup, Button } from "@heroui/react";

const JobFilter = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    jobType: params.get("type") || "",
    category: params.get("category") || "",
    remote: params.get("remote") === "true",
  });

  const updateURL = (updated) => {
    const query = new URLSearchParams();

    if (updated.search) query.set("search", updated.search);
    if (updated.jobType) query.set("type", updated.jobType);
    if (updated.category) query.set("category", updated.category);
    if (updated.remote) query.set("remote", "true");

    router.push(`/jobs?${query.toString()}`);
  };

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    updateURL(updated);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      jobType: "",
      category: "",
      remote: false,
    });

    router.push("/jobs");
  };

  return (
    <div
      className="
        w-full
        bg-zinc-900
        border border-white/10
        p-4
        rounded-xl
        flex flex-col md:flex-row
        gap-3 md:items-end
      "
    >
      {/* SEARCH */}
      <div className="flex-1">
        <TextField>
          <Label className="text-white">Search Job</Label>
          <InputGroup>
            <InputGroup.Input
              value={filters.search}
              placeholder="Search..."
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </InputGroup>
        </TextField>
      </div>

      {/* JOB TYPE */}
      <div className="flex-1">
        <select
          className="w-full p-2 bg-black border border-white/10 text-white rounded"
          value={filters.jobType}
          onChange={(e) => handleChange("jobType", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* CATEGORY */}
      <div className="flex-1">
        <select
          className="w-full p-2 bg-black border border-white/10 text-white rounded"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="engineering">Engineering</option>
          <option value="marketing">Marketing</option>
          <option value="design">Design</option>
        </select>
      </div>

      {/* REMOTE */}
      <label className="flex items-center gap-2 text-white text-sm flex-1">
        <input
          type="checkbox"
          checked={filters.remote}
          onChange={(e) => handleChange("remote", e.target.checked)}
        />
        Remote Only
      </label>

      {/* RESET */}
      <div>
        <Button variant="bordered" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default JobFilter;
