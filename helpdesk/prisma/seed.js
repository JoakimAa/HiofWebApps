import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

// Dummydata

const departments = [{ name: 'Salg' }, { name: 'Design' }, { name: 'It' }]

const createDepartments = async () => {
  const departmentsPromises = departments.map(async (department) => {
    await prisma.department.create({
      data: {
        ...department,
      },
    })
  })

  await Promise.all(departmentsPromises)
}

const createIssue = async (index) => {
  const issue = {
    title: faker.lorem.sentence(3, 6),
    creator: faker.name.firstName() + ' ' + faker.name.lastName(),
    description: faker.lorem.paragraph(2, 5),
    severity: Math.ceil(Math.random() * (4 - 1)),
    isResolved: Math.random() < 0.3,
    department:
      departments[Math.floor(Math.random() * departments.length)].name,
  }

  try {
    const department = await prisma.department.findUnique({
      where: {
        name: issue.department,
      },
    })

    const issueCreated = await prisma.issue.create({
      data: {
        title: issue.title,
        creator: issue.creator,
        description: issue.description,
        severity: issue.severity,
        isResolved: issue.isResolved,
        department: {
          connect: {
            id: department.id,
          },
        },
      },
    })

    const numberOfComments = Math.floor(Math.random() * 6)

    for (let i = 0; i < numberOfComments; i++) {
      const comment = await prisma.comment.create({
        data: {
          comment: faker.lorem.sentence(),
          issue: {
            connect: {
              id: issueCreated.id,
            },
          },
        },
      })
    }

    return issueCreated
  } catch (error) {
    console.log(error)
  }
}

const createIssues = async (issueCount) => {
  const issuePromises = []

  for (let i = 0; i < issueCount; i++) {
    const issue = await createIssue(i)

    issuePromises.push(issue)
  }

  await Promise.all(issuePromises)
}

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner
  await prisma.issue.deleteMany({})
  await prisma.department.deleteMany({})
  await prisma.comment.deleteMany({})

  await createDepartments()
  await createIssues(15)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
