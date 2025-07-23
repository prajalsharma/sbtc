import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock, House, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  experience: string;
  salary?: string; // Optional field for salary
}

interface JobProps {
  job: Job;
}

const excludedValues = ["N/A", "nil", "null"];

const Card = ({ job }: JobProps) => {
  const jobDescriptionLink =
    job.jobDescription && job.jobDescription.startsWith("http") ? job.jobDescription : "#";

  return (
    <div className="bg-[#1b1b1b] rounded-sm p-6 transition-shadow border border-[#333] shadow-lg hover:shadow-xl">
      <div className="flex gap-4">
        <div className="w-16 h-16 relative items-center justify-center bg-white/5 rounded-sm hidden md:flex">
          {job.image ? (
            <Image
              src={job.image}
              width={64}
              height={64}
              alt="Company logo"
              className="object-contain p-2"
            />
          ) : (
            <ImageOff className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col lg:flex-row flex-1 items-start justify-between">
          <div className="flex flex-col gap-2 w-full lg:basis-[80%]">
            <div>
              <h2 className="text-[22px] font-semibold tracking-tight leading-6">{job.role}</h2>
              <p className="text-secondary/90 mt-1">{job.project}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.jobFunction && !excludedValues.includes(job.jobFunction) && (
                <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-sm">
                  {job.jobFunction
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              )}
              {job.experience && !excludedValues.includes(job.experience) && (
                <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-sm">
                  {job.experience
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              )}
            </div>

            {/* <div className="flex items-center gap-2 text-muted-foreground text-[15px] max-w-2xl">
              <p>{job.jobDescription}</p>
            </div> */}

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              {job.jobType === "Remote" && !excludedValues.includes(job.jobType) && (
                <span className="py-1 font-medium text-secondary/60 flex items-center">
                  <House className="inline w-4 h-4 mr-1 text-muted-foreground" />
                  {job.jobType}
                </span>
              )}
              {job.jobType === "Remote" && job.salary && (
                <span className="text-muted-foreground">·</span>
              )}
              <span className="py-1 font-medium text-secondary/60 flex items-center">
                {job.salary
                  ? `$${new Intl.NumberFormat("en-US").format(Number(job.salary))}`
                  : "Salary not disclosed"}
              </span>
              {job.salary && <span className="text-muted-foreground">·</span>}
              <span className="py-1 font-medium text-secondary/60 flex items-center">
                <Clock className="inline w-4 h-4 mr-1 text-muted-foreground" />3 days ago
              </span>
            </div>
          </div>

          <div className="flex lg:flex-col items-end justify-between w-full h-full lg:basis-[20%]">
            {job.location && !excludedValues.includes(job.location) && (
              <div className="flex items-center gap-2 text-secondary/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{job.location}</span>
              </div>
            )}
            <Link
              href={jobDescriptionLink}
              target="_blank"
              className="text-lg text-soft-blue flex items-center gap-1 font-bold hover:text-soft-blue/50 transition-colors">
              <ArrowRight className="inline size-5" />
              Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.Skeleton = function CardSkeleton() {
  return (
    <div className="bg-[#1b1b1b] rounded-sm p-6 border border-[#333]">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-sm hidden md:flex" />

        <div className="flex flex-col lg:flex-row flex-1 items-start justify-between">
          <div className="flex flex-col gap-2 w-full lg:basis-[80%]">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32 mt-1" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>

            <Skeleton className="h-4 w-full max-w-2xl" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="flex lg:flex-col items-end justify-between w-full h-full lg:basis-[20%]">
            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
