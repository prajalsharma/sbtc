"use client";

import Image from "next/image";
import Link from "next/link";

interface CompanyCardProps {
  company: {
    _id: string;
    name: string;
    description: string;
    size: string;
    industry: string[];
    location: string[];
    image: string;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href="#">
      <div className="bg-[#1b1b1b] border border-[#333] p-6 rounded-sm hover:border-primary-foreground transition-colors duration-200 h-full shadow-sm shadow-[#333]/50">
        <div className="flex flex-col gap-4">
          <div className="relative h-12 w-12">
            <Image src={company.image} alt={company.name} fill className="object-contain" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-secondary">{company.name}</h3>
            <p className="text-secondary/80 text-sm line-clamp-3">{company.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {company.industry.map((tag) => (
              <span key={tag} className="bg-[#333] px-2 py-1 text-xs rounded text-secondary/80">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-secondary/80"></div>
        </div>
      </div>
    </Link>
  );
}
