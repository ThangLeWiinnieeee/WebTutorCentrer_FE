import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";

const isProfileIncomplete = (user) =>
  user && (!user.phone || !user.dateOfBirth);

/**
 * skipProfileCheck: true  → chỉ yêu cầu đăng nhập (dùng cho /complete-profile)
 * skipProfileCheck: false → yêu cầu đăng nhập + profile đầy đủ
 * allowedRoles: null       → cho phép mọi vai trò đã đăng nhập
 * allowedRoles: [...]      → chỉ cho phép các vai trò trong danh sách
 */
const ProtectedRoute = ({ skipProfileCheck = false, allowedRoles = null }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!skipProfileCheck && isProfileIncomplete(user)) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
