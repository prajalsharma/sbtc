"use client";
import { createContext, useContext, ReactNode, useState } from "react";

interface FiltersContextType {
  selectedJobFunction: string[];
  setSelectedJobFunction: React.Dispatch<React.SetStateAction<string[]>>;
  selectedJobType: string[];
  setSelectedJobType: React.Dispatch<React.SetStateAction<string[]>>;
  selectedExperience: string[];
  setSelectedExperience: React.Dispatch<React.SetStateAction<string[]>>;
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
  searchLocation: string;
  setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [selectedJobFunction, setSelectedJobFunction] = useState<string[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <FiltersContext.Provider
      value={{
        selectedJobFunction,
        setSelectedJobFunction,
        selectedJobType,
        setSelectedJobType,
        selectedExperience,
        setSelectedExperience,
        searchTitle,
        setSearchTitle,
        searchLocation,
        setSearchLocation,
      }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
}
