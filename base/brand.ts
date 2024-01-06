import { IBrand } from './types';

export const BRAND: IBrand = {
    // Names and Titles
    name: 'Unofficial FiveM Spotify Integration',
    nameTitle: ['Unofficial FiveM', 'Spotify Integration'],
    description: 'Access, control, and listen to Spotify music while playing.',

    // URLs
    discordUrl: 'https://discord.gg/7P4fXDvXzp',
    gitHubUrl: 'https: //github.com/Asaayu/unofficial_fivem_spotify_integration',
    peerStatusUrl: 'https://status.peerjs.com/ib0l',
    websiteUrl: 'https://asaayu.github.io/unofficial_fivem_spotify_integration',
    baseUrl: '/unofficial_fivem_spotify_integration',
    eulaUrl: '/end-user-license-agreement',
    privacyUrl: '/privacy-policy',

    // Update Speeds
    updateSpeed: 1000,
    peerReconnectSpeed: 5000,

    // Internal App Settings
    appClientId: '3578871b9f3444b5a32cc72b3fc9f8ed',
    appRedirectUriDev: 'http://localhost:5173/unofficial_fivem_spotify_integration/player',
    appRedirectUriProd: 'https://asaayu.github.io/unofficial_fivem_spotify_integration/player',
    appScopes: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-read'
    ],
};
