const BookCard1 = ({ book }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <img
        src={book.imageUrl}
        className="border-2 border-black rounded-lg h-[100px] w-[80px]"
      />
      <div className="flex col-span-3 flex-col">
        <h3 className="text-lg line-clamp-1 font-semibold">{book.title}</h3>
        <div className="flex gap-1 text-slate-600">
          <p>{book.author}</p>&#x2022;
          <p>{book.publishedYear}</p>
        </div>
        <p className="text-sm line-clamp-2 text-slate-600">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard1;
