import { MultiSelect } from "./MultiSelector";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";

const jobFunctionOptions = [
  { value: "Engineering", label: "Engineering" },
  { value: "Product", label: "Product" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Business Development", label: "Business Development" },
  { value: "Operations / HR", label: "Operations / HR" },
  { value: "Finance / Legal", label: "Finance / Legal" },
  { value: "Research", label: "Research" },
  { value: "Customer Success", label: "Customer Success" },
  { value: "Other", label: "Other" },
];

const jobTypeOptions = [
  { value: "Remote", label: "Remote" },
  { value: "On-site", label: "On-site" },
  { value: "Hybrid", label: "Hybrid" },
];

//

import { useFilters } from "@/context/FiltersContext";

const MultiSelectFilter = () => {
  const {
    selectedJobFunction,
    setSelectedJobFunction,
    selectedJobType,
    setSelectedJobType,
    selectedExperience,
    setSelectedExperience,
  } = useFilters();
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-3 relative justify-start">
        <MultiSelect
          options={jobFunctionOptions}
          onValueChange={setSelectedJobFunction}
          defaultValue={selectedJobFunction}
          className="md:w-[24.05%]"
          placeholder="Job Function"
        />
        <MultiSelect
          options={jobTypeOptions}
          onValueChange={setSelectedJobType}
          defaultValue={selectedJobType}
          className="md:w-[24.05%]"
          placeholder="Job Type"
        />

        {/* <button className="md:w-[12%] p-1 rounded relative h-auto bg-inherit cursor-pointer group text-sm self-center">
          More Filters
          <span className="absolute w-full md:w-[70%] left-1/2 bottom-0 -translate-x-1/2 h-0.5 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button> */}
      </div>
      <div className="flex flex-col md:flex-row items-center w-full">
        <SelectedFiltersDisplay
          jobFunctionOptions={jobFunctionOptions}
          jobTypeOptions={jobTypeOptions}
        />
      </div>
    </>
  );
};

export default MultiSelectFilter;
