import { getUserBrand } from "@/api/brandApi/brandApi"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  brandData: [],
}


export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getUserBrand.fulfilled, (state, action) => {
      state.brandData = action.payload
    })
  }
})

export default brandSlice.reducer
