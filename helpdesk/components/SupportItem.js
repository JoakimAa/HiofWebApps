/* eslint-disable no-ternary */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Comment from './Comment'
import CommentForm from './CommentForm'
import useToggle from '../hooks/useToggle'
import useGetDepartmentById from '../hooks/useGetDepartmentById'
import useGetIssueByIdUpdated from '../hooks/useGetIssueByIdUpdated'
import axios from 'axios'
import createErrorDialog from '@/lib/utils/errors'

export default function SupportItem({
  item,
  setIssueIsDeleted,
  setErrorMessage,
}) {
  const router = useRouter()
  // A state used to check if the issue has been updated, default value is false
  const [itemIsUpdated, setItemIsUpdated] = useState(false)
  // Uses a custom hook to get an issue by id, uses itemIsUpdated to check if the issue has been updated
  const [updatedItem] = useGetIssueByIdUpdated(
    item?.id,
    item,
    itemIsUpdated,
    setItemIsUpdated,
    setErrorMessage
  )

  const [url, setUrl] = useState()

  // Shows and hides the comments, uses a custom hook
  const [isToggledShowComments, toggleShowComments] = useToggle(false)
  // Shows and hides the new comment component, uses a custom hook
  const [isToggledNewComment, toggleNewComment] = useToggle(false)
  // Uses a custom hook to get the departments
  const [department] = useGetDepartmentById(updatedItem, setErrorMessage)
  const [issueId] = useState(updatedItem?.id)

  const severityLow = updatedItem?.severity === 1 ? 'Lav' : null
  const severityMedium = updatedItem?.severity === 2 ? 'Medium' : null
  const severityHigh = updatedItem?.severity === 3 ? 'Høy' : null

  // Sets the issue to solved and updates the itemIsUpdates to true to trigger the custom hook, the rerenders the single issue.
  const solveIssue = async (data) => {
    try {
      await axios.put(`/api/issues/${updatedItem?.id}`, data)
      setItemIsUpdated(true)
    } catch (error) {
      console.log('There has been an error getting issues', error)
      createErrorDialog('Noe gikk galt!', error.message, 'error', 0)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    setUrl(router.pathname)
  }, [router.isReady])

  const deleteIssue = async () => {
    try {
      const response = await axios.delete(`/api/issues/${updatedItem?.id}`)
      if (response?.data?.success) {
        setIssueIsDeleted(true)
        router.push('/')
      }
    } catch (error) {
      console.log('There has been an error getting issues', error.message)
      createErrorDialog('Noe gikk galt!', error.message, 'error', 0)
    }
  }

  return (
    <>
      <li className="issue">
        <div
          onClick={() => router.push(`/issues/${updatedItem?.id}`)}
          className={!url?.includes('/issues') ? 'issue-hover' : undefined}
        >
          <div className="meta">
            <span className="grey">{department?.name}</span>
            <span className={`severity${updatedItem?.severity}`}>
              {severityHigh ?? severityMedium ?? severityLow} &#x2B24;
            </span>
          </div>
          <h3>
            {updatedItem?.title} {updatedItem?.isResolved ? '(løst)' : null}
          </h3>
          <p>{updatedItem?.description}</p>
          <span id="txtCreator" className="grey">
            {updatedItem?.creator}
          </span>
        </div>
        <footer>
          <span id="txtDate" className="grey">
            {new Date(updatedItem?.created_at).toLocaleDateString('nb-NO', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour12: false,
            })}
          </span>
          <div className="issue_actions">
            {updatedItem?.comments?.length > 0 && (
              <button
                className={
                  isToggledShowComments
                    ? 'toggleTextColorEnabled'
                    : 'toggleTextColorDisabled'
                }
                type="button"
                onClick={toggleShowComments}
              >
                {isToggledShowComments ? 'Skjul' : 'Se'} kommentarer (
                {updatedItem?.comments?.length})
              </button>
            )}
            <button
              className={
                isToggledNewComment
                  ? 'toggleTextColorEnabled'
                  : 'toggleTextColorDisabled'
              }
              type="button"
              onClick={toggleNewComment}
            >
              Legg til kommentar
            </button>
            <button
              type="button"
              onClick={() =>
                solveIssue({ isResolved: !updatedItem?.isResolved })
              }
            >
              {!updatedItem?.isResolved ? 'Avslutt' : 'Åpne'}
            </button>
            <button type="button" onClick={() => deleteIssue()}>
              Slett
            </button>
          </div>
        </footer>
      </li>
      <ul>
        {isToggledShowComments &&
          updatedItem?.comments?.map((comment, index) => (
            <Comment
              comment={comment}
              index={index}
              key={comment.id}
              setItemIsUpdated={setItemIsUpdated}
            />
          ))}
      </ul>
      <div>
        {isToggledNewComment && (
          <CommentForm
            toggleShowComments={toggleShowComments}
            issueId={issueId}
            setItemIsUpdated={setItemIsUpdated}
            toggleNewComment={toggleNewComment}
            isToggledShowComments={isToggledShowComments}
          />
        )}
      </div>
    </>
  )
}
