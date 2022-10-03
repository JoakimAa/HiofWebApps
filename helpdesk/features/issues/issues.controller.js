import { ApiResponse } from '@/lib/api/apiResponse'
import * as issueService from './issues.service'
import { validate } from '@/lib/validation/index'
import { formatCreator } from '@/lib/utils/formatCreator'

// GET
// /api/issues
export const listIssues = async (req, res) => {
  const issues = await issueService.list()

  if (!issues?.success) return ApiResponse(res).serverError(issues.error)

  return ApiResponse(res).ok(issues.data)
}

// GET
// /api/issues/{id}
export const getIssueById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const issue = await issueService.getById({
    id,
  })

  if (!issue?.success) {
    switch (issue?.error?.type) {
      case 'Issue.NotExist':
        return ApiResponse(res).notFound(issue.error)
      default:
        return ApiResponse(res).serverError(issue.error)
    }
  }

  return ApiResponse(res).ok(issue.data)
}

// POST
// /api/issues

export const createIssue = async (req, res) => {
  let { departmentName, title, creator, description, severity } = req.body

  if (!departmentName || !title || !creator || !description || !severity)
    return ApiResponse(res).badRequest(
      'Missing required fields: departmentName, title, creator, description, severity '
    )

  // checking the validation on lib/validation
  const { isError, errors } = validate.errorMessage({
    departmentName,
    title,
    creator,
    description,
    severity,
  })

  if (isError) {
    let errorMessage = ''
    Object.keys(errors).map(function (keyName, keyIndex) {
      errorMessage += `${errors[keyName].msg} `
    })
    return ApiResponse(res).badRequest(errorMessage)
  }

  // Formats the creator to first and lastname with first letter capitalized
  creator = formatCreator(creator)

  const createdIssue = await issueService.create({
    departmentName,
    title,
    creator,
    description,
    severity,
  })

  if (!createdIssue.success) {
    return ApiResponse(res).serverError(createdIssue?.error?.message)
  }

  return ApiResponse(res).created(createdIssue.data)
}

// PUT
// /api/issues/{id}
export const updateIssueById = async (req, res) => {
  const { id } = req.query
  const data = req.body

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const issue = await issueService.putById(id, data)

  if (!issue?.success) {
    switch (issue?.error?.type) {
      case 'Issue.NotExist':
        return ApiResponse(res).notFound(issue?.error)
      default:
        return ApiResponse(res).serverError(issue?.error)
    }
  }

  return ApiResponse(res).ok(issue.data)
}

// DELETE
// /api/comments/{id}
export const removeIssueById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const removedIssue = await issueService.deleteById({
    id,
  })

  if (!removedIssue?.success) {
    switch (removedIssue?.error.type) {
      case 'Issue.NotExist':
        return ApiResponse(res).notFound(removedIssue?.error)
      default:
        return ApiResponse(res).serverError(removedIssue?.error)
    }
  }

  return ApiResponse(res).ok(removedIssue.data)
}
