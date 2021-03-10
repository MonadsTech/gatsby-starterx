import path from 'path'
import { existsSync } from 'fs'
import chalk from 'chalk'

export const isProjectExists = (name: string, showError = false): boolean => {
  if (existsSync(path.resolve('./', name))) {
    if (showError) {
      console.log(
        chalk.red('Folder exists, please choose some other name and try again')
      )
    }
    return true
  }
  return false
}
