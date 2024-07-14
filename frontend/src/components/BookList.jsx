import BookCard1 from "./BookCard1";

const BookList = ({ books }) => {
  return (
    <>
      {books.map((book, index) => (
        <BookCard1 key={index} book={book} />
      ))}
    </>
  );
};

export default BookList;
