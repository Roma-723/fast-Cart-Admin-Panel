import { axiosRequest } from "@/utils/url"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getUserColor = createAsyncThunk(
  "color/getUserColor",
  async () => {
    const { data } = await axiosRequest(`/Color/get-colors`)
    return data.data
  }
)

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (id, { dispatch }) => {
    await axiosRequest.delete(`/Color/delete-color?id=${id}`)
    dispatch(getUserColor())
  }
)

export const addColor = createAsyncThunk(
  "color/addColor",
  async (colorName, { dispatch }) => {
    await axiosRequest.post(`/Color/add-color?ColorName=${colorName}`)
    dispatch(getUserColor())
  }
)

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async ({ id, colorName }, { dispatch }) => {
    await axiosRequest.put(
      `/Color/update-color?Id=${id}&ColorName=${colorName}`
    )
    dispatch(getUserColor())
  }
)
