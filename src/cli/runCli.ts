import { CliHandlerFn } from './typesCli'
import { Command } from 'commander'
import { EOL } from 'os'
import { version } from '../../package.json'

import { ResultStatus } from '../types'
import { contentfulAppInstallCli } from './contentful/appInstall'
import { installGatsbyInit } from './install-gatsby'

type ParsedOptionsType = {
  init?: boolean
  contentfulAppInstall?: boolean
  version?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const runCli = async (rawArgv: string[]) => {
  const command = new Command()
    .storeOptionsAsProperties(false)
    .usage('[options] ')
    .option('--init', 'Init Gatsby project')
    .option(
      '-cappi, --contentful-app-install',
      'Install App on Contentful Space'
    )
    .option('-v, --version', 'output the package version')

  const parsedOpts: ParsedOptionsType = {
    // config: "./.eslintrc.js",
    ...command.parse(rawArgv).opts(),
  }

  // console.log('parsed options', parsedOpts)
  // console.log('parsed options', Object.keys(parsedOpts))

  let mainHandler = ''
  const anyOfMainHandler = Object.keys(parsedOpts).some((_key) => {
    const key = _key as keyof ParsedOptionsType
    if (MainOptsFnMapping[key]) {
      mainHandler = key
      return true
    }
    return false
  })

  if (anyOfMainHandler && mainHandler) {
    await MainOptsFnMapping[mainHandler].handler(parsedOpts)
    return ResultStatus.Succeeded
  }
}

type MainOptsFnMappingType = {
  [key: string]: {
    handler: CliHandlerFn
  }
}

const MainOptsFnMapping: MainOptsFnMappingType = {
  init: {
    handler: installGatsbyInit,
  },
  contentfulAppInstall: {
    handler: contentfulAppInstallCli,
  },
  version: {
    handler: async () => {
      process.stdout.write(`${version}${EOL}`)
    },
  },
}
