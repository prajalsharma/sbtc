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
      <div className="w-full md:w-[24.05%] flex flex-col md:flex-row gap-3 relative items-center justify-around">
        <MultiSelect
          options={jobFunctionOptions}
          onValueChange={setSelectedJobFunction}
          defaultValue={selectedJobFunction}
          className="w-full "
          placeholder="Job Function"
        />
        <MultiSelect
          options={jobTypeOptions}
          onValueChange={setSelectedJobType}
          defaultValue={selectedJobType}
          className="w-full "
          placeholder="Job Type"
        />
        <MultiSelect
          options={experienceOptions}
          onValueChange={setSelectedExperience}
          defaultValue={selectedExperience}
          className=" w-full "
          placeholder="Experience"
        />
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
