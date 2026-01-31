import { createSlice } from "@reduxjs/toolkit"
import { getUserSubCategory, getCategory, getByIdSubCategory } from "@/api/subCategoryApi/subCategoryApi"

const initialState = {
  SubCategoryData: [],
  dataCategory: [],
  subCategoryById: null,
}

export const SubCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserSubCategory.fulfilled, (state, action) => {
        state.SubCategoryData = action.payload
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.dataCategory = action.payload
      })
      .addCase(getByIdSubCategory.fulfilled, (state, action) => {
        state.subCategoryById = action.payload
      })
  },
})

export default SubCategorySlice.reducer
