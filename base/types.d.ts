export interface IPeerRequest {
    id?: string;
    timeout?: number;
    type:
        | 'getPlaylistTracks'
        | 'nextTrack'
        | 'pause'
        | 'previousTrack'
        | 'resume'
        | 'seek'
        | 'setVolume'
        | 'togglePlay'
        | 'setRepeatMode'
        | 'toggleShuffle'
        | 'playPlaylist'
        | 'setRepeat'
        | 'getPlaylists'
        | 'getAlbums'
        | 'playItem'
        | 'setVehicleRadio'
        | 'setPlayingCustomRadio';
    data?: any;
}

export interface IBrand {
    appClientId: string;
    appRedirectUriDev: string;
    appRedirectUriProd: string;
    appScopes: string[];
    baseUrl: string;
    description: string;
    discordUrl: string;
    eulaUrl: string;
    gitHubUrl: string;
    name: string;
    nameTitle: string[];
    peerReconnectSpeed: number;
    peerStatusUrl: string;
    privacyUrl: string;
    updateSpeed: number;
    websiteUrl: string;
}

export interface ISettings {
    externalControl: boolean;

    currentlyPlayingNotification: boolean;
    currentlyPlayingNotificationPosition: string;
    currentlyPlayingNotificationDuration: number;

    vehicleRadio: boolean;
    vehicleRadioPlaylist: string;
}

export interface IPlayer {
    volume: number;
}
