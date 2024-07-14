import BookCard1 from "./BookCard1";

const BookList = ({ books, handleReloadset, handleReloadval }) => {
  return (
    <>
      {books.map((book, index) => (
        <BookCard1
          key={index}
          book={book}
          parentReloadset={handleReloadset}
          parentReloadval={handleReloadval}
        />
      ))}
    </>
  );
};

export default BookList;
