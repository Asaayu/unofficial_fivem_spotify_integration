import { createContext, useState } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { BRAND } from '@asaayu-base/brand';

import isDev from '../utils/isDev';

export interface ISpotifySDK {
    sdk: SpotifyApi;
    startUserLoginProcess: () => Promise<boolean>;
    checkBlocklist: (userId: string) => Promise<boolean>;
}

const urlParts = BRAND.gitHubUrl.split('/');
const repoName = urlParts[urlParts.length - 1];
const url = `https://raw.githubusercontent.com/Asaayu/${repoName}/main/BLOCKLIST.md`;

export const SpotifySDKContext = createContext({} as ISpotifySDK);
export const SpotifySDK = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const [sdk] = useState(
        SpotifyApi.withUserAuthorization(BRAND.appClientId, isDev() ? BRAND.appRedirectUriDev : BRAND.appRedirectUriProd, BRAND.appScopes)
    );

    const checkBlocklist = async (userId: string) => {
        return await fetch(url)
            .then((response) => response.text())
            .then((text) => {
                const blocklist = text.split('\n');
                const blocked = blocklist.includes(userId);

                localStorage.setItem('blocked', blocked ? 'true' : 'false');
                return blocked;
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    };

    const startUserLoginProcess = async () => {
        const blocked = localStorage.getItem('blocked');
        if (blocked === 'true') return false;

        const authenticationResponse = await sdk.authenticate();
        await sdk.authenticate(); // This second call is required for the SDK to work properly
        localStorage.setItem('hasPassedLoginPage', 'true');

        return authenticationResponse.authenticated;
    };

    return (
        <SpotifySDKContext.Provider
            value={{
                sdk,
                startUserLoginProcess,
                checkBlocklist,
            }}
        >
            {props.children}
        </SpotifySDKContext.Provider>
    );
};
