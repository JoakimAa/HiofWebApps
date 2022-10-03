import { ApiResponse } from '@/lib/api/apiResponse'
import * as commentService from './comments.service'
import { validate } from '@/lib/validation/index'

// GET
// /api/comments
export const listComments = async (req, res) => {
  const comments = await commentService.list()

  if (!comments?.success) return ApiResponse(res).serverError(comments.error)

  return ApiResponse(res).ok(comments.data)
}

// GET
// /api/comments/{id}
export const getCommentById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const comment = await commentService.getById({
    id,
  })

  if (!comment?.success) {
    switch (comment?.error.type) {
      case 'Comment.NotExist':
        return ApiResponse(res).notFound(comment.error)
      default:
        return ApiResponse(res).serverError(comment.error)
    }
  }

  return ApiResponse(res).ok(comment.data)
}

// POST
// /api/comments
export const createComment = async (req, res) => {
  const { id, comment } = req.body

  if (!comment || !id)
    return ApiResponse(res).badRequest(
      'Missing required fields: comment, issueId'
    )

  const { isError, errorMsg } = validate.isComment(comment)

  if (!isError) {
    return ApiResponse(res).badRequest(errorMsg)
  }

  const createdComment = await commentService.create({
    comment,
    id,
  })

  if (!createdComment.success) {
    return ApiResponse(res).serverError(createdComment?.error?.message)
  }

  return ApiResponse(res).created(createdComment.data)
}

// PUT
// /api/comments/{id}
export const updateCommentById = async (req, res) => {
  const { id } = req.query
  const data = req.body

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const comment = await commentService.putById(id, data)

  if (!comment?.success) {
    switch (comment?.error.type) {
      case 'Comment.NotExist':
        return ApiResponse(res).notFound(comment?.error)
      default:
        return ApiResponse(res).serverError(comment?.error)
    }
  }

  return ApiResponse(res).ok(comment.data)
}

// DELETE
// /api/comments/{id}
export const removeCommentById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const removedComment = await commentService.deleteById({
    id,
  })

  if (!removedComment?.success) {
    switch (removedcomment?.error.type) {
      case 'Comment.NotExist':
        return ApiResponse(res).notFound(removedComment?.error)
      default:
        return ApiResponse(res).serverError(removedComment?.error)
    }
  }

  return ApiResponse(res).ok(removedComment.data)
}
