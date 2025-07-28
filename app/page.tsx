"use client";

import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/context/FiltersContext";
import MultiSelectFilter from "@/components/filters/JobFilters";
import LocationFilter from "@/components/filters/Location";
import TextFilter from "@/components/filters/Text";
import Card from "@/components/JobCard";
import TabSwitcher from "@/components/TabSwitcher";
import { ChevronDown } from "lucide-react";

interface Job {
  _id: string;
  role: string;
  jobType: string;
  location: string;
  hybrid: string;
  jobFunction: string;
  jobDescription: string;
  jobURL: string;
  project: string;
  image: string;
  experience: string;
  salary?: string;
  createdAt?: string; // Added timestamp fields
  updatedAt?: string;
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
    const fetchAllJobs = async () => {
      let allJobs: Job[] = [];

      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const data = await response.json();

          allJobs = data.jobs;
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }

      setAllJobs(allJobs);
      setFilteredJobs(allJobs);
      setLoading(false);
    };

    fetchAllJobs();
  }, []);

  const handleFilters = useCallback(
    (
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
                  return job.jobType === "remote";
                } else if (type === "On-site") {
                  return job.jobType === "on-site";
                } else if (type === "Hybrid") {
                  return job.jobType === "true";
                }
                return false;
              })
            : true;

        const matchesExperience =
          selectedExperience.length > 0 ? selectedExperience.includes(job.experience) : true;

        const matchesLocation = location
          ? job.location.toLowerCase().includes(location.toLowerCase())
          : true;

        const matchesTitle = title ? job.role.toLowerCase().includes(title.toLowerCase()) : true;

        return (
          matchesJobFunction &&
          matchesJobType &&
          matchesExperience &&
          matchesLocation &&
          matchesTitle
        );
      });

      setFilteredJobs(filtered);
    },
    [setFilteredJobs]
  );

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
    handleFilters,
    allJobs,
    selectedJobFunction,
    selectedJobType,
    selectedExperience,
    searchLocation,
    searchTitle,
  ]);

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
