import { Navigate, Outlet, useLocation } from "react-router-dom";
import Topbar from "@/components/Topbar";
import { getProfile } from "@/utils/profileStorage";

const Layout = () => {
  const { pathname } = useLocation();
  const profile = getProfile();

  if (pathname !== "/" && !profile.onboardingCompleted) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="min-h-screen w-full">
      {pathname !== "/" && (
        <nav aria-label="Game navigation">
          <Topbar />
        </nav>
      )}
      <Outlet />
    </article>
  );
};

export default Layout;
