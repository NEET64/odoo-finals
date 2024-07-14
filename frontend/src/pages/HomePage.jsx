import SearchBar from "@/components/SearchBar";
import { isLoggedInAtom } from "@/atoms/userData";
import { useRecoilValue } from "recoil";
import UserHome from "@/components/UserHome";
import AllHome from "@/components/AllHome";

const HomePage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <div className="flex-1 px-4">{isLoggedIn ? <UserHome /> : <AllHome />}</div>
  );
};

export default HomePage;
