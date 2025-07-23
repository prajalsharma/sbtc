"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/context/FiltersContext";
import MultiSelectFilter from "@/components/filters/JobFilters";
import LocationFilter from "@/components/filters/Location";
import TextFilter from "@/components/filters/Text";
import Card from "@/components/JobCard";
import TabSwitcher from "@/components/TabSwitcher";
import { mockJobs } from "@/data/mockJobs";
import { ChevronDown } from "lucide-react";

interface Job {
  _id: string;
  role: string;
  jobType: string;
  location: string;
  hybrid: string;
  jobFunction: string;
  jobDescription: string;
  project: string;
  image: string;
  exprerience: string;
  salary?: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Jobs");

  const {
    selectedJobFunction,
    selectedJobType,
    searchTitle,
    setSearchTitle,
    searchLocation,
    setSearchLocation,
    selectedExperience,
  } = useFilters();

  const [filteredjobs, setFilteredJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setAllJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      handleFilters(
        allJobs,
        selectedJobFunction,
        selectedJobType,
        selectedExperience,
        searchLocation,
        searchTitle
      );
    };

    if (allJobs.length > 0) {
      applyFilters();
    }
  }, [
    allJobs,
    selectedJobFunction,
    selectedJobType,
    selectedExperience,
    searchLocation,
    searchTitle,
  ]);

  const handleFilters = (
    jobs: Job[],
    selectedJobFunctions: string[],
    selectedJobTypes: string[],
    selectedExperience: string[],
    location: string,
    title: string
  ) => {
    if (
      selectedJobFunctions.length === 0 &&
      selectedJobTypes.length === 0 &&
      selectedExperience.length === 0 &&
      !location &&
      !title
    ) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const matchesJobFunction =
        selectedJobFunctions.length > 0 ? selectedJobFunctions.includes(job.jobFunction) : true;

      const matchesJobType =
        selectedJobTypes.length > 0
          ? selectedJobTypes.some((type) => {
              if (type === "Remote") {
                return job.jobType === "Remote" && job.hybrid === "false";
              } else {
                return job.hybrid === "true";
              }
            })
          : true;

      const matchesExperience =
        selectedExperience.length > 0 ? selectedExperience.includes(job.exprerience) : true;

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesTitle = searchTitle
        ? job.role.toLowerCase().includes(title.toLowerCase())
        : true;

      return (
        matchesJobFunction && matchesJobType && matchesExperience && matchesLocation && matchesTitle
      );
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    handleFilters(
      allJobs,
      selectedJobFunction,
      selectedJobType,
      selectedExperience,
      searchLocation,
      searchTitle
    );
  }, [selectedJobFunction, selectedJobType, selectedExperience, searchLocation, searchTitle]);

  return (
    <div className="flex flex-col p-4 text-secondary">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="py-12 w-full md:w-[90%] lg:w-[85%] mx-auto">
        <div className="mx-auto flex flex-col gap-14 ">
          <div className="bg-[#1b1b1b]  border border-[#333] shadow-lg rounded-sm flex flex-col shadow-[#1b1b1b]/60 p-6 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row">
              <TextFilter searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
              <LocationFilter
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
              />
            </div>
            <div className="flex flex-col py-3 w-full gap-4 pt-6">
              <MultiSelectFilter />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-2">
        <div className="flex flex-col gap-5 w-full md:w-[90%] lg:w-[85%] mx-auto">
          {loading ? (
            <>
              <Skeleton className="h-[1.6rem] w-[10.2rem]" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card.Skeleton key={index} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <p className="text-base text-secondary">
                  Showing
                  <span className="font-bold"> {filteredjobs.length}</span> jobs
                </p>
                <button className="text-sm text-secondary/80">
                  <span className="flex items-center gap-2">
                    Most Recent <ChevronDown className="h-4 w-4 text-secondary/80" />
                  </span>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {filteredjobs.map((job) => (
                  <Card key={job._id} job={job} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
