import axios, { AxiosRequestConfig } from 'axios'
import chalk from 'chalk'
import { ContentfulMarketplaceApps } from './contentfulApps'

type installContentfulAppParams = {
  managementToken: string
  spaceId: string
  environmentId: string
  appId: keyof typeof ContentfulMarketplaceApps
  appDefId?: string
  parameters: Record<string, unknown>
}

const myToken = 'CFPAT-SBocFAZhoGCcNMkMiiPp5RZ5MY9gUwUIyFldRywmoow'

export const installContentfulApp = async (
  params: installContentfulAppParams
): Promise<boolean> => {
  const { appId } = params

  const selectedApp = ContentfulMarketplaceApps[appId]

  console.log(`Installing ${selectedApp.name} on Contentful ...`)
  const result = await callInstallApi({
    ...params,
    appDefId: selectedApp.AppDefId,
  })

  if (result) {
    console.log(
      `${chalk.green('Success')}: Installed ${
        selectedApp.name
      } on Contentful ...`
    )
  } else {
    console.log(
      `${chalk.red('Failed')}: Unable to install ${
        selectedApp.name
      } app on contentful. You can try installing app after setup using ${chalk.yellow(
        '--cappi'
      )} option`
    )
  }

  return result
}

const callInstallApi = async (
  params: installContentfulAppParams
): Promise<boolean> => {
  const {
    appDefId,
    environmentId,
    managementToken,
    parameters,
    spaceId,
  } = params

  const myHeaders = {
    Authorization: `Bearer ${managementToken.trim()}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-Marketplace':
      'i-accept-end-user-license-agreement,i-accept-marketplace-terms-of-service,i-accept-privacy-policy',
  }

  const config: AxiosRequestConfig = {
    method: 'put',
    url: `https://api.contentful.com/spaces/${spaceId.trim()}/environments/${environmentId.trim()}/app_installations/${appDefId}`,
    headers: myHeaders,
    data: {
      parameters,
    },
  }

  return axios(config)
    .then((response) => {
      return response.status === 200
    })
    .catch((e: Error) => {
      console.log('e', e.message)
      return false
    })
}
