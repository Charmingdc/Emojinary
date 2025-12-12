import { Outlet } from "react-router-dom";
import Topbar from "@/components/Topbar";

const Layout = () => {
  return (
    <article className="w-screen flex flex-col items-between gap-4">
      <nav>
        <Topbar />
      </nav>

      <Outlet />
    </article>
  );
};

export default Layout;
