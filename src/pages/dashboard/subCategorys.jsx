import React, { useEffect, useState, useMemo } from "react"
import {
  getUserSubCategory,
  deleteSubCategory,
  addSubCategory,
  updateSubCategory,
  getCategory,
  getByIdSubCategory,
} from "@/api/subCategoryApi/subCategoryApi"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react"
import { motion } from "framer-motion"
import { Toaster } from "react-hot-toast"

const SubCategorys = () => {
  const dispatch = useDispatch()
  const { SubCategoryData, dataCategory, subCategoryById } = useSelector(
    (state) => state.subCategory
  )

  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)

  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [editCategoryId, setEditCategoryId] = useState("")

  const [idx, setIdx] = useState("")
  const [subCategoryNAme, setSubCategoryName] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getUserSubCategory())
    dispatch(getCategory())
  }, [dispatch])

  const submitEdit = () => {
    dispatch(
      updateSubCategory({
        id: editId,
        categoryId: editCategoryId,
        subCategoryName: editValue,
      })
    )
    setOpenEdit(false)
  }

  const submitAdd = () => {
    dispatch(addSubCategory({ subCategoryNAme, idx }))
    setSubCategoryName("")
    setIdx("")
    setOpenAdd(false)
  }

  const filteredData = useMemo(() => {
    return SubCategoryData?.filter((e) =>
      e.subCategoryName.toLowerCase().includes(search.toLowerCase())
    )
  }, [SubCategoryData, search])

  return (
    <div className="min-h-screen py-12 px-6">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-wrap gap-4 mb-12"
      >
        <Button onClick={() => setOpenAdd(true)}>Add SubCategory</Button>
        <Input
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      <Dialog open={openAdd} handler={() => setOpenAdd(false)}>
        <Card className="rounded-3xl">
          <CardBody className="flex flex-col gap-4">
            <Input
              label="SubCategory"
              value={subCategoryNAme}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
            <select
              className="border rounded-xl px-3 py-2"
              value={idx}
              onChange={(e) => setIdx(e.target.value)}
            >
              <option value="">Category</option>
              {dataCategory?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </CardBody>
          <CardFooter className="flex gap-3">
            <Button fullWidth onClick={submitAdd}>Add</Button>
            <Button variant="text" fullWidth onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog open={openEdit} handler={() => setOpenEdit(false)}>
        <Card className="rounded-3xl">
          <CardBody className="flex flex-col gap-4">
            <Input
              label="SubCategory"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <select
              className="border rounded-xl px-3 py-2"
              value={editCategoryId}
              onChange={(e) => setEditCategoryId(e.target.value)}
            >
              {dataCategory?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </CardBody>
          <CardFooter className="flex gap-3">
            <Button fullWidth onClick={submitEdit}>Save</Button>
            <Button variant="text" fullWidth onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog open={openInfo} handler={() => setOpenInfo(false)}>
        <Card className="rounded-3xl">
          <CardBody className="flex flex-col gap-3 text-center">
            <h2 className="text-xl font-bold">
              {subCategoryById?.subCategoryName}
            </h2>
            <p className="text-sm text-gray-600">
              Category ID: {subCategoryById?.categoryId}
            </p>
            <p className="text-sm text-gray-600">
              SubCategory ID: {subCategoryById?.id}
            </p>
          </CardBody>
          <CardFooter>
            <Button fullWidth onClick={() => setOpenInfo(false)}>Close</Button>
          </CardFooter>
        </Card>
      </Dialog>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData?.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.07 }}
            className="relative bg-white rounded-3xl shadow-xl p-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 opacity-40" />
            <h2 className="relative z-10 text-xl font-bold text-center mb-6">
              {e.subCategoryName}
            </h2>
            <div className="relative z-10 flex justify-between text-sm">
              <button
                onClick={() => dispatch(deleteSubCategory(e.id))}
                className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-medium"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setEditId(e.id)
                  setEditValue(e.subCategoryName)
                  setEditCategoryId(e.categoryId)
                  setOpenEdit(true)
                }}
                className="px-4 py-1.5 rounded-full bg-green-100 text-green-600 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  dispatch(getByIdSubCategory(e.id))
                  setOpenInfo(true)
                }}
                className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-medium"
              >
                Info
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SubCategorys
