import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetDepartments(setErrorMessage) {
  const [departments, setDepartments] = useState()

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get('/api/departments')
        if (response?.data?.success) {
          setDepartments(response.data.data)
        }
      } catch (error) {
        setErrorMessage(
          `There has been a error getting the departments: ${error.response.status}`
        )
        console.log('There has been an error getting departments', error)
      }
    }
    getDepartments()
  }, [])

  return [departments]
}
