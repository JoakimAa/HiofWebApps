import { useState } from 'react'
import axios from 'axios'
import * as Constants from '@/lib/constants'
import useGetDepartments from '@/hooks/useGetDepartments'
import { validate } from '@/lib/validation/index'
import createErrorDialog from '@/lib/utils/errors'

export default function SupportForm() {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    severity: null,
    departmentName: null,
  })

  const [error, setError] = useState()
  // Uses a custom hook to get the departments
  const [dropDownDepartments] = useGetDepartments()
  // Uses a constant to get the severity
  const dropDownSeverity = Constants.severity

  const handleInputOnChange = ({ currentTarget: { name, value } }) => {
    // Turning severity into severityNumber
    if (name === 'severity') value = parseInt(value)
    if (name === 'severity' && isNaN(value)) value = null
    if (name === 'departmentName' && value === '') value = null

    // Updates the form when the user types in the issue form
    setForm((state) => ({ ...state, [name]: value }))
  }

  // Validates the input. The method returns if there are errors and the errors.
  const errorMessages = () => {
    const { isError, errors } = validate.errorMessage(form)
    setError(errors)
    return isError
  }

  const handleSendSupport = async (event) => {
    event.preventDefault()
    // Checking if there is any errors in the form
    if (!errorMessages()) {
      // Sends a post request with the data from the form
      await axios
        .post('/api/issues', form)
        .then((response) => {
          // If the response is true we will send a success message to the user
          if (response?.data?.success) {
            createErrorDialog(
              'Jippi!',
              'Henvendelsen har blitt sendt!',
              'success',
              3000
            )
          }
        })
        .then(
          // Source: https://stackoverflow.com/a/24400865
          setTimeout(() => location.reload(), 3000)
        )
        .catch((err) => {
          console.log(err.message)
          createErrorDialog('Noe gikk galt!', err.message, 'error', 0)
        })
    }
  }

  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={150}
          minLength={25}
          onChange={handleInputOnChange}
          value={form.title}
          required={true}
          style={{
            borderColor: error?.titleError?.status ? '#FF0000' : '#c9c9c9',
          }}
        />
        <div id="warning"> {error?.titleError?.msg} </div>
      </div>
      <div>
        <label htmlFor="creator">Navn</label>
        <input
          type="text"
          id="creator"
          name="creator"
          required={true}
          onChange={handleInputOnChange}
          style={{
            borderColor: error?.creatorError?.status ? '#FF0000' : '#c9c9c9',
          }}
          value={form.creator}
        />
        <div id="warning"> {error?.creatorError?.msg}</div>
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          required={true}
          maxLength={250}
          onChange={handleInputOnChange}
          value={form.description}
          style={{
            borderColor: error?.descriptionError?.status
              ? '#FF0000'
              : '#c9c9c9',
          }}
        />
        <div id="warning"> {error?.descriptionError?.msg}</div>
      </div>
      <div>
        <select
          name="departmentName"
          onChange={handleInputOnChange}
          id="selectDepartement"
          style={{
            borderColor: error?.departmentError?.status ? '#FF0000' : '#c9c9c9',
          }}
        >
          <option value="" /* selected */>Velg Avdeling</option>
          {dropDownDepartments?.map((value) => (
            // Showing severity Dropdown field
            <option
              required={true}
              key={value.name}
              name={value.name}
              value={value.name}
            >
              {value.name}
            </option>
          ))}
        </select>
        <div id="warning">{error?.departmentError?.msg} </div>
      </div>
      <div>
        <select
          name="severity"
          onChange={handleInputOnChange}
          id="selectSeverity"
          style={{
            borderColor: error?.severityError?.status ? '#FF0000' : '#c9c9c9',
          }}
        >
          <option value="" /* selected */>Velg Viktighet</option>
          {dropDownSeverity?.map((value) => (
            //Showing severity dropdown field
            <option
              required={true}
              key={value.severity}
              name={value.severity}
              value={value.severityNumber}
            >
              {value.severity}
            </option>
          ))}
        </select>
        <div id="warning"> {error?.severityError?.msg}</div>
      </div>
      <button id="sendIssue" type="submit">
        Send henvendelse
      </button>
    </form>
  )
}
