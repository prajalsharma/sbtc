"use client";

interface IndustryFilterProps {
  selectedIndustries: string[];
  setSelectedIndustries: React.Dispatch<React.SetStateAction<string[]>>;
}

const industries = [
  "AI",
  "API Services",
  "Blockchain",
  "Blockchain Security",
  "DeFi",
  "Infra & Tools",
  "RWA",
  "Wallet",
];

export default function IndustryFilter({
  selectedIndustries,
  setSelectedIndustries,
}: IndustryFilterProps) {
  const handleIndustryClick = (industry: string) => {
    setSelectedIndustries((prev: string[]) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {industries.map((industry) => (
        <button
          key={industry}
          onClick={() => handleIndustryClick(industry)}
          className={`px-3 py-1.5 text-sm rounded-sm transition-colors duration-200 
            ${
              selectedIndustries.includes(industry)
                ? "border-[1.5px] border-soft-blue bg-header-bg text-secondary/80 ring-inset"
                : "border border-[#333] bg-transparent text-secondary/80 hover:text-soft-blue hover:border-soft-blue"
            }`}>
          {industry}
        </button>
      ))}
    </div>
  );
}
