export type ContentfulAvailableAppsType = 'cloudinary'

type ParametersType = {
  [key: string]: {
    message?: string
    default?: string | number
    type?: string
    required?: boolean
    validate?: (val: unknown) => boolean | string
  }
}

export type ContentfulAppType<K> = {
  key: K
  name: string
  AppDefId: string
  parameters: ParametersType
  url?: string
  installConfig?: (config: ContentfulAppConfig) => Promise<void>
}

export type ContentfulAppsListType = {
  [K in ContentfulAvailableAppsType]: ContentfulAppType<K>
}

export type ContentfulAppConfig = {
  projectName: string
  starter: ContentfulAppsListType[ContentfulAvailableAppsType]
}
