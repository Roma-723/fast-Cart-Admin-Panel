import {  getUserCategory } from "@/api/categoryApi/categoryApi"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryData: [],
  categoryById: null,
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCategory.fulfilled, (state, action) => {
        state.categoryData = action.payload
      })
      
  },
})

export default categorySlice.reducer
