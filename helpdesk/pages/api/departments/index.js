import * as departmentController from "@/features/departments/departments.controller";

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      await departmentController.createDepartment(req, res)
      break
    case 'get':
      await departmentController.listDepartments(req, res)
      break
    default:
      res.status(405).end()
  }
}