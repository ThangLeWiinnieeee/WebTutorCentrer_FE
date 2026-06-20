import { CheckCircle2, Clock, XCircle } from "lucide-react";

/**
 * Metadata hiển thị cho trạng thái đơn nhận lớp của gia sư.
 * Khớp với enum CLASS_APPLICATION_STATUS bên backend: pending | approved | rejected.
 */
export const STATUS_META = {
  pending: {
    label: "Đang chờ duyệt",
    icon: Clock,
    className: "border-amber-200 bg-amber-50 text-amber-700",
    dotClassName: "bg-amber-500",
  },
  approved: {
    label: "Đã được chấp nhận",
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dotClassName: "bg-emerald-500",
  },
  rejected: {
    label: "Đã bị từ chối",
    icon: XCircle,
    className: "border-rose-200 bg-rose-50 text-rose-700",
    dotClassName: "bg-rose-500",
  },
};

export const STATUS_TABS = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "approved", label: "Đã chấp nhận" },
  { value: "rejected", label: "Bị từ chối" },
];
