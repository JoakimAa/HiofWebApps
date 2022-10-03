import { useState } from 'react'
import axios from 'axios'
import { validate } from '@/lib/validation'
import createErrorDialog from '@/lib/utils/errors'

export default function CommentForm({
  issueId,
  setItemIsUpdated,
  toggleNewComment,
  toggleShowComments,
  isToggledShowComments,
}) {
  const [form, setForm] = useState({
    id: issueId,
    comment: '',
  })

  const [errorMessage, setErrorMessage] = useState()

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const handleAddComment = async (event) => {
    event.preventDefault()

    const { isError, errorMsg } = validate.isComment(form.comment)
    setErrorMessage(errorMsg)

    if (isError) {
      try {
        await axios.post(`/api/comments`, form)
      } catch (error) {
        createErrorDialog('Oops!', error, 'error', 3000)
        console.error(error)
      }
      setItemIsUpdated(true)
      // Uses a custom hook to show and hide the comments on click
      toggleNewComment(event)
      if (!isToggledShowComments) {
        toggleShowComments(event)
      }
    }
  }

  return (
    <>
      <form className="support_form commentForm" onSubmit={handleAddComment}>
        <div id="headerComment">
          <h2 id="commentFormh2">Legg til kommentar</h2>
          <button type="button" id="btnX" onClick={toggleNewComment}>
            X
          </button>
        </div>
        <div id="commentFormDiv">
          <label className="hidden" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="txtAComment"
            type="text"
            id="comment"
            name="comment"
            maxLength="250"
            onChange={handleInputOnChange}
            required={true}
            value={form.comment}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <div id="warning"> {errorMessage} </div>
    </>
  )
}
