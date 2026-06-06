import React from "react";

const StatCard = ({ title, value, icon: Icon, description, trend }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-default-200  bg-gray-700 bg-content1 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-300" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          {Icon && <Icon className="h-7 w-7 text-primary" />}
        </div>

        {trend && (
          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              trend > 0
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {trend > 0 ? `+${trend}%` : `${trend}%`}
          </div>
        )}
      </div>

      <div className="relative mt-8">
        <p className="text-sm font-medium text-default-500">{title}</p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight">{value}</h2>

        {description && (
          <p className="mt-3 text-sm text-default-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
