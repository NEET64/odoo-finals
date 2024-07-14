import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { isLoggedInAtom } from "@/atoms/userData";
import { useRecoilValue } from "recoil";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <header className="sticky top-0 py-2 bg-slate-100 z-30 flex h-14 items-center gap-2 border-b border-slate-200 px-4 sm:h-auto sm:border-b sm:px-6 sm:bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight transition-colors flex dark:text-zinc-50">
        &#128218; Public Library
      </h1>

      <div className="relative ml-auto flex-1 grow-0 flex gap-2">
        {isLoggedIn ? (
          <Button>Logout</Button>
        ) : (
          <>
            <Button>Login</Button>
            <Button>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
