"use client";
import { useSession } from "@/lib/auth-client";
import { div } from "motion/react-client";
import React from "react";
import { FileText, Users, Briefcase, CircleCheck } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

const RecruiterHomePage = () => {
  const stats = [
    {
      title: "Total Job Posts",
      value: 48,
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Users,
    },
    {
      title: "Active Jobs",
      value: 18,
      icon: Briefcase,
    },
    {
      title: "Jobs Closed",
      value: 32,
      icon: CircleCheck,
    },
  ];

  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log(user);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome Back , {user?.name}</h1>
      <div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-2">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterHomePage;
