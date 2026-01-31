// GetByIdProduct.jsx
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { API_IMAGE } from "@/utils/url"
import { getProductById } from "@/api/productApi/productApi"

const GetByIdProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { singleProduct } = useSelector(s => s.product)

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  const p = singleProduct?.data
  if (!p) return null

  return (
    <div>
      <img src={`${API_IMAGE}/${p.images?.[0]?.images}`} />
      <h1>{p.productName}</h1>
      <p>{p.description}</p>
      <p>{p.price}</p>
      <p>{p.quantity}</p>
      <p>{p.size}</p>
      <p>{p.weight}</p>
      <p>{p.brand}</p>
      <p>{p.color}</p>
    </div>
  )
}

export default GetByIdProduct
