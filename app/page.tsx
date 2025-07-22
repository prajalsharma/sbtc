"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilters } from "@/context/FiltersContext";
import MultiSelectFilter from "@/components/filters/JobFilters";
import LocationFilter from "@/components/filters/Location";
import TextFilter from "@/components/filters/Text";
import Card from "@/components/JobCard";

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
}

export default function Home() {
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

          allJobs = data.btcJobs;
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
    <div className="flex flex-col items-center p-4 text-secondary">
      <div className="text-center py-8 md:py-16">
        <h1 className="text-5xl md:text-6xl font-medium">Find your Dream Job</h1>
        <p className="mt-2 text-secondary/80 text-lg">
          Discover exciting job opportunities tailored to your skills for best results.
        </p>
      </div>
      <div className="py-12 w-full md:w-[90%] lg:w-[85%]">
        <div className="mx-auto flex flex-col gap-14 ">
          <div className="bg-white border-[1.5px] rounded-sm flex flex-col">
            <div className="flex flex-col lg:gap-4 lg:flex-row divide-y-[1.5px] lg:divide-x-[1.5px] lg:divide-y-0 border-b">
              <TextFilter searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
              <LocationFilter
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
              />
            </div>
            <div className="flex flex-col px-4 py-3 w-full gap-4 ">
              <MultiSelectFilter />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 px-7 md:px-12">
        <div className="flex flex-col gap-5 mx-auto max-w-[70.75rem]">
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
              <p className="text-sm text-slate-800">
                Showing <span className="font-bold">{filteredjobs.length}</span> jobs
              </p>
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
