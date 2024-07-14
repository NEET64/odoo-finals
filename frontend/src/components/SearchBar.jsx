import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <form
      className="relative mx-auto m-4 grow-0 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/books?q=${search}`);
      }}>
      <Search className="absolute left-2.5 top-2.5 h-5 w-5 dark:text-zinc-50" />
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        className=" max-w-5xl rounded-lg bg-background pl-10 pr-14 sm:w-[450px]"
        onChange={(e) => {
          setSearch(e.target.value.trim());
        }}
      />
      <span className="hidden sm:flex absolute right-24">
        <kbd className="pointer-events-none border-slate-200 inline-flex h-6 select-none items-center gap-1 rounded border my-2 px-2 text-[15px] font-medium opacity-100 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-800 ">
          <span className="text-xs">⌘</span>K
        </kbd>
      </span>
      <Button variant="outline">Search</Button>
    </form>
  );
};

export default SearchBar;
