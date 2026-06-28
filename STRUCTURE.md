# Cấu trúc thư mục - Frontend (WebTutorCenter_FE)

> **Stack:** React 19, Vite, Redux Toolkit, React Router v7, Tailwind CSS v4, shadcn/ui, React Hook Form, Zod, Axios, Sonner.

## Tổng quan

```text
WebTutorCenter_FE/
├── src/
│   ├── App.jsx                       # Gốc app: AuthBootstrap, RouterProvider, Toaster
│   ├── main.jsx                      # Entry React: GoogleOAuthProvider, Redux Provider
│   ├── index.css                     # Tailwind v4, shadcn theme vars, global focus/cursor CSS
│   ├── app/
│   │   └── store.js                  # reducers: auth, tutors, admin, notifications, classes
│   ├── admin/
│   │   ├── index.js                  # Barrel export admin
│   │   ├── components/
│   │   │   └── TutorApprovalCard.jsx # Card duyệt/từ chối hồ sơ gia sư
│   │   ├── layouts/
│   │   │   └── AdminLayout.jsx       # Layout admin routes
│   │   ├── pages/
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminUsersPage.jsx    # Quản lý người dùng
│   │   │   └── TutorApprovalPage.jsx
│   │   ├── schemas/
│   │   │   └── adminUserSchema.js
│   │   ├── services/
│   │   │   └── adminService.js       # API admin tutor approval + user management
│   │   └── store/
│   │       ├── adminSlice.js
│   │       └── adminThunks.js
│   ├── components/
│   │   ├── home/
│   │   │   └── IntroSections.jsx     # Sections giới thiệu trên trang chủ
│   │   ├── shared/
│   │   │   ├── FloatingContactBar.jsx
│   │   │   ├── GuestRoute.jsx
│   │   │   ├── Header.jsx            # Header + profile + NotificationBell + tutor link
│   │   │   ├── Pagination.jsx        # Pagination dùng chung
│   │   │   └── ProtectedRoute.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── form.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       └── select.jsx
│   ├── constants/
│   │   └── apiEndpoints.js           # AUTH, TUTORS, ADMIN, LOCATIONS, NOTIFICATIONS, LOOKUPS, CLASSES
│   ├── features/
│   │   ├── auth/
│   │   │   ├── index.js
│   │   │   ├── components/
│   │   │   │   ├── AuthBootstrap.jsx # Restore session + fetch notifications khi user đổi
│   │   │   │   ├── AuthLeftPanel.jsx
│   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   ├── ResetPasswordForm.jsx
│   │   │   │   ├── login/
│   │   │   │   │   └── LoginForm.jsx
│   │   │   │   └── register/
│   │   │   │       ├── RegisterForm.jsx
│   │   │   │       └── VerifyOtpForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   ├── pages/
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── ResendOtpPage.jsx
│   │   │   │   ├── ResetPasswordPage.jsx
│   │   │   │   ├── VerifyForgotPasswordOtpPage.jsx
│   │   │   │   └── VerifyOtpPage.jsx
│   │   │   ├── schemas/
│   │   │   │   └── authSchema.js
│   │   │   ├── services/
│   │   │   │   └── authService.js
│   │   │   └── store/
│   │   │       ├── authSlice.js
│   │   │       └── authThunks.js
│   │   ├── classes/
│   │   │   ├── index.js
│   │   │   ├── components/
│   │   │   │   ├── ClassReceiveDialog.jsx
│   │   │   │   ├── SearchableSelect.jsx
│   │   │   │   └── WeeklyHourGrid.jsx
│   │   │   ├── pages/
│   │   │   │   ├── FindTutorRequestPage.jsx  # Tìm gia sư theo yêu cầu lớp học
│   │   │   │   ├── NewClassDetailPage.jsx
│   │   │   │   └── NewClassesPage.jsx        # Danh sách lớp mới
│   │   │   ├── schemas/
│   │   │   │   ├── classRequestSchema.js
│   │   │   │   └── classSchema.js
│   │   │   ├── services/
│   │   │   │   └── classService.js
│   │   │   ├── store/
│   │   │   │   ├── classSlice.js
│   │   │   │   └── classThunks.js
│   │   │   └── utils/
│   │   │       ├── classFormatters.js
│   │   │       └── classRequestFormDraftStorage.js
│   │   ├── notifications/
│   │   │   ├── components/
│   │   │   │   └── NotificationBell.jsx
│   │   │   ├── services/
│   │   │   │   └── notificationService.js
│   │   │   └── store/
│   │   │       ├── notificationSlice.js
│   │   │       └── notificationThunks.js
│   │   ├── profile/
│   │   │   ├── index.js
│   │   │   ├── constants.js
│   │   │   ├── components/
│   │   │   │   ├── ProfileBadges.jsx
│   │   │   │   ├── ProfileEditForm.jsx
│   │   │   │   ├── ProfileInfoRow.jsx
│   │   │   │   ├── ProfilePersonalCard.jsx
│   │   │   │   ├── ProfileSidebar.jsx
│   │   │   │   ├── ProfileViewDetails.jsx
│   │   │   │   └── TutorInfoCard.jsx
│   │   │   ├── pages/
│   │   │   │   ├── CompleteProfilePage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── schemas/
│   │   │   │   ├── completeProfileSchema.js
│   │   │   │   └── profileSchema.js
│   │   │   └── utils/
│   │   │       └── profileUtils.js
│   │   └── tutors/
│   │       ├── index.js
│   │       ├── constants.js          # Subjects, occupation status, tutor status, day labels
│   │       ├── components/
│   │       │   ├── AreaPicker.jsx    # Province/district picker via backend locations API
│   │       │   ├── AvailabilityPicker.jsx
│   │       │   ├── HeroSearchBar.jsx
│   │       │   ├── MultiCheckbox.jsx
│   │       │   ├── SchoolPicker.jsx
│   │       │   ├── TopThisMonthTutors.jsx
│   │       │   ├── TopTutorCard.jsx
│   │       │   ├── TutorCard.jsx
│   │       │   ├── TutorFilters.jsx
│   │       │   ├── TutorPagination.jsx
│   │       │   └── TutorRegistrationForm.jsx
│   │       ├── constants/
│   │       │   └── introSections.js
│   │       ├── pages/
│   │       │   ├── RegisterTutorPage.jsx
│   │       │   ├── TutorDetailPage.jsx
│   │       │   └── TutorListingPage.jsx
│   │       ├── schemas/
│   │       │   └── tutorSchema.js
│   │       ├── services/
│   │       │   ├── locationService.js
│   │       │   ├── lookupService.js
│   │       │   └── tutorService.js
│   │       └── store/
│   │           ├── tutorSlice.js
│   │           └── tutorThunks.js
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── lib/
│   │   └── utils.js                 # cn()
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── routes/
│   │   └── index.jsx                # React Router route tree
│   ├── services/
│   │   └── axiosInstance.js         # baseURL, Bearer, refresh token, toast handling
│   └── utils/
│       └── tokenStorage.js
├── eslint.config.js
├── package.json
├── vite.config.js
└── STRUCTURE.md
```

