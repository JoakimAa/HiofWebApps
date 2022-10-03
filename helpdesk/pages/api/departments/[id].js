import * as departmentController from "@/features/departments/departments.controller";

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await departmentController.getDepartmentById(req, res)
      break
    case 'delete':
      await departmentController.removeDepartmentById(req, res)
      break
    case 'put':
      await departmentController.updateDepartmentById(req, res)
      break
    default:
      res.status(405).end()
  }
}