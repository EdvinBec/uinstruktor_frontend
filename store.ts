import { configureStore } from "@reduxjs/toolkit";
import SidebarReducer from "@/slices/SidebarStatus";

export const store = configureStore({
  reducer: {
    SidebarStatus: SidebarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
