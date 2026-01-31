import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getByIdSubCategory } from "@/api/subCategoryApi/subCategoryApi"

const GetByIdSubCategory = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { subCategoryById } = useSelector((state) => state.subCategory)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getByIdSubCategory(id))
  }, [id])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold mb-6">
          {subCategoryById?.subCategoryName}
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold shadow">
            ID {subCategoryById?.id}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-sm font-semibold shadow">
            Category {subCategoryById?.categoryId}
          </span>
        </div>

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

export default GetByIdSubCategory
