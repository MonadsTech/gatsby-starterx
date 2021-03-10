export type CliHandlerFn = (parsedOpts: {
  [x: string]: unknown
}) => Promise<void>
