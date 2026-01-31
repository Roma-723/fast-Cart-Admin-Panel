// Category.jsx
import React, { useEffect, useState, useMemo } from "react"
import {
  getUserCategory,
  deleteCategory,
  addCategory,
  editCategory,
} from "@/api/categoryApi/categoryApi"
import { API_IMAGE } from "@/utils/url"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react"
import { motion } from "framer-motion"
import { Toaster } from "react-hot-toast"

const Category = () => {
  const dispatch = useDispatch()
  const { categoryData } = useSelector((state) => state.category)

  const [search, setSearch] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [selected, setSelected] = useState(null)

  const [name, setName] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    dispatch(getUserCategory())
  }, [dispatch])

  const filteredCategories = useMemo(() => {
    return categoryData.filter((e) =>
      e.categoryName.toLowerCase().includes(search.toLowerCase())
    )
  }, [categoryData, search])

  const submit = () => {
    const formData = new FormData()
    formData.append("CategoryName", name)
    if (imageFile) formData.append("CategoryImage", imageFile)
    if (editId) formData.append("Id", editId)

    editId ? dispatch(editCategory(formData)) : dispatch(addCategory(formData))

    setName("")
    setImageFile(null)
    setEditId(null)
    setOpenForm(false)
  }

  return (
    <div className="min-h-screen p-10">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto mb-10 flex gap-4">
        <Input
          label="Search category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-[50px]"
          containerProps={{ className: "w-full" }}
        />
        <Button onClick={() => setOpenForm(true)}>Add Category</Button>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCategories.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col"
          >
            <img
              src={`${API_IMAGE}/${e.categoryImage}`}
              className="w-24 h-24 mx-auto object-contain mb-4"
            />

            <h2 className="text-center font-bold text-xl mb-4">
              {e.categoryName}
            </h2>

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {e.subCategories?.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold"
                >
                  {s.subCategoryName}
                </span>
              ))}
            </div>

            <div className="mt-auto flex justify-between">
              <button
                onClick={() => dispatch(deleteCategory(e.id))}
                className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(e.id)
                  setName(e.categoryName)
                  setOpenForm(true)
                }}
                className="px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelected(e)
                  setOpenInfo(true)
                }}
                className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm"
              >
                Info
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={openForm} handler={() => setOpenForm(false)}>
        <DialogHeader>{editId ? "Edit Category" : "Add Category"}</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Category name"
          />
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenForm(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>{editId ? "Update" : "Add"}</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openInfo} handler={() => setOpenInfo(false)}>
        <DialogHeader>Category Info</DialogHeader>
        <DialogBody>
          <img
            src={`${API_IMAGE}/${selected?.categoryImage}`}
            className="w-28 h-28 mx-auto mb-4"
          />
          <h3 className="text-center font-bold text-xl mb-4">
            {selected?.categoryName}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {selected?.subCategories?.map((s) => (
              <span
                key={s.id}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm"
              >
                {s.subCategoryName}
              </span>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpenInfo(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default Category
