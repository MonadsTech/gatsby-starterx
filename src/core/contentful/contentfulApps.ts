import { ContentfulAppsListType } from './typeApps'

const getMarketplaceApps = (): ContentfulAppsListType => ({
  cloudinary: {
    key: 'cloudinary',
    name: 'Cloudinary',
    AppDefId: 'zjcnWgBknf9zB7IM9HZjE',
    parameters: {
      apiKey: {
        type: 'string',
        message: 'Cloudinary Api Key',
        validate: requiredValidation,
      },
      format: {
        default: 'auto',
        type: 'string',
      },
      quality: {
        default: 'auto',
        type: 'string',
      },
      maxFiles: {
        default: 10,
        type: 'string',
        validate: (val) =>
          !isNaN(parseInt(`${val}`)) || 'This should be a number',
      },
      cloudName: {
        required: true,
        type: 'string',
        validate: requiredValidation,
      },
      startFolder: {
        required: true,
        default: '/',
        type: 'string',
        validate: requiredValidation,
      },
    },
  },
})

const requiredValidation = (val: unknown): boolean | string =>
  !!val || 'This is required'

export const ContentfulMarketplaceApps = getMarketplaceApps()
