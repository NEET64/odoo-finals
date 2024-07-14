import SearchBar from "@/components/SearchBar";
import { books } from "../../../data/books";

const HomePage = () => {
  console.log(books);
  return (
    <div className="flex-1">
      <SearchBar />
      <div className="grid grid-cols-2 flex-1">
        <div className="bg-red-400">
          {books.map((book) => {
            return <div className="bg-blue-400">{book.title}</div>;
          })}
        </div>
        <div className="bg-green-400"></div>
      </div>
    </div>
  );
};

export default HomePage;
