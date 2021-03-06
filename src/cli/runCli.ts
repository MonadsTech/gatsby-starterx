import chalk from 'chalk'
import { Command } from 'commander'
import { EOL } from 'os'
import { version } from '../../package.json'

import { ResultStatus } from '../types'
import { installGatsbyInit } from './install-gatsby'

export const runCli = async (rawArgv: string[]) => {
  const command = new Command()
    .storeOptionsAsProperties(false)
    .usage('[options] ')
    .option('--init', 'Init Gatsby project')
    .option('-v, --version', 'output the package version')

  const parsedOpts = {
    // config: "./.eslintrc.js",
    ...command.parse(rawArgv).opts(),
  }

  console.log('parsed options', parsedOpts)
  // 2. If the version should be printed, we do that and stop execution.
  if (parsedOpts.version) {
    process.stdout.write(`${version}${EOL}`)
    // dependencies.logger.stdout.write(`${version}${EOL}`);
    return ResultStatus.Succeeded
  }

  if (parsedOpts.init) {
    await installGatsbyInit()
    return ResultStatus.Succeeded
  }
}
