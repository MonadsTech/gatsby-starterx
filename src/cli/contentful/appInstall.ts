import chalk from 'chalk'
import cp from 'child_process'
import inquirer from 'inquirer'
import path from 'path'
import { ContentfulMarketplaceApps } from '../../core/contentful/contentfulApps'
import { installContentfulApp } from '../../core/contentful/installApps'
import { CliHandlerFn } from './../typesCli'

export const contentfulAppInstallCli: CliHandlerFn = async () => {
  await contentfulAppInstallHandler()
}

type contentfulAppInstallHandlerParam = Pick<
  ContentfulSpaceAnswersType,
  'managementToken' | 'spaceId'
>

export const contentfulAppInstallHandler = async (
  params?: contentfulAppInstallHandlerParam
) => {
  renderInstructions(!!params?.spaceId, !!params?.managementToken)

  const questionSpaceId = !params
    ? [
        {
          name: 'spaceId',
          message: 'Your Space ID',
          validate: (input: string) =>
            /^[a-z0-9]{12}$/.test(input) ||
            'Space ID must be 12 lowercase characters',
        },
        {
          name: 'managementToken',
          message: 'Your Content Management API access token',
        },
      ]
    : []

  const _contentfulSpaceInfo: ContentfulSpaceAnswersType = await inquirer
    .prompt([
      ...questionSpaceId,
      {
        name: 'environmentId',
        message: 'Your Environment Id',
        default: 'master',
      },
      {
        type: 'list',
        name: 'appId',
        message: 'Choose App to install',
        choices: contentfulAppsToShow,
      },
    ])
    .catch((error) => console.error(error))

  const contentfulSpaceInfo = {
    ...params,
    ..._contentfulSpaceInfo,
  }
  const { appId } = contentfulSpaceInfo

  const selectedApp = ContentfulMarketplaceApps[appId]
  const selectedAppParams = selectedApp.parameters

  const appQuestions = Object.keys(selectedAppParams).map((q) => {
    const { validate, message } = selectedAppParams[q]

    return {
      name: q,
      message: message || q,
      default: selectedAppParams[q].default,
      validate,
    }
  })

  const contentfulAppParams = await inquirer
    .prompt(appQuestions)
    .catch((error) => console.error(error))

  await installContentfulApp({
    ...contentfulSpaceInfo,
    parameters: contentfulAppParams,
  })

  return
}

const contentfulAppsToShow = Object.values(ContentfulMarketplaceApps).map(
  (app) => ({
    name: app.name,
    value: app.key,
    short: app.name,
  })
)

type ContentfulSpaceAnswersType = {
  appId: keyof typeof ContentfulMarketplaceApps
  managementToken: string
  environmentId: string
  spaceId: string
}

const renderInstructions = (spaceId: boolean, managementToken: boolean) => {
  return spaceId && managementToken
    ? console.log(`
  To install apps in your contentful space you need to provide following data.

  The ${chalk.green('Environment id')}
    By default it's master.
  
  `)
    : console.log(`
  To install app in your contentful space you need to provide your Space ID
  and the belonging API access tokens.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red(
      '->'
    )} API keys`
  )}

  The ${chalk.green('Content Management API Token')}
    will be used to import and write data to your space.

  The ${chalk.green('Environment id')}
    By default it's master.

  Ready? Let's do it! 🎉
`)
}
