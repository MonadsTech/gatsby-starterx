import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import inquirer from 'inquirer'
import path from 'path'
import { existsSync } from 'fs'
import { StarterAvailable, starterList } from './gatsby-starters/starters'

const starterTypes = Object.values(starterList)
const startersForInquirer = starterTypes.map((s) => ({
  name: s.label,
  value: s.key,
  short: s.key,
}))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const installGatsbyInit = async () => {
  clear()
  console.log(
    chalk.green(
      figlet.textSync('Gatsby-StarterX', { horizontalLayout: 'full' })
    )
  )

  const answers = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of Gatsby project',
        default: 'hello-world',
        validate: (name) =>
          !existsSync(path.resolve('./', name)) ||
          'Folder exists. please choose other name',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose Starter Template',
        choices: startersForInquirer,
      },
    ])
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })

  const projectName = answers.name as string
  const starterType = answers.type as StarterAvailable

  await starterList[starterType].installStarter({
    projectName,
    starter: starterList[starterType],
  })
}
