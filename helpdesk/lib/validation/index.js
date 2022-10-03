export const validate = {
  //Checking if description is more than 250 characters and not 0
  isDescription(description) {
    if (description.length > 250 || description.length === 0) return false
    return true
  },

  // Checking if department is set and is not null
  isDepartment(department) {
    if (!department) return false
    return true
  },

  // Checking if the severity is set and is not null or Not a number
  isSeverity(severity) {
    if (!severity) return false
    return true
  },

  //Checking if title is more than 25 characters and less than 150.
  isTitle(title) {
    if (title.length < 25 || title.length > 150) return false
    return true
  },

  // Checking if the creator name has space and array length is exactly 2
  spaceName(creator) {
    let creatorSplit = creator?.split(' ')
    // Sources: https://stackoverflow.com/a/2843625
    let removeWhitespaceCreator = creatorSplit.filter(function (n) {
      return n
    })
    if (!creator.includes(' ') || removeWhitespaceCreator.length != 2)
      return false
    return true
  },

  isComment(comment) {
    let errorMsg = ''
    if (comment.length > 250) {
      errorMsg = 'Kommentaren må være mindre en 250 tegn'
    }
    if (comment.length === 0) {
      errorMsg = 'Mangler kommentar'
    }
    return { isError: errorMsg === '', errorMsg }
  },

  errorMessage(form) {
    let errors = {}

    // checking the validation on lib/validation

    const validDescription = validate.isDescription(form?.description)
    const validTitle = validate.isTitle(form?.title)
    const validCreator = validate.spaceName(form?.creator)
    const validDepartment = validate.isDepartment(form?.departmentName)
    const validSeverity = validate.isSeverity(form?.severity)

    if (!validTitle) {
      errors = {
        ...errors,
        titleError: {
          status: true,
          msg: 'Tittelen må være mer enn 25 og mindre enn 150 tegn.',
        },
      }
    }
    // Checking if the description is less than 250 characters and have input.
    if (!validDescription) {
      errors = {
        ...errors,
        descriptionError: {
          status: true,
          msg: 'Beskrivelsen må være mindre enn 250 tegn',
        },
      }
    }

    // Checking if the select form is empty
    if (!validDepartment) {
      errors = {
        ...errors,
        departmentError: {
          status: true,
          msg: 'Du må velge en avdeling.',
        },
      }
    }

    if (!validSeverity) {
      errors = {
        ...errors,
        severityError: {
          status: true,
          msg: 'Du må velge en alvorlighetsgrad.',
        },
      }
    }

    if (!validCreator) {
      errors = {
        ...errors,
        creatorError: {
          status: true,
          msg: 'Navnet ditt er ugyldig. Du må ha Fornavn og Etternavn, med mellomrom.',
        },
      }
    }

    return { isError: Object.keys(errors).length > 0, errors }
  },
}
