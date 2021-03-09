import { gcnStarterSetup } from "./gcn";
import { StarterAvailable, StarterListType, PostInstallConfig } from "./types";

export {StarterAvailable}
export const starterList :StarterListType = {
    basic : {
        key: 'basic',
        label: 'Gatsby Hello World',
        url : 'https://github.com/gatsbyjs/gatsby-starter-hello-world',
        postInstall: async () => {},
    },
    gcn: {
        key:'gcn',
        label: 'Contentful Starter',
        url:  'https://github.com/MonadsTech/gatsby-starter-gcn.git',
        postInstall:  gcnStarterSetup,
    }
}

