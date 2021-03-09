// Setup modified from https://github.com/contentful-userland/gatsby-contentful-starter

import spaceImport from 'contentful-import'
import exportFile from './export.json'
import chalk from 'chalk'
import { writeFileSync } from 'fs'

type setupContentfulConfigType = {
  spaceId: string
  accessToken: string
  previewToken: string
  managementToken: string
  configFilePath: string
}

export const setupContentful = async (
  config: setupContentfulConfigType
): Promise<void> => {
  const { spaceId, managementToken } = config

  writeConfigFile(config)

  await spaceImport({ spaceId, managementToken, content: exportFile })
}

export const writeConfigFile = (config: setupContentfulConfigType): void => {
  const { spaceId, accessToken, previewToken, configFilePath } = config
  console.log('Writing config file...')

  writeFileSync(
    configFilePath,
    JSON.stringify(
      {
        development: {
          host: 'preview.contentful.com',
          spaceId,
          accessToken: previewToken,
        },
        production: {
          spaceId,
          accessToken,
        },
      },
      null,
      2
    )
  )
  console.log(`Config file ${chalk.yellow(configFilePath)} written`)
}
