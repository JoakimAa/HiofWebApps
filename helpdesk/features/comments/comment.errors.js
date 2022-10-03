export const CommentErrors = {
  notExist(identifier) {
    return {
      type: 'Comment.NotExist',
      message: `Comment with ${identifier} does not exist`,
    }
  },
}
