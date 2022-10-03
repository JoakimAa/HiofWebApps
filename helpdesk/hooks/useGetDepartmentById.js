import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetDepartmentById(updatedItem, setErrorMessage) {
  const [department, setDepartment] = useState(null)

  useEffect(() => {
    if (updatedItem) {
      const getDepartment = async () => {
        try {
          const response = await axios.get(
            `/api/departments/${updatedItem?.departmentId}`
          )
          if (response?.data?.success) {
            setDepartment(response.data.data)
          }
        } catch (error) {
          setErrorMessage(
            `There has been a error getting the department: ${error.response.status}`
          )
          console.log('There has been an error getting department', error)
        }
      }
      getDepartment()
    }
  }, [updatedItem])

  return [department]
}
