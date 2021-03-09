export type StarterAvailable = 'basic' | 'gcn'

export type StarterType<K> = {
  key: K
  label: string
  url: string
  installStarter: (config: InstallStarterConfig) => Promise<void>
}

export type StarterListType = {
  [K in StarterAvailable]: StarterType<K>
}

export type InstallStarterConfig = {
  projectName: string
  starter: StarterListType[StarterAvailable]
}
