// categoryApi.js
import { axiosRequest } from "@/utils/url"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

export const getUserCategory = createAsyncThunk(
  "category/getUserCategory",
  async () => {
    const { data } = await axiosRequest.get("/Category/get-categories")
    return data.data
  }
)

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch }) => {
    await axiosRequest.delete(`/Category/delete-category?id=${id}`)
    dispatch(getUserCategory())
    toast.success("Category deleted successfully")
  }
)

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (formData, { dispatch }) => {
    await axiosRequest.put("/Category/update-category", formData)
    dispatch(getUserCategory())
    toast.success("Category updated successfully")
  }
)

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, { dispatch }) => {
    await axiosRequest.post("/Category/add-category", formData)
    dispatch(getUserCategory())
    toast.success("Category added successfully")
  }
)
