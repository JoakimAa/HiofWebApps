import * as commentRepo from './comments.repository'
import * as issueRepo from '@/features/issues/issues.repository'
import { Result } from '@/lib/api/result'
import { CommentErrors } from './comment.errors'
import { IssueErrors } from '../issues/issue.errors'

export const list = async () => {
  const comments = await commentRepo.findMany()

  if (!comments?.success) return Result.failure(comments.error)

  return Result.success(comments.data)
}

export const getById = async ({ id }) => {
  const comment = await commentRepo.findUnique({ id })

  if (!comment?.success) return Result.failure(comment.error)
  if (!comment?.data) return Result.failure(CommentErrors.notExist(id))

  return Result.success(comment.data)
}

export const create = async ({ id, comment }) => {
  const issue = await issueRepo.exist({ id })

  if (!issue.success) {
    Result.failure(issue.error)
  }

  if (!issue.data) {
    return Result.failure(IssueErrors.notExist(id))
  }

  const createdComment = await commentRepo.create({
    id,
    comment,
  })

  if (!createdComment.success) {
    return Result.failure(createdComment.error)
  }

  return Result.success(createdComment.data)
}

export const putById = async (id, data) => {
  const comment = await commentRepo.exist({ id })

  if (!comment?.success) {
    Result.failure(comment.error)
  }

  if (!comment?.data) {
    return Result.failure(CommentErrors.notExist(id))
  }

  const updatedComment = await commentRepo.updateById(comment.data.id, data)

  if (!updatedComment?.success) {
    return Result.failure(updatedComment.error)
  }

  return Result.success(updatedComment.data)
}

export const deleteById = async ({ id }) => {
  const comment = await commentRepo.exist({ id })

  if (!comment.success) {
    Result.failure(comment.error)
  }

  if (!comment?.data) {
    return Result.failure(CommentErrors.notExist(id))
  }

  const removedComment = await commentRepo.removeById(comment.data.id)

  if (!removedComment.success) return Result.failure(removedComment.error)

  return Result.success(removedComment.data)
}
