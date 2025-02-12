import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInAtom } from "@/atoms/userData";
import { useRecoilState } from "recoil";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  return (
    <header className="sticky top-0 py-2 bg-slate-100 z-30 flex h-14 items-center gap-2 border-b border-slate-200 px-4 sm:h-auto sm:border-b sm:px-6 sm:bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight transition-colors flex dark:text-zinc-50">
        &#128218; Public Library
      </h1>

      <div className="relative ml-auto flex-1 grow-0 flex gap-2">
        {isLoggedIn ? (
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}>
            Logout
          </Button>
        ) : (
          <>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
