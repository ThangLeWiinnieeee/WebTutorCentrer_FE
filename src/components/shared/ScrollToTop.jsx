import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mỗi khi đổi trang (pathname thay đổi) thì đưa cửa sổ về đầu trang.
 * Đặt trong các layout để áp dụng cho mọi route. Không render gì ra giao diện.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
