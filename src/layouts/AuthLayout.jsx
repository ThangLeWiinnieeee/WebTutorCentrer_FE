import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/shared/ScrollToTop";

const AuthLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default AuthLayout;
