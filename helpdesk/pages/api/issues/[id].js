import * as issuesController from '@/features/issues/issues.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await issuesController.getIssueById(req, res)
      break
    case 'delete':
      await issuesController.removeIssueById(req, res)
      break
    case 'put':
      await issuesController.updateIssueById(req, res)
      break
    default:
      res.status(405).end()
  }
}
