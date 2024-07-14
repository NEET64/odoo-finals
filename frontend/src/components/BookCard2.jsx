import { toast } from "sonner";
import { Button } from "./ui/button";
import axios from "axios";

const BookCard2 = ({ book }) => {
  const handleAddToLibrary = () => {
    console.log(book);
    const promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/v1/book/add`,
      {
        ...book,
        image_url: book.image_url,
        author: book.authors,
      }
    );
    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        return "Add succesfull";
      },
      error: (error) => "Something went wrong",
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 max-w-80">
      <div>
        <img src={book.image_url} alt="Book Cover" className="w-40" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold line-clamp-2">{book.title}</h2>
        <p className="text-muted-foreground line-clamp-1">{book.author}</p>
        <p className="text-sm leading-relaxed line-clamp-3">
          {book.description}
        </p>
        <Button
          variant="outline"
          className="mt-auto"
          onClick={handleAddToLibrary}>
          Add to Library
        </Button>
      </div>
    </div>
  );
};
export default BookCard2;
