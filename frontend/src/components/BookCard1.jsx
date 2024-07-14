import { userRoleAtom } from "@/atoms/userData";
import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import axios from "axios";

const BookCard1 = ({ book, parentReloadset, parentReloadval }) => {
  const userRole = useRecoilValue(userRoleAtom);
  console.log(book);
  const handleDeleteBook = () => {
    const promise = axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/v1/book/bin/${book._id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        parentReloadset(parentReloadval + 1);
        return "Delete succesfull";
      },
      error: (error) => "Something went wrong",
    });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <img
        src={book.image_url}
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
        {userRole === "librarian" && (
          <Button
            variant="destructive"
            className="block w-fit"
            onClick={handleDeleteBook}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard1;
