export const IssueErrors = {
  notExist(identifier) {
    return {
      type: 'Issue.NotExist',
      message: `Issue with ${identifier} does not exist`,
    }
  },
}
