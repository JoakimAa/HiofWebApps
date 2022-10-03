import { useState, useEffect } from 'react'

// A custom hook to filter the issues
export default function useFilterIssues(
  issues,
  departmentIdState,
  severityNum
) {
  const [filteredIssues, setFilteredIssues] = useState()

  useEffect(() => {
    setFilteredIssues([])
    // If neither departments or severity is selected then it sends the list of issues back
    if (!departmentIdState && !severityNum) {
      setFilteredIssues(issues)
    }

    // Filters the issues based on severity if the used selects a severity
    if (severityNum) {
      issues
        ?.filter((issue) => issue.severity === severityNum)
        .map((filteredIssue) => {
          addToFilteredIssues(filteredIssue)
        })
    }

    // Filters the issues based on departments if the used selects a department
    if (departmentIdState) {
      issues
        ?.filter((issue) => issue.departmentId.includes(departmentIdState))
        .map((filteredIssue) => addToFilteredIssues(filteredIssue))
    }
  }, [issues, departmentIdState, severityNum])

  const addToFilteredIssues = (filteredIssue) => {
    setFilteredIssues((filteredIssues) => [...filteredIssues, filteredIssue])
  }
  return [filteredIssues]
}
