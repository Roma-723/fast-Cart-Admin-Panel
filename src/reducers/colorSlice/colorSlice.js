import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosRequest } from "@/utils/url"

export const getUserColor = createAsyncThunk(
  "color/getUserColor",
  async () => {
    const { data } = await axiosRequest.get("/Color/get-colors")
    return data.data
  }
)

export const getByIdColor = createAsyncThunk(
  "color/getByIdColor",
  async (id) => {
    const { data } = await axiosRequest.get(`/Color/get-color-by-id?id=${id}`)
    return data.data
  }
)

const initialState = {
  dataColor: [],
  colorById: null,
}

export const ColorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserColor.fulfilled, (state, action) => {
        state.dataColor = action.payload
      })
      .addCase(getByIdColor.fulfilled, (state, action) => {
        state.colorById = action.payload
      })
  },
})

export default ColorSlice.reducer
