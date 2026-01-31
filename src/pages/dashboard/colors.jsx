import {
  deleteColor,
  getUserColor,
  addColor,
  updateColor,
} from "@/api/colorApi/colorApi"
import React, { useEffect, useState, useMemo } from "react"
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
import { Toaster, toast } from "react-hot-toast"

const Colors = () => {
  const dispatch = useDispatch()
  const { dataColor } = useSelector((state) => state.color)

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)

  const [colorName, setColorName] = useState("")
  const [editId, setEditId] = useState(null)
  const [infoData, setInfoData] = useState(null)

  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getUserColor())
  }, [dispatch])

  const submitAdd = async () => {
    await dispatch(addColor(colorName))
    toast.success("Color added")
    setColorName("")
    setOpenAdd(false)
  }

  const submitEdit = async () => {
    await dispatch(updateColor({ id: editId, colorName }))
    toast.success("Color updated")
    setEditId(null)
    setColorName("")
    setOpenEdit(false)
  }

  const filteredData = useMemo(() => {
    return dataColor.filter((e) =>
      e.colorName.toLowerCase().includes(search.toLowerCase())
    )
  }, [dataColor, search])

  return (
    <div className="min-h-screen px-6 py-12">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto mb-6 flex gap-4">
        <Button color="red" onClick={() => setOpenAdd(true)}>
          Add Color
        </Button>
        <Input
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Dialog open={openAdd} handler={() => setOpenAdd(false)}>
        <DialogHeader>Add Color</DialogHeader>
        <DialogBody>
          <Input
            label="Color name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenAdd(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={submitAdd}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openEdit} handler={() => setOpenEdit(false)}>
        <DialogHeader>Edit Color</DialogHeader>
        <DialogBody>
          <Input
            label="Color name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenEdit(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={submitEdit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openInfo} handler={() => setOpenInfo(false)}>
        <DialogHeader>Color Info</DialogHeader>
        <DialogBody className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full border"
            style={{ backgroundColor: infoData?.colorName }}
          />
          <p>{infoData?.colorName}</p>
          <p>ID: {infoData?.id}</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenInfo(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredData.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-xl p-4 flex flex-col items-center gap-3 shadow"
          >
            <div
              className="w-20 h-20 rounded-full border"
              style={{ backgroundColor: e.colorName }}
            />
            <span>{e.colorName}</span>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await dispatch(deleteColor(e.id))
                  toast.success("Color deleted")
                }}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-full"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(e.id)
                  setColorName(e.colorName)
                  setOpenEdit(true)
                }}
                className="px-3 py-1 bg-green-100 text-green-600 rounded-full"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setInfoData(e)
                  setOpenInfo(true)
                }}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
              >
                Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Colors
