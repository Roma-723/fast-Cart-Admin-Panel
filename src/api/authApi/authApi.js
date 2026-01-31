import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiInstance, axiosRequest } from "../../utils/url";



export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  try {
    let { data } = await apiInstance.post(`/Account/login`, user);
     
    return data;
    
  } catch (error) {
    console.log(error);
  }
});
