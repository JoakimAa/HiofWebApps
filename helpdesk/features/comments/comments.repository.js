import prisma from '@/lib/clients/db'
import { PrismaErrors } from '@/lib/api/errors'
import { Result } from '@/lib/api/result'

export const findMany = async () => {
  try {
    const comments = await prisma.comment.findMany()
    return Result.success(comments)
  } catch (error) {
    console.log(error)
    return Result.failure(PrismaErrors.read('comment', undefined, error))
  }
}

export const create = async ({ id, comment }) => {
  try {
    const createdComment = await prisma.comment.create({
      data: {
        comment,
        issue: {
          connect: {
            id: id,
          },
        },
      },
    })

    return Result.success(createdComment)
  } catch (error) {
    return Result.failure(PrismaErrors.create('comment', undefined, error))
  }
}

export const exist = async (identifier) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(comment)
  } catch (error) {
    return Result.failure(PrismaErrors.read('comment', undefined, error))
  }
}

export const findUnique = async (identifier) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        ...identifier,
      },
    })

    return Result.success(comment)
  } catch (error) {
    return Result.failure(PrismaErrors.read('comment', undefined, error))
  }
}

export const updateById = async (id, commentContent) => {
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: commentContent,
    })

    return Result.success(comment)
  } catch (error) {
    return Result.failure(PrismaErrors.update('comment', undefined, error))
  }
}

export const removeById = async (id) => {
  try {
    const comment = await prisma.comment.delete({ where: { id } })

    return Result.success(comment)
  } catch (error) {
    return Result.failure(PrismaErrors.delete('comment', undefined, error))
  }
}
