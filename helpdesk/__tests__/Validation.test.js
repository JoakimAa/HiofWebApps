import * as faker from 'faker'
import { validate } from '@/lib/validation/index'

describe('issue form', () => {
  let fakeIssue
  beforeAll(() => {
    fakeIssue = {
      title: 'A Title that has at least 25 characters',
      creator: 'Firstname Lastname',
      description: 'Description',
      severity: 1,
      departmentName: 'Department',
    }
  })

  describe('desciption', () => {
    it('should pass if description is valid', () => {
      expect(validate.isDescription(fakeIssue.description)).toBeTruthy()
    })

    it('should pass if description is missing', () => {
      let description = ''
      expect(validate.isDescription(description)).toBeFalsy()
    })

    it('should pass if description is too long', () => {
      let description = faker.lorem.sentence(255, 0)
      expect(validate.isDescription(description)).toBeFalsy()
    })
  })

  describe('title', () => {
    it('should pass if title is valid', () => {
      expect(validate.isTitle(fakeIssue.title)).toBeTruthy()
    })

    /* it('should fail if title is missing', () => {
      let title = ''
      expect(validate.isTitle(title)).toBeFalsy()
    }) */

    it('should pass if title is less than 25 characters', () => {
      let title = 'A word'
      expect(validate.isTitle(title)).toBeFalsy()
    })

    it('should pass if title is more than 150 characters', () => {
      let title = faker.lorem.sentence(151, 0)
      expect(validate.isTitle(title)).toBeFalsy()
    })
  })

  describe('severity', () => {
    it('should pass if severity is valid', () => {
      expect(validate.isSeverity(fakeIssue.severity)).toBeTruthy()
    })

    it('should pass if severity is null', () => {
      let severity
      expect(validate.isSeverity(severity)).toBeFalsy()
    })
  })

  describe('department', () => {
    it('should pass if department is valid', () => {
      expect(validate.isDepartment(fakeIssue.departmentName)).toBeTruthy()
    })

    it('should pass if department is null', () => {
      let department
      expect(validate.isDepartment(department)).toBeFalsy()
    })
  })

  describe('creator', () => {
    it('should pass if creator is valid', () => {
      expect(validate.spaceName(fakeIssue.creator)).toBeTruthy()
    })

    it('should pass if creator is missing', () => {
      let creator = ''
      expect(validate.spaceName(creator)).toBeFalsy()
    })

    it('should pass if creator is missing a space', () => {
      let creator = 'Firstname'
      expect(validate.spaceName(creator)).toBeFalsy()
    })
  })

  describe('errorMessage', () => {
    it('should be false if all fields are valid', () => {
      expect(validate.errorMessage(fakeIssue).isError).toBeFalsy()
    })
  })
})

describe('comment form', () => {
  let fakeComment
  beforeAll(() => {
    fakeComment = {
      comment: 'This is a comment',
    }
  })

  it('should pass if comment is valid', () => {
    expect(validate.isComment(fakeComment.comment).isError).toBeTruthy()
  })
  it('should pass if comment is missing', () => {
    let comment = ''
    expect(validate.isComment(comment).isError).toBeFalsy()
  })
  it('should pass if comment is more than 250 characters', () => {
    let comment = faker.lorem.sentence(255, 0)
    expect(validate.isComment(comment).isError).toBeFalsy()
  })
})
