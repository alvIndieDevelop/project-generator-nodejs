import { createSlice } from "@reduxjs/toolkit";
import i18n from "../i18n";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    currentLocale: {
      language: "es",
    },
    languages: ["es", "en"],
  },
  reducers: {
    setLenguage: (state, action) => {
      i18n.changeLanguage(action.payload);
      state.currentLocale.language = action.payload;
    },
  },
});

export const { setLenguage } = commonSlice.actions;

export default commonSlice.reducer;
