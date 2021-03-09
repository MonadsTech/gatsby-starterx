import cp from 'child_process'
import { InstallStarterConfig } from './types'

export const basicStarterSetup = async (
  config: InstallStarterConfig
): Promise<void> => {
  const { projectName, starter } = config

  const commandStr = `git clone ${starter.url} '${projectName}'`

  cp.execSync(commandStr, {
    // cwd: rootDir,
    stdio: 'inherit',
  })

  cp.execSync(`cd ${projectName} && yarn install`, {
    stdio: 'inherit',
  })

  cp.execSync(`cd ${config.projectName} && yarn setup`, {
    stdio: 'inherit',
  })
}
