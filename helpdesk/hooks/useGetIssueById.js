import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetIssueById(id, setErrorMessage) {
  const [issue, setIssue] = useState()

  useEffect(() => {
    if (id) {
      const getIssue = async () => {
        try {
          const response = await axios.get(`/api/issues/${id}`)
          if (response?.data?.success) {
            setIssue(response.data.data)
          }
        } catch (error) {
          setErrorMessage(
            `There has been a error getting the issue: ${error.response.status}`
          )
          console.log('There has been an error getting the issue', error)
        }
      }
      getIssue()
    }
  }, [id])

  return [issue]
}
