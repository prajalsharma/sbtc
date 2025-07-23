import { MultiSelect } from "./MultiSelector";
import SelectedFiltersDisplay from "./SelectedFiltersDisplay";

const jobFunctionOptions = [
  { value: "software_engineering", label: "Software Engineering" },
  { value: "marketing_communication", label: "Marketing Communication" },
  { value: "sales_business_dev", label: "Sales Business Dev" },
  { value: "data_science", label: "Data Science" },
  { value: "research_development", label: "Research Development" },
  { value: "product_management", label: "Product Management" },
  { value: "design_ux", label: "Design UX" },
  { value: "content", label: "Content" },
  { value: "other_engineering", label: "Other Engineering" },
  { value: "devops_infrastructure", label: "DevOps Infrastructure" },
  { value: "accounting_finance", label: "Accounting Finance" },
];

const jobTypeOptions = [
  { value: "hybrid", label: "On-Site" },
  { value: "Remote", label: "Remote" },
];

const experienceOptions = [
  { value: "entry_level", label: "0-2 years" },
  { value: "mid_level", label: "2-5 years" },
  { value: "senior_level", label: "5+ years" },
];

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
      <div className="w-full flex flex-col md:flex-row gap-3 relative items-center justify-start">
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
        <MultiSelect
          options={experienceOptions}
          onValueChange={setSelectedExperience}
          defaultValue={selectedExperience}
          className="md:w-[24.05%]"
          placeholder="Experience"
        />
        <button className="md:w-[12%] p-1 rounded relative h-auto bg-inherit self-start cursor-pointer group text-sm">
          More Filters
          <span className="absolute w-full md:w-[70%] left-1/2 bottom-0 -translate-x-1/2 h-0.5 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full">
        <SelectedFiltersDisplay
          jobFunctionOptions={jobFunctionOptions}
          jobTypeOptions={jobTypeOptions}
          experienceOptions={experienceOptions}
        />
      </div>
    </>
  );
};

export default MultiSelectFilter;
