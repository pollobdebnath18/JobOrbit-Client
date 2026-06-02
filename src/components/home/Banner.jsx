import { Input, Button, TextField } from "@heroui/react";
import { Search, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative w-full bg-black text-white py-20 px-4 overflow-hidden">
      {/* Globe Background - Absolute and Centered */}

      {/* Main Content - Relative to stack on top of background */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1 text-sm text-zinc-400">
          <Briefcase size={16} />
          <span>50,000+ NEW JOBS THIS MONTH</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Find Your Dream Job Today
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          JobOrbit connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800 backdrop-blur-sm">
          <TextField className="flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-zinc-500" size={20} />
              <Input
                placeholder="Job title, skill or company"
                className="pl-10 bg-transparent"
              />
            </div>
          </TextField>

          <div className="w-px h-10 bg-zinc-800 hidden md:block" />

          <TextField className="flex-1">
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 text-zinc-500" size={20} />
              <Input
                placeholder="Location or Remote"
                className="pl-10 bg-transparent"
              />
            </div>
          </TextField>

          <Button
            isIconOnly
            className="bg-blue-600 text-white rounded-xl h-10 w-10 md:h-12 md:w-12"
          >
            <Search size={20} />
          </Button>
        </div>

        {/* Trending Positions */}
        <div className="flex justify-center items-center gap-4 pt-4 text-sm">
          <span className="text-zinc-500">Trending Position</span>
          {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(
            (tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full border border-zinc-800 hover:border-blue-500 transition-colors"
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
