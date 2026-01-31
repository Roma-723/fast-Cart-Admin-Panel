import { jwtDecode } from "jwt-decode"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "@/api/profilApi/profileApi"
import { motion } from "framer-motion"

export const Profile = () => {
  const dispatch = useDispatch()

  const token = localStorage.getItem("token")
  const data = token ? jwtDecode(token) : null

  const { profileData } = useSelector((state) => state.profile)

  useEffect(() => {
    if (data?.sid) {
      dispatch(getUserProfile(data.sid))
    }
  }, [dispatch, data?.sid])

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow overflow-hidden"
      >
        <div className="p-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Username</th>
                <th className="px-3 py-2 text-left">First</th>
                <th className="px-3 py-2 text-left">Last</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">DOB</th>
                <th className="px-3 py-2 text-left">Roles</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {profileData?.map((e, i) => (
                <motion.tr
                  key={e.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-3 py-2 font-medium">{e.userName}</td>
                  <td className="px-3 py-2">{e.firstName}</td>
                  <td className="px-3 py-2">{e.lastName}</td>
                  <td className="px-3 py-2">{e.email}</td>
                  <td className="px-3 py-2">{e.phoneNumber}</td>
                  <td className="px-3 py-2">{e.dob}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {e.userRoles.map((el) => (
                        <span
                          key={el.id}
                          className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px]"
                        >
                          {el.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile
