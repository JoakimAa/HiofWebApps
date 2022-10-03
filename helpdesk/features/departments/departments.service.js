import * as departmentRepo from './departments.repository'
import { DepartmentErrors } from './department.errors'
import { Result } from '@/lib/api/result'

export const list = async () => {
  const departments = await departmentRepo.findMany()

  if (!departments?.success) Result.failure(departments.error)

  return Result.success(departments.data)
}

export const getById = async ({ id }) => {
  const department = await departmentRepo.findUnique({ id })

  if (!department?.success) return Result.failure(department.error)
  if (!department?.data) return Result.failure(DepartmentErrors.notExist(id))

  return Result.success(department.data)
}

export const create = async ({ 
  name,
   }) => {

  // sender nødvendig data for å lage en department
  const createdDepartment = await departmentRepo.create({name})

  if (!createdDepartment?.success) {
    return Result.failure(DepartmentErrors.exist(name))

  }

  return Result.success(createdDepartment.data)
}

export const putById = async (id, data) => {
  const department = await departmentRepo.exist({ id })

  if (!department?.success) {
    Result.failure(department.error)
  }

  if (!department?.data) {
    return Result.failure(DepartmentErrors.notExist(id))
  }

  const updatedDepartment= await departmentRepo.updateById(department.data.id, data)

  if (!updatedDepartment?.success) {
    return Result.failure(updatedDepartment.error)
  }

  return Result.success(updatedDepartment.data)
}