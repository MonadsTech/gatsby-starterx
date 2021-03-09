import { gcnStarterSetup } from './gcn'
import { basicStarterSetup } from './basic'
import { StarterAvailable, StarterListType } from './types'

export { StarterAvailable }
export const starterList: StarterListType = {
  basic: {
    key: 'basic',
    label: 'Gatsby Hello World',
    url: 'https://github.com/gatsbyjs/gatsby-starter-hello-world',
    installStarter: basicStarterSetup,
  },
  gcn: {
    key: 'gcn',
    label: 'Contentful Starter',
    url: 'https://github.com/MonadsTech/gatsby-starter-gcn.git',
    installStarter: gcnStarterSetup,
  },
}
