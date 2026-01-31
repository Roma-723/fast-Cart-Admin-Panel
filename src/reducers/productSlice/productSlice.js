// productSlice.js
import { createSlice } from "@reduxjs/toolkit"
import { getUserProduct, getProductById } from "@/api/productApi/productApi"

const initialState = {
  productData: [],
  singleProduct: null
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserProduct.fulfilled, (state, action) => {
      state.productData = action.payload
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.singleProduct = action.payload
    })
  }
})

export default productSlice.reducer