## Redux store

`src/app/store.js` đăng ký các slice:

| Slice | Nguồn | Mục đích |
|---|---|---|
| `auth` | `features/auth` | User session, token, profile state |
| `tutors` | `features/tutors` | Hồ sơ/đăng ký gia sư của user |
| `admin` | `admin` | Danh sách hồ sơ gia sư pending và action approve/reject + quản lý user |
| `notifications` | `features/notifications` | Thông báo lấy từ backend DB theo userId |
| `classes` | `features/classes` | Danh sách lớp học, yêu cầu tìm gia sư |

## Routes

| Path | Layout/Guard | Page |
|---|---|---|
| `/login` | `GuestRoute` + `AuthLayout` | `LoginPage` |
| `/register` | `GuestRoute` + `AuthLayout` | `RegisterPage` |
| `/verify-otp` | `GuestRoute` + `AuthLayout` | `VerifyOtpPage` |
| `/resend-otp` | `GuestRoute` + `AuthLayout` | `ResendOtpPage` |
| `/forgot-password` | `GuestRoute` + `AuthLayout` | `ForgotPasswordPage` |
| `/verify-forgot-password-otp` | `GuestRoute` + `AuthLayout` | `VerifyForgotPasswordOtpPage` |
| `/reset-password` | `GuestRoute` + `AuthLayout` | `ResetPasswordPage` |
| `/` | `MainLayout` (public) | `HomePage` |
| `/register-tutor` | `MainLayout` (public) | `RegisterTutorPage` |
| `/tutors` | `MainLayout` (public) | `TutorListingPage` |
| `/tim-gia-su` | `MainLayout` (public) | `FindTutorRequestPage` |
| `/tim-gia-su/:id` | `MainLayout` (public) | `TutorDetailPage` |
| `/lop-moi` | `MainLayout` (public) | `NewClassesPage` |
| `/lop-moi/:id` | `MainLayout` (public) | `NewClassDetailPage` |
| `/complete-profile` | `ProtectedRoute skipProfileCheck` | `CompleteProfilePage` |
| `/profile` | `ProtectedRoute` + `MainLayout` | `ProfilePage` |
| `/admin` | `AdminLayout` | `AdminDashboardPage` |
| `/admin/users` | `AdminLayout` | `AdminUsersPage` |
| `/admin/tutors` | `AdminLayout` | `TutorApprovalPage` |

