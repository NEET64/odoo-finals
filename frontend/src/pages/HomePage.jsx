import SearchBar from "@/components/SearchBar";
import { books } from "../../../data/books";
import BookCard1 from "@/components/BookCard1";

const HomePage = () => {
  console.log(books);
  return (
    <div className="flex-1 px-4">
      <SearchBar />
      <div className="grid md:grid-cols-2 mx-auto items-center flex-1 max-w-4xl gap-4">
        <div>
          <h2 className="text-2xl font-semibold pb-4">New Arrivals</h2>
          <div className="flex flex-col gap-2">
            {books.map((book) => {
              return <BookCard1 key={book.id} book={book} />;
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold pb-4">Trendings</h2>
          <div className="flex flex-col gap-2">
            {books.map((book) => {
              return <BookCard1 key={book.id} book={book} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
