import prisma from '@/lib/clients/db'
import { Result } from '@/lib/api/result'
import { PrismaErrors } from '@/lib/api/errors'

export const findMany = async () => {
  try {
    const departments = await prisma.department.findMany()

    return Result.success(departments)
  } catch (error) {
    return Result.failure(PrismaErrors.read('department', undefined, error))
  }
}

export const create = async ({ name }) => {
  try {
    const department = await prisma.department.create({
      data: {
        name,
      },
    })

    return Result.success(department)
  } catch (error) {
    return Result.failure(PrismaErrors.create('department', undefined, error))
  }
}

export const exist = async (identifier) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(department)
  } catch (error) {
    return Result.failure(PrismaErrors.read('department', undefined, error))
  }
}

export const findUnique = async (identifier) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(department)
  } catch (error) {
    return Result.failure(PrismaErrors.read('department', undefined, error))
  }
}

export const updateById = async (id, data) => {
  try {
    const department = await prisma.department.update({
      where: { id },
      data: data,
    })

    return Result.success(department)
  } catch (error) {
    return Result.failure(PrismaErrors.update('department', undefined, error))
  }
}

export const removeById = async (id) => {
  try {
    const department = await prisma.department.delete({ where: { id } })

    return Result.success(department)
  } catch (error) {
    return Result.failure(PrismaErrors.delete('department', undefined, error))
  }
}
