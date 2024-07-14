import BookCard1 from "./BookCard1";
import { books as demoBooks } from "../../../data/books";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import { useEffect, useState } from "react";
import axios from "axios";

export const AllHome = () => {
  const [books, setBooks] = useState(demoBooks);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/library`)
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
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
