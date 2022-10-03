import * as departmentService from './departments.service'
import { ApiResponse } from '@/lib/api/apiResponse'

// GET
// /api/departments
export const listDepartments = async (req, res) => {
  const departments = await departmentService.list()

  if (!departments?.success)
    return ApiResponse(res).serverError(departments.error)

  if (departments.error) return res.status(500).json(departments.error)

  return ApiResponse(res).ok(departments.data)
}

// GET
// /api/departments/{id}
export const getDepartmentById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const department = await departmentService.getById({
    id,
  })

  if (!department?.success) {
    switch (department?.error.type) {
      case 'Department.NotExist':
        return ApiResponse(res).notFound(department.error)
      default:
        return ApiResponse(res).serverError(department.error)
    }
  }

  return ApiResponse(res).ok(department.data)
}

// POST
// /api/departments
export const createDepartment = async (req, res) => {
  const { name } = req.body

  if (!name) return ApiResponse(res).badRequest('Missing required fields: name')

  const createdDepartment = await departmentService.create({ name })

  if (!createdDepartment?.success) {
    switch (createdDepartment?.error.type) {
      case 'Department.Exist':
        return ApiResponse(res).conflict(createdDepartment?.error?.message)
      default:
        return ApiResponse(res).serverError(createdDepartment.error)
    }
  }

  return ApiResponse(res).created(createdDepartment.data)
}

// PUT
// /api/departments/{id}
export const updateDepartmentsById = async (req, res) => {
  const { id } = req.query
  const data = req.body

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const department = await departmentService.putById(id, data)

  if (!department?.success) {
    switch (department?.error.type) {
      case 'Department.NotExist':
        return ApiResponse(res).notFound(department?.error)
      default:
        return ApiResponse(res).serverError(department?.error)
    }
  }

  return ApiResponse(res).ok(department.data)
}

// DELETE
// /api/comments/{id}
export const removeDepartmentById = async (req, res) => {
  const { id } = req.query

  if (!id) return ApiResponse(res).badRequest('Missing required fields: id')

  const removedDepartment = await departmentService.deleteById({
    id,
  })

  if (!removedDepartment?.success) {
    switch (removedDepartment?.error.type) {
      case 'Department.NotExist':
        return ApiResponse(res).notFound(removedDepartment?.error)
      default:
        return ApiResponse(res).serverError(removedDepartment?.error)
    }
  }

  return ApiResponse(res).ok(removedDepartment.data)
}
