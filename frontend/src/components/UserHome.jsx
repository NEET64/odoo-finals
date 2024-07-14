import { Mail, MapPin, Pencil, Phone } from "lucide-react";
import SearchBar from "./SearchBar";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/userData";
import BookList from "./BookList";
import { books as demoBooks } from "../../../data/books";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "zod";

const UserHome = () => {
  const user = useRecoilValue(userAtom);
  const [books, setBooks] = useState(demoBooks);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/library`)
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [counter]);

  return (
    <>
      <div className="grid md:grid-cols-3 flex-1 items-start gap-2">
        <div className="col-span-2">
          <SearchBar />
          <div className="max-w-lg grid items-center gap-2 ml-40">
            <BookList
              books={books}
              handleReloadset={setCounter}
              handleReloadval={counter}
            />
          </div>
        </div>
        <div className="my-8">
          <h2 className="text-2xl font-semibold border-b-2 my-2">
            User Profile
          </h2>
          <div className="flex gap-2 m-4">
            <img
              src="https://picsum.photos/200"
              className="border-2 border-black rounded-lg h-[50px] w-[50px]"
            />
            <div className="flex col-span-3 flex-col">
              <h3 className="text-lg line-clamp-1 font-semibold items-center">
                {user.userName}
              </h3>
              <p>{user.role}</p>
            </div>
          </div>
          <div className="grid gap-2 m-4">
            <div className="flex gap-2 items-start">
              <MapPin size={20} />
              <div className="leading-4">{user.address}</div>
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={20} />
              <div>+91 {user.phone}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={20} />
              <div>{user.email}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Pencil size={20} />
              <div>Edit Information</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
