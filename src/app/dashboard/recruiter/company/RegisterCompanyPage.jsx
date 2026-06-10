"use client";

import { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Button,
  toast,
} from "@heroui/react";
import { PlusCircle, Upload } from "lucide-react";

import { Building2 } from "lucide-react";
import { createCompany } from "@/lib/actions/company";

const textInputClass =
  "bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white";

const textAreaClass =
  "bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white";

const triggerClasses =
  "bg-[#1c1c1e] border border-zinc-800 rounded-lg text-white h-12";

const popoverClasses = "bg-[#18181b] border border-zinc-800 rounded-lg";

const listItemClasses =
  "text-zinc-300 hover:bg-zinc-800 rounded-md cursor-pointer";

export default function RegisterCompanyPage({ recruiter, recruiterCompany }) {
  const [errors, setErrors] = useState({});
  const [hasCompany, setHasCompany] = useState(recruiterCompany);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    console.log("Selected file:", file); //  DEBUG

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.companyName) newErrors.companyName = "Company name is required";

    if (!data.industry) newErrors.industry = "Industry is required";

    if (!data.location) newErrors.location = "Location is required";

    if (!data.employeeCount)
      newErrors.employeeCount = "Employee count is required";

    if (!data.description) newErrors.description = "Description is required";

    if (!logoFile) {
      newErrors.logo = "Company logo is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      setLoading(true);

      // ================= VALIDATE FILE =================
      if (!logoFile) {
        newErrors.logo = "Company logo is required";
      }

      // ================= IMAGE UPLOAD =================
      const imageForm = new FormData();
      imageForm.append("image", logoFile);
      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: imageForm,
        },
      );

      if (!uploadRes.ok) {
        throw new Error("Image upload request failed");
      }

      const uploadResult = await uploadRes.json();

      if (!uploadResult?.success) {
        throw new Error(uploadResult?.error?.message || "Image upload failed");
      }

      const imageUrl = uploadResult.data.url;

      // ================= PAYLOAD =================
      const payload = {
        companyName: data.companyName,
        website: data.website || "",
        industry: data.industry,
        location: data.location,
        employeeCount: data.employeeCount,
        description: data.description,
        logo: imageUrl,
        status: "approved",
        createdAt: new Date().toISOString(),
        recruiterId: recruiter.id,
      };

      console.log("Company Payload:", payload);

      const company = await createCompany(payload);
      if (company.insertedId) {
        toast.success("Company Profile Created Successfully");
      }

      // ================= UI UPDATE =================
      setHasCompany(true);
      setShowForm(false);
    } catch (error) {
      console.error("Upload Error:", error.message);

      // optional: show UI error
      setErrors((prev) => ({
        ...prev,
        api: error.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  // ================= EMPTY STATE (OUTSIDE FUNCTION) =================
  if (!hasCompany && !showForm) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Building2 className="w-14 h-14 text-zinc-500 mb-4" />

        <h1 className="text-xl font-semibold text-white">
          No Company Registered Yet
        </h1>

        <p className="text-zinc-400 text-sm mt-2">
          Create your company profile before posting jobs.
        </p>

        <Button
          onClick={() => setShowForm(true)}
          className="mt-6 bg-white text-black font-semibold flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Register Company
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-white" />

          <div>
            <h1 className="text-2xl font-bold text-white">Register Company</h1>

            <p className="text-zinc-400 text-sm mt-1">
              Create your company profile before posting jobs.
            </p>
          </div>
        </div>
      </div>

      <Form
        onSubmit={handleSubmit}
        validationErrors={errors}
        validationBehavior="aria"
        className="space-y-8"
      >
        {/* Company Information */}
        <Fieldset className="space-y-6 w-full">
          <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
            Company Information
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              name="companyName"
              isInvalid={!!errors.companyName}
              className="flex flex-col gap-1"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Company Name
              </Label>

              <Input
                placeholder="Acme Corporation"
                className={textInputClass}
              />

              {errors.companyName && (
                <FieldError className="text-danger text-xs">
                  {errors.companyName}
                </FieldError>
              )}
            </TextField>

            <TextField name="website" className="flex flex-col gap-1">
              <Label className="text-zinc-400 font-medium text-sm">
                Website
              </Label>

              <Input
                placeholder="https://company.com"
                className={textInputClass}
              />
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select name="industry" isInvalid={!!errors.industry}>
              <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                Industry
              </Label>

              <Select.Trigger className={triggerClasses}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className={popoverClasses}>
                <ListBox>
                  <ListBox.Item id="technology" className={listItemClasses}>
                    Technology
                  </ListBox.Item>

                  <ListBox.Item id="finance" className={listItemClasses}>
                    Finance
                  </ListBox.Item>

                  <ListBox.Item id="healthcare" className={listItemClasses}>
                    Healthcare
                  </ListBox.Item>

                  <ListBox.Item id="education" className={listItemClasses}>
                    Education
                  </ListBox.Item>

                  <ListBox.Item id="marketing" className={listItemClasses}>
                    Marketing
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField
              name="location"
              isInvalid={!!errors.location}
              className="flex flex-col gap-1"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Location
              </Label>

              <Input placeholder="New York, USA" className={textInputClass} />

              {errors.location && (
                <FieldError className="text-danger text-xs">
                  {errors.location}
                </FieldError>
              )}
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Employee Count */}
            <div className="flex flex-col">
              <Select name="employeeCount" isInvalid={!!errors.employeeCount}>
                <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                  Employee Count
                </Label>

                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className={popoverClasses}>
                  <ListBox>
                    <ListBox.Item id="1-10">1 - 10</ListBox.Item>
                    <ListBox.Item id="11-50">11 - 50</ListBox.Item>
                    <ListBox.Item id="51-200">51 - 200</ListBox.Item>
                    <ListBox.Item id="201-500">201 - 500</ListBox.Item>
                    <ListBox.Item id="500+">500+</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Logo Upload */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-zinc-400 mb-1">
                Company Logo
              </label>

              <label
                htmlFor="logo-upload"
                className="group flex h-12 cursor-pointer items-center gap-3 rounded-lg border border-zinc-800 bg-[#1c1c1e] px-4 transition-all hover:border-primary"
              >
                {/* ICON / PREVIEW BOX */}
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 overflow-hidden">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Upload className="h-4 w-4 text-primary" />
                  )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-white">
                    Upload Logo
                  </span>

                  <span className="text-xs text-zinc-500">
                    PNG, JPG • Max 5MB
                  </span>
                </div>

                <input
                  id="logo-upload"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleLogoChange}
                  name="logo"
                />
              </label>
            </div>
          </div>
        </Fieldset>

        {/* Description */}
        <Fieldset className="space-y-6 w-full">
          <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
            Company Description
          </legend>

          <TextField
            name="description"
            isInvalid={!!errors.description}
            className="flex flex-col gap-1"
          >
            <Label className="text-zinc-400 font-medium text-sm">
              Description
            </Label>

            <TextArea
              rows={6}
              placeholder="Tell candidates about your company..."
              className={textAreaClass}
            />

            {errors.description && (
              <FieldError className="text-danger text-xs">
                {errors.description}
              </FieldError>
            )}
          </TextField>
        </Fieldset>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
          <Button
            type="button"
            variant="bordered"
            className="border-zinc-800 text-zinc-300"
          >
            Cancel
          </Button>

          <Button type="submit" className="bg-white text-black font-semibold">
            Register Company
          </Button>
        </div>
      </Form>
    </div>
  );
}
