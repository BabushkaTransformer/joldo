import { configureStore } from '@reduxjs/toolkit'
import mainSlice from "./slices/index.js";

export const store = configureStore({
  reducer: {
    main: mainSlice
  },
})