import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-15 h-screen">
        <DashboardSidebar></DashboardSidebar>
      </div>
      <div className="flex-1 ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
