"use client";
import { Briefcase, Building2, Users, Star } from "lucide-react";
import Image from "next/image";
import BgImg from "@/images/globe.png";
import { motion } from "motion/react";

const Stats = () => {
  const statsData = [
    {
      icon: <Briefcase size={24} className="text-blue-500" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: <Building2 size={24} className="text-purple-500" />,
      value: "12K",
      label: "Companies",
    },
    {
      icon: <Users size={24} className="text-emerald-500" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: <Star size={24} className="text-amber-500" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative py-16 px-4 bg-black text-white overflow-hidden">
      {/* Background Globe Container */}
      {/* Increased height slightly to ensure the image has space to render */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40">
        <div className="relative w-full max-w-[800px] h-[400px]">
          <Image
            src={BgImg}
            alt="Globe Background"
            fill
            sizes="800px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Intro Text */}
        <div className="mb-16">
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl md:text-3xl font-medium text-zinc-300 leading-tight"
          >
            Assisting over{" "}
            <span className="text-white font-bold">15,000 job seekers</span>
            <br />
            find their dream positions.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-6 rounded-3xl flex flex-col items-center gap-4 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                {stat.icon}
              </div>
              <div className="text-left">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-zinc-500 text-sm font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
