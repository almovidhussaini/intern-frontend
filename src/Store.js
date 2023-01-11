import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./redux/TaskSlice";
import UserSlice from "./redux/UserSlice";

export const Store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    reducer:{
        task : TaskSlice,
        user: UserSlice
    }
})