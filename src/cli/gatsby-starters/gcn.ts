import cp from 'child_process'
import {PostInstallConfig} from './types'

export const gcnStarterSetup = async (config: PostInstallConfig)=>{

    cp.execSync(`cd ${config.projectName} && yarn setup`, {
        stdio: 'inherit',
    })

} 