import BookCard1 from "./BookCard1";
import { books } from "../../../data/books";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import { useEffect, useState } from "react";

export const AllHome = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/library`)
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <SearchBar />
      <div className="grid md:grid-cols-2 mx-auto items-center flex-1 max-w-4xl gap-4">
        <div>
          <h2 className="text-2xl font-semibold pb-4">New Arrivals</h2>
          <div className="flex flex-col gap-2">
            <BookList books={books} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold pb-4">Trendings</h2>
          <div className="flex flex-col gap-2">
            <BookList books={books} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllHome;
