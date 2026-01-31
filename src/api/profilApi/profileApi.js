import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosRequest } from "@/utils/url"

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async () => {
    const { data } = await axiosRequest(`UserProfile/get-user-profiles`)
    return data.data
  }
)
