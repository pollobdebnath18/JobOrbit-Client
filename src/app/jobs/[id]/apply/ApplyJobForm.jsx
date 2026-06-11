"use client";

import React, { useState } from "react";

import { Input, Label, Checkbox, Button } from "@heroui/react";

import { Briefcase, Person, Link, Globe, Code } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/applications";

/*  FIX: Field moved OUTSIDE component */
const Field = ({ label, icon, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-gray-300 text-sm">
        {icon}
        <Label>{label}</Label>
      </div>
      {children}
    </div>
  );
};

const ApplyJobForm = ({ job, applicant }) => {
  const [formData, setFormData] = useState({
    resume: "",
    portfolio: "",
    github: "",
    linkedin: "",
    additionalInfo: "",
    agreed: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      jobId: job?._id,
      jobTitle: job?.jobTitle,

      applicantId: applicant?.id,
      applicationName: applicant?.name,
      applicationEmail: applicant?.email,

      // FIXED FIELDS (from your DB)
      companyId: job?.companyId,
      companyName: job?.companyName,

      ...formData,
    };
    console.log("Application Submitted:", payload);
    const res = await submitApplication(payload);
    if (res.insertedId) {
      alert("Application submitted successfully!");
      handleReset();
    } else {
      alert("Failed to submit application. Please try again.");
    }

    // onSubmit?.(payload);
  };

  const handleReset = () => {
    setFormData({
      resume: "",
      portfolio: "",
      github: "",
      linkedin: "",
      additionalInfo: "",
      agreed: false,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-bold">Apply for {job?.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-gray-400 mt-1">
            <Person className="w-4 h-4" />
            <span>{applicant?.name}</span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            {" "}
            {/* Resume */}
            <Field
              label="Resume Link"
              icon={<Link className="w-4 h-4 text-blue-400" />}
            >
              <Input
                type="url"
                placeholder="https://drive.google.com/..."
                value={formData.resume}
                onChange={(e) => handleChange("resume", e.target.value)}
                className="w-full"
              />
            </Field>
            {/* Portfolio */}
            <Field
              label="Portfolio / Website"
              icon={<Globe className="w-4 h-4 text-blue-400" />}
            >
              <Input
                type="url"
                placeholder="https://your-site.com"
                value={formData.portfolio}
                onChange={(e) => handleChange("portfolio", e.target.value)}
                className="w-full"
              />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* GitHub */}
            <Field
              label="GitHub"
              icon={<Code className="w-4 h-4 text-blue-400" />}
            >
              <Input
                type="url"
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={(e) => handleChange("github", e.target.value)}
                className="w-full"
              />
            </Field>

            {/* LinkedIn */}
            <Field
              label="LinkedIn"
              icon={<Link className="w-4 h-4 text-blue-400" />}
            >
              <Input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                className="w-full"
              />
            </Field>
          </div>

          {/* Additional Info */}
          <Field
            label="Additional Information"
            icon={<Person className="w-4 h-4 text-blue-400" />}
          >
            <textarea
              className="w-full rounded-xl p-3 min-h-[100px] bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-400 outline-none"
              placeholder="Anything else..."
              value={formData.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
            />
          </Field>

          {/* CHECKBOX */}
          <Checkbox
            isSelected={formData.agreed}
            onValueChange={(v) => handleChange("agreed", v)}
          >
            <span className="text-gray-300">
              I confirm all information is correct
            </span>
          </Checkbox>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              color="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              //   isDisabled={!formData.agreed || !formData.resume}
            >
              Submit Application
            </Button>

            <Button
              type="button"
              variant="flat"
              className="bg-white/10 text-white hover:bg-white/20"
              onPress={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobForm;
