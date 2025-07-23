import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

type LocationFilterProps = {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
};

const LocationFilter = ({ searchLocation, setSearchLocation }: LocationFilterProps) => {
  return (
    <div className="rounded py-2 pr-3 pl-10 relative lg:flex-1 ring-2 ring-secondary/20 ">
      <MapPin className="text-secondary size-[1.375rem] absolute left-4 top-3.5" />
      <Input
        type="text"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        placeholder="Location"
        className="border-none focus-visible:ring-0 rounded-none placeholder:text-secondary placeholder:text-[.8438rem] sm:placeholder:text-base placeholder:opacity-40"
      />
    </div>
  );
};
export default LocationFilter;
