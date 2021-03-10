import chalk from 'chalk'
import cp from 'child_process'
import inquirer from 'inquirer'
import path from 'path'
import { setupContentful } from '../../core/contentful/setup'
import { contentfulAppInstallHandler } from '../contentful/appInstall'

import { InstallStarterConfig } from './types'

export const gcnStarterSetup = async (
  config: InstallStarterConfig
): Promise<void> => {
  const { projectName, starter } = config

  renderInstructions()

  const configFilePath = path.resolve('./', projectName, '.contentful.json')

  const contentfulSetup: ContentfulSpaceAnswersType = await inquirer
    .prompt(questions)
    .catch((error) => console.error(error))

  const {
    spaceId,
    accessToken,
    previewToken,
    managementToken,
  } = contentfulSetup

  await contentfulAppInstallHandler({ spaceId, managementToken })

  cp.execSync(`git clone ${starter.url} '${projectName}'`, {
    // cwd: rootDir,
    stdio: 'inherit',
  })

  await setupContentful({
    spaceId,
    accessToken,
    previewToken,
    managementToken,
    configFilePath,
  })

  cp.execSync(`cd ${projectName} && yarn install`, {
    stdio: 'inherit',
  })

  console.log(
    `All set! You can now run ${chalk.yellow(
      'gatsby develop'
    )} to see it in action.`
  )

  // cp.execSync(`cd ${config.projectName} && yarn setup`, {
  //   stdio: 'inherit',
  // })
}

const questions = [
  {
    name: 'spaceId',
    message: 'Your Space ID',
    validate: (input: string) =>
      /^[a-z0-9]{12}$/.test(input) ||
      'Space ID must be 12 lowercase characters',
  },
  {
    name: 'accessToken',
    message: 'Your Content Delivery API access token',
  },
  {
    name: 'previewToken',
    message: 'Your Content Preview API access token',
  },
  {
    name: 'managementToken',
    message: 'Your Content Management API access token',
  },
]

type ContentfulSpaceAnswersType = {
  managementToken: string
  previewToken: string
  accessToken: string
  spaceId: string
}

const renderInstructions = () => {
  console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
      '->'
    )} API keys`
  )}

  The ${chalk.green('Content Delivery API Token')}
    will be used to ship published production-ready content in your Gatsby app.

  The ${chalk.green('Content Preview API Token')}
    will be used to show not published data in your development environment.

  The ${chalk.green('Content Management API Token')}
    will be used to import and write data to your space.

  Ready? Let's do it! 🎉
`)
}
