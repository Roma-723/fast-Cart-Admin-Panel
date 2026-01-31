import { configureStore } from '@reduxjs/toolkit'
import  ColorSlice  from './../reducers/colorSlice/colorSlice';
import  authSlice  from '@/reducers/authSlice/authSlice';
import  brandSlice  from './../reducers/brandSlice/brandSlice';
import  SubCategorySlice  from '@/reducers/subCategorySlice/subCategorySlice';
import  categorySlice  from '@/reducers/categorySlice/categorySlice';
import  profileSlice  from '@/reducers/profileSlice/profileSlice';
import productSlice from './../reducers/productSlice/productSlice';

export const store = configureStore({
  reducer: {
    color: ColorSlice,
    auth: authSlice,
    brand: brandSlice,
    subCategory: SubCategorySlice,
    category: categorySlice,
    product: productSlice,
    profile: profileSlice
  },
})