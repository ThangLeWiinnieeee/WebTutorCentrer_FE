import { BookOpen, Users, Star } from "lucide-react";

// Key localStorage lưu email khi người dùng chọn "Ghi nhớ đăng nhập".
export const REMEMBERED_EMAIL_KEY = "wtc_remembered_email";

// Danh sách điểm nổi bật hiển thị ở panel trái màn hình đăng nhập/đăng ký.
export const AUTH_PANEL_FEATURES = [
  { icon: BookOpen, text: "Hơn 500+ gia sư chất lượng cao" },
  { icon: Users, text: "Kết nối học sinh – gia sư dễ dàng" },
  { icon: Star, text: "Đánh giá minh bạch, học phí linh hoạt" },
];
