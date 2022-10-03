import * as commentController from "@/features/comments/comments.controller";

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      await commentController.createComment(req, res)
      break
    case 'get':
      await commentController.listComments(req, res)
      break
    default:
      res.status(405).end()
  }
}