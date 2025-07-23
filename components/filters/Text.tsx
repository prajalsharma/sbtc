import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type TextFilterProps = {
  searchTitle: string;
  setSearchTitle: (title: string) => void;
};

const TextFilter = ({ searchTitle, setSearchTitle }: TextFilterProps) => {
  return (
    <div className="rounded py-2 pr-3 pl-10 relative lg:flex-1 ring-2 ring-secondary/20">
      <Search className="text-secondary size-[22px] absolute left-4 top-3.5" />
      <Input
        type="text"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="Search job title or keyword"
        className="border-none focus-visible:ring-0 rounded-none placeholder:text-secondary placeholder:text-[.8438rem] sm:placeholder:text-base placeholder:opacity-40"
      />
    </div>
  );
};
export default TextFilter;
