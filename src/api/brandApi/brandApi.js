// brandApi.js
import { axiosRequest } from "@/utils/url"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

export const getUserBrand = createAsyncThunk(
  "brand/getUserBrand",
  async () => {
    const { data } = await axiosRequest("/Brand/get-brands")
    return data.data
  }
)

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (brandName, { dispatch }) => {
    await axiosRequest.post(`/Brand/add-brand?BrandName=${brandName}`)
    dispatch(getUserBrand())
    toast.success("Brand added successfully")
  }
)

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { dispatch }) => {
    await axiosRequest.delete(`/Brand/delete-brand?id=${id}`)
    dispatch(getUserBrand())
    toast.success("Brand deleted successfully")
  }
)

export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async ({ id, name }, { dispatch }) => {
    await axiosRequest.put(`/Brand/update-brand?Id=${id}&BrandName=${name}`)
    dispatch(getUserBrand())
    toast.success("Brand updated successfully")
  }
)
