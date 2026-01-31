import React, { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getUserBrand,
  addBrand,
  deleteBrand,
  editBrand,
} from "@/api/brandApi/brandApi"
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react"
import { motion } from "framer-motion"
import { Toaster } from "react-hot-toast"

const Brands = () => {
  const dispatch = useDispatch()
  const { brandData } = useSelector((state) => state.brand)

  const [search, setSearch] = useState("")
  const [addValue, setAddValue] = useState("")
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [openInfo, setOpenInfo] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    dispatch(getUserBrand())
  }, [dispatch])

  const filteredBrands = useMemo(() => {
    return brandData.filter((e) =>
      e.brandName.toLowerCase().includes(search.toLowerCase())
    )
  }, [brandData, search])

  const submitAdd = () => {
    if (!addValue) return
    dispatch(addBrand(addValue))
    setAddValue("")
    setOpenAdd(false)
  }

  const submitEdit = () => {
    dispatch(editBrand({ id: editId, name: editValue }))
    setEditId(null)
    setEditValue("")
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto flex gap-4 mb-10">
        <Input
          label="Search brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="w-40" color="blue" onClick={() => setOpenAdd(true)}>
          Add Brand
        </Button>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrands.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-6"
          >
            {editId === e.id ? (
              <>
                <Input
                  label="Brand name"
                  value={editValue}
                  onChange={(ev) => setEditValue(ev.target.value)}
                />
                <Button color="green" onClick={submitEdit}>
                  Save
                </Button>
              </>
            ) : (
              <h2 className="text-center text-2xl font-bold">
                {e.brandName}
              </h2>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => dispatch(deleteBrand(e.id))}
                className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(e.id)
                  setEditValue(e.brandName)
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

      <Dialog open={openAdd} handler={() => setOpenAdd(false)}>
        <DialogHeader>Add Brand</DialogHeader>
        <DialogBody>
          <Input
            label="Brand name"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenAdd(false)}>
            Cancel
          </Button>
          <Button color="blue" onClick={submitAdd}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openInfo} handler={() => setOpenInfo(false)}>
        <DialogHeader>Brand Info</DialogHeader>
        <DialogBody className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            {selected?.brandName}
          </h3>
          <p className="text-gray-600 text-sm">
            Brand ID: {selected?.id}
          </p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpenInfo(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default Brands
