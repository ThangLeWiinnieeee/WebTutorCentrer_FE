import { useLayoutEffect, useRef, useState } from 'react';

import {
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { REMEMBERED_EMAIL_KEY } from '@/features/auth/constants';
import { loginSchema } from '@/features/auth/schemas/authSchema';
import { scrollToFirstError } from '@/lib/formErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = ({ onSubmit, onGoogleSuccess, onGoogleError }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Đọc email đã ghi nhớ (nếu có) để điền sẵn và bật checkbox.
  const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY) || "";
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));

  // Nút Google chỉ nhận width dạng px → đo bề rộng cột để không tràn ngang trên mobile.
  const googleWrapRef = useRef(null);
  const [googleWidth, setGoogleWidth] = useState(0);

  useLayoutEffect(() => {
    const el = googleWrapRef.current;
    if (!el) return;
    const update = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      if (w > 0) setGoogleWidth(Math.max(200, Math.min(400, w)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: rememberedEmail },
  });

  // Lưu/xóa email theo lựa chọn ghi nhớ rồi mới đăng nhập.
  const handleFormSubmit = (data) => {
    if (rememberMe) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, data.email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
    return onSubmit(data);
  };

  // Ô input dạng "filled" mềm, hòa vào nền trắng — focus mới nổi viền + nền trắng.
  const fieldClass = (hasError) =>
    `h-12 rounded-xl border px-4 text-[15px] text-slate-800 transition-all duration-200 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#1e3a5f] ${
      hasError
        ? "border-red-300 bg-red-50/60 focus-visible:border-red-400"
        : "border-transparent bg-slate-100/70 hover:bg-slate-100"
    }`;

  return (
    <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12">
      <div className="w-full max-w-[400px]">
        {/* Mobile logo */}
        <div data-aos="fade-up" className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e3a5f]">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#1e3a5f]">WebTutorCenter</span>
        </div>

        {/* Heading */}
        <div data-aos="fade-up" className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Chào mừng trở lại
          </h2>
          <p className="text-[15px] text-slate-500">
            Đăng nhập để tiếp tục học tập cùng gia sư của bạn
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit, scrollToFirstError)}
          noValidate
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-9 space-y-5"
        >
          {/* Thư điện tử */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Thư điện tử
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nhap-email@vi-du.com"
              autoComplete="email"
              className={fieldClass(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700">
              Mật khẩu
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                className={`${fieldClass(errors.password)} pr-12`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me + forgot password */}
          <div className="flex items-center justify-between pt-0.5">
            <label
              htmlFor="rememberMe"
              className="group flex cursor-pointer select-none items-center gap-2 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-800"
            >
              <span className="relative flex h-4.5 w-4.5 items-center justify-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer h-4.5 w-4.5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white shadow-sm transition-all duration-150 group-hover:border-[#1e3a5f] checked:border-[#1e3a5f] checked:bg-[#1e3a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-1"
                />
                <Check
                  className="pointer-events-none absolute h-3 w-3 scale-50 text-white opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100"
                  strokeWidth={3.5}
                />
              </span>
              Ghi nhớ đăng nhập
            </label>
            <Link
              to="/forgot-password"
              className="text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-linear-to-r from-[#1e3a5f] to-[#2c5286] text-[15px] font-semibold text-white shadow-lg shadow-[#1e3a5f]/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-[#16304f] hover:to-[#244269] hover:shadow-xl hover:shadow-[#1e3a5f]/30 active:translate-y-0 active:scale-[0.99] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">hoặc</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google login — render sau khi đo bề rộng cột để không tràn/cắt trên mobile */}
          <div ref={googleWrapRef} className="flex w-full justify-center overflow-hidden">
            {googleWidth > 0 && (
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleError}
                width={String(googleWidth)}
                text="signin_with"
                locale="vi"
                shape="rectangular"
                logo_alignment="left"
              />
            )}
          </div>
        </form>

        {/* Register link */}
        <p data-aos="fade-up" data-aos-delay="150" className="mt-9 text-center text-sm text-slate-500">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
