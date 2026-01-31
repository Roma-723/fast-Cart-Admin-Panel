import { createSlice } from "@reduxjs/toolkit"
import { getUserProfile } from "@/api/profilApi/profileApi"

const initialState = {
  profileData: [],
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profileData = action.payload
    })
  },
})

export default profileSlice.reducer
