import { z } from "zod";

const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

export const adminUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || phoneRegex.test(value), {
      message: "Số điện thoại không hợp lệ",
    }),
  gender: z.enum(["", "male", "female", "other"]),
  dateOfBirth: z
    .string()
    .optional()
    .refine((value) => !value || new Date(value) <= new Date(), {
      message: "Ngày sinh không được lớn hơn hiện tại",
    }),
  isVerified: z.enum(["true", "false"]),
});
