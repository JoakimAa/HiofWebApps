import * as issueRepo from './issues.repository'
import * as departmentRepo from '@/features/departments/departments.repository'
import { IssueErrors } from './issue.errors'
import { DepartmentErrors } from '../departments/department.errors'
import { Result } from '@/lib/api/result'

export const list = async () => {
  const issues = await issueRepo.findMany()

  if (!issues?.success) Result.failure(issues.error)

  return Result.success(issues.data)
}

export const getById = async ({ id }) => {
  const issue = await issueRepo.findUnique({ id })

  if (!issue?.success) return Result.failure(issue.error)
  if (!issue?.data) return Result.failure(IssueErrors.notExist(id))

  return Result.success(issue.data)
}

export const create = async ({
  departmentName,
  title,
  creator,
  description,
  severity,
}) => {
  const department = await departmentRepo.exist({ name: departmentName })

  if (!department?.success) {
    Result.failure(department.error)
  }

  if (!department.data) {
    return Result.failure(DepartmentErrors.notExist(departmentName))
  }

  // sender nødvendig data for å lage en issue
  const createdIssue = await issueRepo.create({
    title,
    creator,
    description,
    severity,
    departmentId: department.data.id,
  })

  if (!createdIssue?.success) {
    return Result.failure(createdIssue.error)
  }

  return Result.success(createdIssue.data)
}

export const putById = async (id, data) => {
  const issue = await issueRepo.exist({ id })

  if (!issue?.success) {
    Result.failure(issue.error)
  }

  if (!issue?.data) {
    return Result.failure(IssueErrors.notExist(id))
  }

  const updatedIssue = await issueRepo.updateById(issue.data.id, data)

  if (!updatedIssue?.success) {
    return Result.failure(updatedIssue.error)
  }

  return Result.success(updatedIssue.data)
}

export const deleteById = async ({ id }) => {
  const issue = await issueRepo.exist({ id })

  if (!issue.success) {
    Result.failure(issue.error)
  }

  if (!issue?.data) {
    return Result.failure(IssueErrors.notExist(id))
  }

  const removedIssue = await issueRepo.removeById(issue.data.id)

  if (!removedIssue.success) return Result.failure(removedIssue.error)

  return Result.success(removedIssue.data)
}
