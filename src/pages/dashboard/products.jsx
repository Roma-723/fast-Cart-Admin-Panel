import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getUserProduct,
  deleteProduct,
  postProduct,
  updateProduct,
  addImageToProduct,
} from "@/api/productApi/productApi"
import { getUserBrand } from "@/api/brandApi/brandApi"
import { getUserSubCategory } from "@/api/subCategoryApi/subCategoryApi"
import { getUserColor } from "@/api/colorApi/colorApi"
import { API_IMAGE } from "@/utils/url"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const Modal = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            className="bg-white rounded-3xl p-8 w-full max-w-4xl"
          >
            {children}
            <button onClick={onClose} className="absolute top-4 right-6 text-xl">✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { productData } = useSelector(s => s.product)
  const { brandData } = useSelector(s => s.brand)
  const { SubCategoryData } = useSelector(s => s.subCategory)
  const { dataColor } = useSelector(s => s.color)

  const [editData, setEditData] = useState(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [imageId, setImageId] = useState(null)

  useEffect(() => {
    dispatch(getUserProduct())
    dispatch(getUserBrand())
    dispatch(getUserSubCategory())
    dispatch(getUserColor())
  }, [dispatch])

  const addSubmit = (e) => {
    e.preventDefault()
    const f = new FormData()
    for (let i = 0; i < e.target.images.files.length; i++) {
      f.append("Images", e.target.images.files[i])
    }
    ;[
      "ProductName",
      "Description",
      "Quantity",
      "Code",
      "Price",
      "HasDiscount",
      "DiscountPrice",
      "SubCategoryId",
      "BrandId",
      "ColorId",
      "Size",
      "Weight",
    ].forEach(k => f.append(k, e.target[k.toLowerCase()]?.value))
    dispatch(postProduct(f))
    setOpenAdd(false)
  }

  const editSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct(editData))
    setEditData(null)
  }

  const imageSubmit = (e) => {
    e.preventDefault()
    dispatch(addImageToProduct({ productId: imageId, files: e.target.files.files }))
    setImageId(null)
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <button onClick={() => setOpenAdd(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl">
        + Add Product
      </button>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <form onSubmit={addSubmit} className="grid grid-cols-3 gap-4">
          <input type="file" name="images" multiple />
          <input name="productname" placeholder="Product name" />
          <input name="description" placeholder="Description" />
          <input name="quantity" placeholder="Quantity" />
          <input name="code" placeholder="Code" />
          <input name="price" placeholder="Price" />
          <input name="size" placeholder="Size" />
          <input name="weight" placeholder="Weight" />
          <select name="hasdiscount">
            <option value="true">Has discount</option>
            <option value="false">No discount</option>
          </select>
          <input name="discountprice" placeholder="Discount price" />
          <select name="subcategoryid">
            {SubCategoryData?.map(e => <option key={e.id} value={e.id}>{e.subCategoryName}</option>)}
          </select>
          <select name="brandid">
            {brandData?.map(e => <option key={e.id} value={e.id}>{e.brandName}</option>)}
          </select>
          <select name="colorid">
            {dataColor?.map(e => <option key={e.id} value={e.id}>{e.colorName}</option>)}
          </select>
          <button className="col-span-3 bg-green-600 text-white py-3 rounded-xl">Save</button>
        </form>
      </Modal>

      <Modal open={!!editData} onClose={() => setEditData(null)}>
        <form onSubmit={editSubmit} className="grid grid-cols-2 gap-4">
          <input value={editData?.productName} onChange={e => setEditData({ ...editData, productName: e.target.value })} />
          <input value={editData?.description} onChange={e => setEditData({ ...editData, description: e.target.value })} />
          <input value={editData?.price} onChange={e => setEditData({ ...editData, price: e.target.value })} />
          <button className="col-span-2 bg-green-600 text-white py-3 rounded-xl">Update</button>
        </form>
      </Modal>

      <Modal open={!!imageId} onClose={() => setImageId(null)}>
        <form onSubmit={imageSubmit}>
          <input type="file" name="files" multiple />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl mt-4">Upload</button>
        </form>
      </Modal>

      <div className="grid grid-cols-4 gap-6">
        {productData?.products?.map(e => (
          <motion.div
            key={e.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow p-4"
          >
            <img src={`${API_IMAGE}/${e.image}`} className="h-40 w-full object-cover rounded-xl" />
            <h3 className="font-bold mt-3">{e.productName}</h3>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditData(e)} className="flex-1 bg-green-600 text-white py-2 rounded-xl">Edit</button>
              <button onClick={() => dispatch(deleteProduct(e.id))} className="flex-1 bg-red-600 text-white py-2 rounded-xl">Delete</button>
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setImageId(e.id)} className="flex-1 bg-blue-600 text-white py-2 rounded-xl">Image</button>
              <button onClick={() => navigate(`/productbyid/${e.id}`)} className="flex-1 bg-gray-300 py-2 rounded-xl">Info</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Product
