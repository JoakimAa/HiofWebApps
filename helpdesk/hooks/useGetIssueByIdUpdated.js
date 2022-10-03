import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetIssueByIdUpdated(
  id,
  item,
  isUpdated,
  setItemIsUpdated,
  setErrorMessage
) {
  const [issue, setIssue] = useState(item)

  useEffect(() => {
    if (isUpdated) {
      // Sets the itemIsUpdated to false, preparing it for the next change
      setItemIsUpdated(false)
      const getIssue = async () => {
        try {
          const response = await axios.get(`/api/issues/${id}`)
          if (response?.data?.success) {
            setIssue(response.data.data)
          }
        } catch (error) {
          setErrorMessage(error.message)
          console.log('There has been an error getting issues', error)
        }
      }
      getIssue()
    }
  }, [isUpdated])

  return [issue]
}
