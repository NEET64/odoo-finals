import axios from "axios";
import { useEffect } from "react";

const AddBook = () => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/book/all`)
      .then((response) => {
        console.log(response.data);
      });
  }, []);
  return (
    <div>
      <h1>Add Book</h1>
    </div>
  );
};
export default AddBook;
