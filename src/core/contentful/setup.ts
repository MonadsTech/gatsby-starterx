import spaceImport from 'contentful-import'
import exportFile from './contentfulSchema.json'
import chalk from 'chalk'
import { writeFileSync } from 'fs'

type SetupContentfulConfigType = {
  spaceId: string
  accessToken: string
  previewToken: string
  managementToken: string
  configFilePath: string
}

type setupFn = (config: SetupContentfulConfigType) => Promise<void>

/**
 * Setups Contentful project
 * @param config
 */

export const setupContentful: setupFn = async (config) => {
  await writeConfigFile(config)

  await importDataToSpace(config)
}

/**
 * Writes contentful config (token, spaceId) in file for gatsby site/plugin to use
 *
 * @param config
 */
export const writeConfigFile: setupFn = async (config) => {
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

/**
 * Imports data to Contentful Space
 *
 * @param config
 */
export const importDataToSpace: setupFn = async (config) => {
  const { spaceId, managementToken } = config

  await spaceImport({ spaceId, managementToken, content: exportFile })
}
