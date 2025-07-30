"use client";

import { useState } from "react";
import TabSwitcher from "@/components/TabSwitcher";
import CompanyCard from "@/app/companies/_components/CompanyCard";
import IndustryFilter from "@/app/companies/_components/IndustryFilter";
import { mockCompanies } from "@/data/mockCompanies";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState("Companies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustries =
      selectedIndustries.length === 0 ||
      company.industry.some((companyIndustry) =>
        selectedIndustries.some((selectedIndustry) =>
          companyIndustry.toLowerCase().includes(selectedIndustry.toLowerCase())
        )
      );

    return matchesSearch && matchesIndustries;
  });

  return (
    <div className="flex flex-col p-4 text-secondary">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="py-12 w-full md:w-[90%] lg:w-[85%] mx-auto">
        <div className="mx-auto flex flex-col gap-14">
          <div className="bg-[#1b1b1b] border border-[#333] shadow-lg rounded-sm flex flex-col shadow-[#1b1b1b]/60 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/50 h-4 w-4" />
              <Input
                placeholder="Search companies by name or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-[#333] text-secondary py-6"
              />
            </div>
            <IndustryFilter
              selectedIndustries={selectedIndustries}
              setSelectedIndustries={setSelectedIndustries}
            />
          </div>
        </div>
      </div>

      <div className="lg:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-[90%] lg:w-[85%] mx-auto">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}
