import { createSlice } from "@reduxjs/toolkit";
import { saveToken } from "../../utils/url";
import { loginUser } from "@/api/authApi/authApi";

const initialState = {
  value: 0,
  statusRegistration: false,
  statusLogin: false,
  errorMessege: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.statusLogin = action.payload?.statusCode == 200 ? true : false;
      console.log(action.payload.statusCode)
      saveToken(action.payload.data);
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
