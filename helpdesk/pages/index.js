import SupportList from '@/components/SupportList'
import { useState } from 'react'
import useGetDepartments from '../hooks/useGetDepartments'
import useGetIssues from '../hooks/useGetIssues'
import * as Constants from '../lib/constants'

export default function Home() {
  const [errorMessage, setErrorMessage] = useState()
  const [issueIsDeleted, setIssueIsDeleted] = useState(false)
  const [issues] = useGetIssues(
    issueIsDeleted,
    setIssueIsDeleted,
    setErrorMessage
  )
  const [departmentIdState, setDepartmentIdState] = useState()
  const [severityNum, setSeverityNum] = useState()
  const [dropdownDepartments] = useGetDepartments(setErrorMessage)
  const dropdownSeverity = Constants.severity

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    // Turning severity into severityNumber

    // Used to filter the issues by severity
    if (name === 'severity') {
      if (value !== '') value = parseInt(value)
      setSeverityNum(value)
      setDepartmentIdState('')
      document.getElementById('departmentDropdown').value = ''
    }

    // Used to filter the issues by department
    if (name === 'departmentName') {
      setDepartmentIdState(value)
      setSeverityNum('')
      document.getElementById('severityDropdown').value = ''
    }
  }

  return (
    <>
      <div className="headerElements">
        <h2>Henvendelser</h2>
        <div className="selector">
          <select
            id="severityDropdown"
            className="grey"
            name="severity"
            onChange={handleInputOnChange}
          >
            <option value="">Viktighet</option>
            {dropdownSeverity?.map((value) => (
              //Showing severity dropdown field
              <option
                key={value.severity}
                name={value.severity}
                value={value.severityNumber}
              >
                {value.severity}
              </option>
            ))}
          </select>
          <select
            id="departmentDropdown"
            className="grey"
            name="departmentName"
            onChange={handleInputOnChange}
          >
            <option value="">Avdeling</option>
            {dropdownDepartments?.map((value) => (
              // Showing severity Dropdown field
              <option key={value.name} name={value.name} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errorMessage && (
        <section className="issues">
          <h2>{errorMessage}</h2>
        </section>
      )}
      <section className="issues">
        <SupportList
          key={issues?.id}
          issues={issues}
          departmentIdState={departmentIdState}
          severityNum={severityNum}
          setIssueIsDeleted={setIssueIsDeleted}
          setErrorMessage={setErrorMessage}
        />
      </section>
    </>
  )
}
