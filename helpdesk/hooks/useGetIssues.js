import { useEffect, useState } from 'react'
import axios from 'axios'

// Got inspiration from this. Source: https://dev.to/omarmoataz/react-using-custom-hooks-to-reuse-stateful-logic-11a7

export default function useGetIssues(
  issueIsDeleted,
  setIssueIsDeleted,
  setErrorMessage
) {
  const [issues, setIssues] = useState()

  // Used to get the issues
  useEffect(() => {
    getIssues()
  }, [])

  // Used to get the issues when one is deleted
  useEffect(() => {
    if (issueIsDeleted) {
      setIssueIsDeleted(false)
      getIssues()
    }
  }, [issueIsDeleted])

  const getIssues = async () => {
    try {
      const response = await axios.get(`/api/issues`)
      if (response?.data?.success) {
        setIssues(response.data.data)
      }
    } catch (error) {
      setErrorMessage(
        `There has been an error getting issues: ${error.response.status}`
      )
      console.log('There has been an error getting issues')
    }
  }

  return [issues]
}
