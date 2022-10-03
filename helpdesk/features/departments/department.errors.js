export const DepartmentErrors = {
  notExist(identifier) {
    return {
      type: 'Department.NotExist',
      message: `Department with ${identifier} does not exist`,
    }
  },
  exist(identifier) {
    return {
      type: 'Department.Exist',
      message: `Department with ${identifier} already exist`,
    }
  },
}
