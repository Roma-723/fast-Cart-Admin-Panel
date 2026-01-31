import { getByIdColor } from "@/reducers/colorSlice/colorSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const GetByIdColor = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { colorById } = useSelector((state) => state.color)

  useEffect(() => {
    dispatch(getByIdColor(id))
  }, [id])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-32 h-32 mx-auto rounded-full shadow mb-6"
          style={{ backgroundColor: colorById?.colorName }}
        />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          {colorById?.colorName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 mb-6"
        >
          ID: {colorById?.id}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition shadow"
        >
          Go Back
        </motion.button>
      </motion.div>
    </div>
  )
}

export default GetByIdColor
