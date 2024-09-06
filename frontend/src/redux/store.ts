import { employeeApi } from "@/api/employee-api";
import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "@/api/auth-api";
// import counterReducer from "./counterReducer";

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApi.middleware).concat(userApi.middleware),
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