## API endpoints

`src/constants/apiEndpoints.js` gom các endpoint tương đối:

- `AUTH`: register, verify-otp, resend-otp, google-login, login, logout, refresh token, forgot/reset password, user-info, update-profile, upload-avatar.
- `TUTORS`: register, get profile, active, top, top-this-month, new, search.
- `ADMIN`: dashboard-stats, pending tutors, approve/reject tutor, users CRUD, user status.
- `LOCATIONS`: provinces, districts by province, schools.
- `NOTIFICATIONS`: list, mark read, mark all read.
- `LOOKUPS`: all, by type, districts by province.
- `CLASSES`: quote, create, list, subjects, pricing-config, detail, mine.

## Luồng chính

### Khởi động app

```text
main.jsx
  -> GoogleOAuthProvider
  -> Redux Provider
  -> App.jsx
  -> AuthBootstrap
  -> RouterProvider + Toaster
```

`AuthBootstrap` đọc token từ `tokenStorage`; nếu có token thì dispatch `getUserInfoThunk`. Khi `user.id` xuất hiện hoặc đổi tài khoản, component dispatch `fetchNotificationsThunk` để chuông thông báo hiển thị đúng dữ liệu của tài khoản hiện tại mà không cần reload. Khi logout thì dispatch `clearNotifications`.

### Đăng ký làm gia sư

```text
RegisterTutorPage
  -> TutorRegistrationForm
  -> registerTutorThunk
  -> tutorService.register()
  -> API_ENDPOINTS.TUTORS.REGISTER
  -> Backend tạo Tutor + Notification TUTOR_PENDING
  -> FE fetchNotificationsThunk()
```

Nếu user đã có hồ sơ pending, `RegisterTutorPage` hiển thị trạng thái đang chờ duyệt và không cho đăng ký mới.

### Duyệt gia sư

```text
TutorApprovalPage
  -> adminThunks
  -> adminService
  -> API_ENDPOINTS.ADMIN.*
  -> Backend approve/reject Tutor
  -> Backend tạo Notification TUTOR_APPROVED/TUTOR_REJECTED cho user
```

### Thông báo

```text
NotificationBell
  -> Redux notifications state
  -> notificationThunks
  -> notificationService
  -> /notifications API
```

Thông báo được lưu trong backend DB theo `userId`. FE không dùng localStorage cho notification. Khi người dùng đánh dấu đã đọc, backend set `readAt`; MongoDB TTL tự xóa sau 7 ngày.

### Lớp học

```text
NewClassesPage / FindTutorRequestPage
  -> classThunks
  -> classService
  -> API_ENDPOINTS.CLASSES.*
```

`classRequestFormDraftStorage` lưu draft form yêu cầu tìm gia sư vào localStorage để không mất dữ liệu khi user navigate đi.

## Quy ước feature

```text
features/<feature>/
├── index.js          # Barrel export nếu cần
├── components/       # UI thuộc feature
├── constants.js      # Label/config riêng feature
├── hooks/            # React hooks riêng feature
├── pages/            # Route pages
├── schemas/          # Zod schemas
├── services/         # API calls qua axiosInstance
├── store/            # Redux slice/thunks nếu có shared state
└── utils/            # Helper thuần
```

## Quy ước gọi API

- Component không gọi `axiosInstance` trực tiếp.
- Endpoint thêm vào `src/constants/apiEndpoints.js`.
- API call đặt trong `features/<feature>/services` hoặc `admin/services`.
- Shared async state dùng Redux thunks/slices.
- Token lưu qua `tokenStorage`, refresh token xử lý tập trung trong `axiosInstance`.
