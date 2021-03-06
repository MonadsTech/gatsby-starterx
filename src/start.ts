import { EOL } from 'os'
import { runCli } from './cli/runCli'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const main = async (argv: string[]) => {
  try {
    // const resultStatus = await runCli(runCliDependencies, argv);
    const resultStatus = await runCli(argv)

    // processLogger.info.close();

    if (resultStatus !== 0) {
      process.exitCode = 1
    }
  } catch (error) {
    // process.s.info.close();
    process.stdout.write(`Error in installing: ${error.stack}${EOL}`)
    process.exitCode = 1
  }
}
