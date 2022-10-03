export const formatCreator = (creator) => {
  let creatorSplit = creator.split(' ')

  // Capitalizing the first letter in the name & last name
  let firstName = creatorSplit[0].charAt(0).toUpperCase() + creatorSplit[0].slice(1)
  let lastName = creatorSplit[1].charAt(0).toUpperCase() + creatorSplit[1].slice(1)
  creator = firstName + ' ' + lastName
  
  return creator
}