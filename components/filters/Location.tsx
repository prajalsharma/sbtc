import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

type LocationFilterProps = {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
};

const LocationFilter = ({ searchLocation, setSearchLocation }: LocationFilterProps) => {
  return (
    <div className="py-2 pr-3 pl-10 relative lg:flex-1">
      <MapPin className="text-slate-800 size-[1.375rem] absolute left-4 top-4" />
      <Input
        type="text"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        placeholder="Location"
        className="border-none focus-visible:ring-0 rounded-none placeholder:text-[.8438rem] sm:placeholder:text-base placeholder:opacity-40"
      />
    </div>
  );
};
export default LocationFilter;
