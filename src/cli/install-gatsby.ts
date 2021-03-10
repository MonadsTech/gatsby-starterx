import path from 'path'
import clear from 'clear'
import chalk from 'chalk'
import figlet from 'figlet'
import inquirer from 'inquirer'
import { existsSync } from 'fs'

import { CliHandlerFn } from './typesCli'
import { StarterAvailable, starterList } from './gatsby-starters/starters'
import { isProjectExists } from '../utils/checkIfDirExists'

const starterTypes = Object.values(starterList)
const startersForInquirer = starterTypes.map((s) => ({
  name: s.label,
  value: s.key,
  short: s.key,
}))

export const installGatsbyInit: CliHandlerFn = async () => {
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

  if (isProjectExists(projectName, true)) {
    return
  }

  await starterList[starterType].installStarter({
    projectName,
    starter: starterList[starterType],
  })
}
