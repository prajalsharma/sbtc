"use client";

import { cn } from "@/lib/utils";

const tabs = ["Jobs", "Companies"];

export default function TabSwitcher({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-6 border-border pb-2 text-muted-foreground justify-center items-center">
      {tabs.map((tab) => (
        <a
          key={tab}
          href={`${tab.toLowerCase()}`}
          onClick={() => onTabChange(tab)}
          className={cn(
            "text-lg font-medium px-2 transition-colors duration-200",
            activeTab === tab
              ? "text-secondary border-b-2 border-primary-foreground"
              : "hover:text-primary-foreground"
          )}>
          {tab}
        </a>
      ))}
    </div>
  );
}
