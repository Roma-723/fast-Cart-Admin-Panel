import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiInstance } from "../../utils/url";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/Account/login", user);

      const hour = new Date().getHours();
      const isWorkTime = hour >= 9 && hour < 18;

      if (!isWorkTime && data.role !== "admin") {
        message.error("Working time is over");
        return rejectWithValue("TIME_EXPIRED");
      }

      message.success("Login successful");
      return data;
    } catch (error) {
      message.error("Login failed");
      return rejectWithValue(error.response?.data || "ERROR");
    }
  }
);
