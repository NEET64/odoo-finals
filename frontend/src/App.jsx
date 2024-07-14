import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="flex min-h-dvh w-full flex-col dark:bg-zinc-950 dark:text-zinc-50">
      <Sidebar />

      <div className="flex flex-col min-h-dvh sm:pl-14">
        <Header />
        <Outlet />
        {/* <div className="flex-1"></div> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
