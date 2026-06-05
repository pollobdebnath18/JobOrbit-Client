import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar></DashboardSidebar>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
