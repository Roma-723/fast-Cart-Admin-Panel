import { axiosRequest } from "@/utils/url"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

export const getUserSubCategory = createAsyncThunk(
  "subCategory/getUserSubCategory",
  async () => {
    const { data } = await axiosRequest.get("/SubCategory/get-sub-category")
    return data.data
  }
)

export const getCategory = createAsyncThunk(
  "subCategory/getCategory",
  async () => {
    const { data } = await axiosRequest.get("/Category/get-categories")
    return data.data
  }
)

export const deleteSubCategory = createAsyncThunk(
  "subCategory/deleteSubCategory",
  async (id, { dispatch }) => {
    await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`)
    toast.success("SubCategory deleted successfully")
    dispatch(getUserSubCategory())
  }
)

export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async ({ subCategoryNAme, idx }, { dispatch }) => {
    await axiosRequest.post(
      `/SubCategory/add-sub-category?CategoryId=${idx}&SubCategoryName=${subCategoryNAme}`
    )
    toast.success("SubCategory added successfully")
    dispatch(getUserSubCategory())
  }
)

export const updateSubCategory = createAsyncThunk(
  "subCategory/updateSubCategory",
  async ({ id, categoryId, subCategoryName }, { dispatch }) => {
    await axiosRequest.put(
      `/SubCategory/update-sub-category?Id=${id}&CategoryId=${categoryId}&SubCategoryName=${subCategoryName}`
    )
    toast.success("SubCategory updated successfully")
    dispatch(getUserSubCategory())
  }
)

export const getByIdSubCategory = createAsyncThunk(
  "subCategory/getByIdSubCategory",
  async (id) => {
    const { data } = await axiosRequest.get(
      `/SubCategory/get-sub-category-by-id?id=${id}`
    )
    return data.data
  }
)
