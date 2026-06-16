import { createSlice } from "@reduxjs/toolkit";
import {
  getDashboardStatsThunk,
  getPendingTutorsThunk,
  approveTutorThunk,
  rejectTutorThunk,
  getAdminUsersThunk,
  updateAdminUserThunk,
  updateAdminUserStatusThunk,
  softDeleteAdminUserThunk,
} from "./adminThunks";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardStats: {
      pendingCount: 0,
      approvedCount: 0,
      rejectedCount: 0,
    },
    statsLoading: false,
    pendingTutors: [],
    loading: false,
    actionLoading: null,
    error: null,
    users: [],
    usersPagination: {
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    },
    usersLoading: false,
    usersError: null,
    userActionLoading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStatsThunk.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(getDashboardStatsThunk.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(getDashboardStatsThunk.rejected, (state) => {
        state.statsLoading = false;
      });

    builder
      .addCase(getPendingTutorsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingTutorsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingTutors = action.payload;
      })
      .addCase(getPendingTutorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(approveTutorThunk.pending, (state, action) => {
        state.actionLoading = action.meta.arg;
      })
      .addCase(approveTutorThunk.fulfilled, (state, action) => {
        state.actionLoading = null;
        state.pendingTutors = state.pendingTutors.filter(
          (t) => t.id !== action.payload.id
        );
      })
      .addCase(approveTutorThunk.rejected, (state) => {
        state.actionLoading = null;
      });

    builder
      .addCase(rejectTutorThunk.pending, (state, action) => {
        state.actionLoading = action.meta.arg.id;
      })
      .addCase(rejectTutorThunk.fulfilled, (state, action) => {
        state.actionLoading = null;
        state.pendingTutors = state.pendingTutors.filter(
          (t) => t.id !== action.payload.id
        );
      })
      .addCase(rejectTutorThunk.rejected, (state) => {
        state.actionLoading = null;
      });

    builder
      .addCase(getAdminUsersThunk.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(getAdminUsersThunk.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload.users || [];
        state.usersPagination = action.payload.pagination || state.usersPagination;
      })
      .addCase(getAdminUsersThunk.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      });

    builder
      .addCase(updateAdminUserThunk.pending, (state, action) => {
        state.userActionLoading = action.meta.arg.id;
      })
      .addCase(updateAdminUserThunk.fulfilled, (state, action) => {
        state.userActionLoading = null;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateAdminUserThunk.rejected, (state) => {
        state.userActionLoading = null;
      });

    builder
      .addCase(updateAdminUserStatusThunk.pending, (state, action) => {
        state.userActionLoading = action.meta.arg.id;
      })
      .addCase(updateAdminUserStatusThunk.fulfilled, (state, action) => {
        state.userActionLoading = null;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateAdminUserStatusThunk.rejected, (state) => {
        state.userActionLoading = null;
      });

    builder
      .addCase(softDeleteAdminUserThunk.pending, (state, action) => {
        state.userActionLoading = action.meta.arg;
      })
      .addCase(softDeleteAdminUserThunk.fulfilled, (state, action) => {
        state.userActionLoading = null;
        const deletedUser = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedUser.id);
      })
      .addCase(softDeleteAdminUserThunk.rejected, (state) => {
        state.userActionLoading = null;
      });
  },
});

export default adminSlice.reducer;
