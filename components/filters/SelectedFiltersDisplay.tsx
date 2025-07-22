import { Badge } from "@/components/ui/badge";
import { XCircle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFilters } from "@/context/FiltersContext";

interface Options {
  jobFunctionOptions: { value: string; label: string }[];
  jobTypeOptions: { value: string; label: string }[];
  experienceOptions: { value: string; label: string }[];
}

const SelectedFiltersDisplay: React.FC<Options> = ({
  jobFunctionOptions,
  jobTypeOptions,
  experienceOptions,
}) => {
  const {
    selectedJobFunction,
    setSelectedJobFunction,
    selectedJobType,
    setSelectedJobType,
    selectedExperience,
    setSelectedExperience,
  } = useFilters();
  const getOptionLabel = (value: string, options: { value: string; label: string }[]) => {
    const option = options.find((o) => o.value === value);
    return option ? option.label : value;
  };

  const handleClearAll = () => {
    setSelectedJobFunction([]);
    setSelectedJobType([]);
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
        <Badge
          key={value}
          className="bg-transparent text-foreground border-foreground hover:bg-transparent text-sm my-1">
          {getOptionLabel(value, jobFunctionOptions)}
          <XCircle
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => handleRemoveJobFunction(value)}
          />
        </Badge>
      ))}
      {selectedJobType.map((value) => (
        <Badge
          key={value}
          className="bg-transparent text-foreground border-foreground hover:bg-transparent text-sm my-1">
          {getOptionLabel(value, jobTypeOptions)}
          <XCircle
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => handleRemoveJobType(value)}
          />
        </Badge>
      ))}
      {selectedExperience.map((value) => (
        <Badge
          key={value}
          className="bg-transparent text-foreground border-foreground hover:bg-transparent text-sm my-1">
          {getOptionLabel(value, experienceOptions)}
          <XCircle
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => handleRemoveExperience(value)}
          />
        </Badge>
      ))}
      {(selectedJobFunction.length > 0 ||
        selectedJobType.length > 0 ||
        selectedExperience.length > 0) && (
        <Button
          onClick={handleClearAll}
          className="group flex items-center justify-between bg-transparent text-black/40 h-auto py-1 hover:bg-transparent hover:text-black hover:ring-inset hover:ring-1 hover:ring-black transition cursor-pointer">
          Clear all{" "}
          <XIcon className="h-4 cursor-pointer text-black/40 group-hover:text-black transition" />
        </Button>
      )}
    </div>
  );
};

export default SelectedFiltersDisplay;
