import BookCard2 from "@/components/BookCard2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/all`)
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const promise = axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/all?q=${search}`)
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      });
    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        return "Search succesfull";
      },
      error: (error) => "Noting found",
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div div className="flex flex-col justify-center items-center w-full p-4">
      <form
        className="relative mx-auto m-4 grow-0 flex gap-2"
        onSubmit={handleSearch}>
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 dark:text-zinc-50" />
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className=" max-w-5xl rounded-lg bg-background pl-10 pr-14 sm:w-[350px]"
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
      <div className="flex flex-wrap gap-2">
        {books.map((book, index) => (
          <BookCard2 book={book} key={index} />
        ))}
      </div>
    </div>
  );
};
export default AddBook;
