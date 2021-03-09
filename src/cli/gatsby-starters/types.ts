
export type StarterAvailable = 'basic' | 'gcn';
export type StarterType<K> = {
        key: K;
        label: string;
        url: string;
        postInstall: (config: PostInstallConfig) => Promise<void>;
    }

export type StarterListType =  {
    [K in StarterAvailable]: StarterType<K>
}

export type PostInstallConfig = {
    projectName: string;
    starter: StarterListType[StarterAvailable];
}