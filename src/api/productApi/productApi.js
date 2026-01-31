import { axiosRequest } from "@/utils/url"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getUserProduct = createAsyncThunk(
  "product/getUserProduct",
  async () => {
    const { data } = await axiosRequest("/Product/get-products")
    return data.data
  }
)

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    await axiosRequest.delete(`/Product/delete-product?id=${id}`)
    dispatch(getUserProduct())
  }
)

export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (formData, { dispatch }) => {
    await axiosRequest.post("/Product/add-product", formData)
    dispatch(getUserProduct())
  }
)

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (p, { dispatch }) => {
    await axiosRequest.put(
      `/Product/update-product?Id=${p.id}&BrandId=${p.brandId}&ColorId=${p.colorId}&ProductName=${p.productName}&Description=${p.description}&Quantity=${p.quantity}&Weight=${p.weight}&Size=${p.size}&Code=${p.code}&Price=${p.price}&HasDiscount=${p.hasDiscount}&DiscountPrice=${p.discountPrice}&SubCategoryId=${p.subCategoryId}`
    )
    dispatch(getUserProduct())
  }
)

export const addImageToProduct = createAsyncThunk(
  "product/addImageToProduct",
  async ({ productId, files }, { dispatch }) => {
    const f = new FormData()
    f.append("ProductId", productId)
    for (let i = 0; i < files.length; i++) {
      f.append("Files", files[i])
    }
    await axiosRequest.post("/Product/add-image-to-product", f)
    dispatch(getUserProduct())
  }
)

  
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const { data } = await axiosRequest(`/Product/get-product-by-id?id=${id}`)
    return data.data
  }
)
