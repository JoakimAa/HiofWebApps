import axios from 'axios'

export default function Comment({ comment, index, setItemIsUpdated }) {
  const deleteComment = async () => {
    await axios
      .delete(`/api/comments/${comment.id}`)
      .then(() => {
        setItemIsUpdated(true)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <li>
      <div className="commentForm">
        <h2 id="commentFormh2">Kommentar {index + 1}</h2>
        <p>{comment.comment}</p>
        <button type="submit" onClick={deleteComment}>
          Slett
        </button>
      </div>
    </li>
  )
}
