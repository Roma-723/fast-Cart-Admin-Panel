import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiInstance } from "../../utils/url"
import { toast } from "react-hot-toast"

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/Account/login", user)

      if (data?.role !== "Admin") {
        toast.error("You are not admin. Access denied.", {
          style: { background: "#dc2626", color: "#fff" },
        })
        return rejectWithValue("NOT_ADMIN")
      }

      toast.success("Welcome Admin", {
        style: { background: "#16a34a", color: "#fff" },
      })

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
