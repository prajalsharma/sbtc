import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFilters } from "@/context/FiltersContext";

interface Options {
  jobFunctionOptions: { value: string; label: string }[];
  jobTypeOptions: { value: string; label: string }[];
  experienceOptions?: { value: string; label: string }[];
}

const SelectedFiltersDisplay: React.FC<Options> = ({ jobFunctionOptions, jobTypeOptions }) => {
  const {
    selectedJobFunction,
    setSelectedJobFunction,
    selectedJobType,
    setSelectedJobType,
    selectedExperience,
    setSelectedExperience,
  } = useFilters();

  const handleClearAll = () => {
    setSelectedJobFunction([]);
    setSelectedJobType([]);
    setSelectedExperience([]);
  };

  const handleRemoveJobFunction = (value: string) => {
    setSelectedJobFunction((prev) => prev.filter((item) => item !== value));
  };

  const handleRemoveJobType = (value: string) => {
    setSelectedJobType((prev) => prev.filter((item) => item !== value));
  };

  const handleRemoveExperience = (value: string) => {
    setSelectedExperience((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {selectedJobFunction.map((value) => (
        <FilterBadge
          key={value}
          value={value}
          options={jobFunctionOptions}
          onRemove={handleRemoveJobFunction}
        />
      ))}
      {selectedJobType.map((value) => (
        <FilterBadge
          key={value}
          value={value}
          options={jobTypeOptions}
          onRemove={handleRemoveJobType}
        />
      ))}

      {(selectedJobFunction.length > 0 ||
        selectedJobType.length > 0 ||
        selectedExperience.length > 0) && (
        <Button
          onClick={handleClearAll}
          className="group flex items-center justify-between bg-transparent text-muted-foreground h-auto py-1 transition cursor-pointer hover:bg-transparent hover:text-muted-foreground/80">
          Clear all
        </Button>
      )}
    </div>
  );
};

export default SelectedFiltersDisplay;

const FilterBadge = ({
  value,
  options,
  onRemove,
}: {
  value: string;
  options: { value: string; label: string }[];
  onRemove: (value: string) => void;
}) => (
  <Badge
    key={value}
    className="bg-header-bg/50 text-soft-blue text-[15px] px-3 py-1 border border-soft-blue rounded-sm">
    {options.find((o) => o.value === value)?.label || value}
    <X className="ml-2 h-4 w-4 cursor-pointer" onClick={() => onRemove(value)} />
  </Badge>
);
