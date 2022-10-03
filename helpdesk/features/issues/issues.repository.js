import { Result } from '@/lib/api/result'
import prisma from '@/lib/clients/db'
import { PrismaErrors } from '@/lib/api/errors'

export const findMany = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        comments: true,
      },
    })

    return Result.success(issues)
  } catch (error) {
    return Result.failure(PrismaErrors.read('issue', undefined, error))
  }
}

export const create = async ({
  title,
  creator,
  description,
  severity,
  departmentId,
}) => {
  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        creator,
        description,
        severity,
        department: {
          connect: {
            id: departmentId,
          },
        },
      },
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(PrismaErrors.create('issue', undefined, error))
  }
}

export const exist = async (identifier) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        ...identifier,
      },
    })
    return Result.success(issue)
  } catch (error) {
    return Result.failure(PrismaErrors.read('issue', undefined, error))
  }
}

export const findUnique = async (identifier) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        ...identifier,
      },
      include: {
        comments: true,
      },
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(PrismaErrors.read('issue', undefined, error))
  }
}

export const updateById = async (id, data) => {
  try {
    const issue = await prisma.issue.update({
      where: { id },
      data: data,
    })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(PrismaErrors.update('issue', undefined, error))
  }
}

export const removeById = async (id) => {
  try {
    const issue = await prisma.issue.delete({ where: { id } })

    return Result.success(issue)
  } catch (error) {
    return Result.failure(PrismaErrors.delete('issue', undefined, error))
  }
}
