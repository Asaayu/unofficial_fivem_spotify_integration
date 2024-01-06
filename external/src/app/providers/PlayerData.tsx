import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PlayerDevice, WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import { BRAND } from '@asaayu-base/brand';

import { SpotifySDKContext } from './SpotifySdk';
import { PeerContext } from './PeerManager';
import { IPeerRequest } from '@asaayu-base/types';
import { Market } from '@spotify/web-api-ts-sdk';
import { SettingsContext } from './SettingsData';

export interface ISpotify {
    ready: boolean;
    setReady: (ready: boolean) => void;
    error: Spotify.Error | null;
    setError: (error: Spotify.Error | null) => void;
    player: Spotify.Player | null;
    setPlayer: (player: Spotify.Player | null) => void;
    device: PlayerDevice | null;
    setDevice: (device: PlayerDevice | null) => void;
    state: Spotify.PlaybackState | null;
    setState: (state: Spotify.PlaybackState | null) => void;
    isPlayerActive: () => boolean;
    playingCustomRadio: boolean;
    market: string;
}

export const PlayerContext = createContext({} as ISpotify);
export const PlayerData = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const peer = useContext(PeerContext);
    const spotify = useContext(SpotifySDKContext);
    const settings = useContext(SettingsContext);

    const [ready, setReady] = useState(false);
    const [error, setError] = useState<Spotify.Error | null>(null);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [device, setDevice] = useState<PlayerDevice | null>(null);
    const [state, setState] = useState<Spotify.PlaybackState | null>(null);
    const [playingCustomRadio, setPlayingCustomRadio] = useState(false);
    const market = 'from_token';

    const getOAuthToken = useCallback(
        async (callback: (token: string) => void) => {
            const accessToken = await spotify.sdk.getAccessToken();
            if (!accessToken) return;

            callback(accessToken.access_token);
        },
        [spotify.sdk]
    );

    const isPlayerActive = () => {
        if (!device) return false;
        if (!state) return false;
        return !!state.playback_id;
    };

    useEffect(() => {
        const i = setInterval(async () => {
            if (!player || !device) return;

            const volume = await player.getVolume();
            if (!volume && volume !== 0) return;

            localStorage.setItem('volume', volume.toString());
        }, BRAND.updateSpeed);

        return () => clearInterval(i);
    }, [player, device]);

    useEffect(() => {
        peer.connection?.send({ type: 'stateUpdate', state });
        peer.connection?.send({
            type: 'settingsUpdate',
            settings: {
                externalControl: settings.externalControl,
                currentlyPlayingNotification: settings.currentlyPlayingNotification,
                currentlyPlayingNotificationPosition: settings.currentlyPlayingNotificationPosition,
                currentlyPlayingNotificationDuration: settings.currentlyPlayingNotificationDuration,
                vehicleRadio: settings.vehicleRadio,
                vehicleRadioPlaylist: settings.vehicleRadioPlaylist,
            },
        });
        setTimeout(async () => {
            const volume = await player?.getVolume();
            peer.connection?.send({ type: 'playerUpdate', player: { volume } });
        });
    }, [state, peer, player, settings]);

    useEffect(() => {
        if (!peer.connection) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        peer.connection?.on('data', async (data: any) => {
            const incomingRequest = data as IPeerRequest;
            if (!incomingRequest.type) return;
            if (!player) return;

            console.debug(`Received request: ${JSON.stringify(incomingRequest)}`);

            switch (incomingRequest.type) {
                case 'togglePlay': {
                    player?.togglePlay();
                    break;
                }

                case 'nextTrack': {
                    player?.nextTrack();
                    break;
                }

                case 'previousTrack': {
                    player?.previousTrack();
                    break;
                }

                case 'seek': {
                    if (incomingRequest.data == null) return;
                    player?.seek(incomingRequest.data);
                    break;
                }

                case 'setVolume': {
                    if (incomingRequest.data == null) return;
                    player?.setVolume(incomingRequest.data);
                    peer.connection?.send({ type: 'playerUpdate', player: { volume: await player?.getVolume() } });
                    break;
                }

                case 'resume': {
                    player?.resume();
                    break;
                }

                case 'pause': {
                    player?.pause();
                    break;
                }

                case 'setRepeatMode': {
                    if (!incomingRequest.data) return;
                    spotify.sdk.player.setRepeatMode(incomingRequest.data);
                    break;
                }

                case 'toggleShuffle': {
                    if (incomingRequest.data == null) return;
                    spotify.sdk.player.togglePlaybackShuffle(incomingRequest.data);
                    break;
                }

                case 'getPlaylistTracks': {
                    if (incomingRequest.data == null) return;
                    const data = incomingRequest.data;
                    const res = await spotify.sdk.playlists.getPlaylistItems(
                        data.playlistId,
                        market as Market,
                        data.fields,
                        data.limit,
                        data.offset
                    );
                    peer.connection?.send({ type: 'playlistTracks', id: incomingRequest.id, data: res });
                    break;
                }

                case 'playPlaylist': {
                    if (incomingRequest.data == null) return;

                    const requestPlaylist = async (incomingRequest: IPeerRequest) => {
                        if (!device?.device_id) {
                            return;
                        }
                        const playlistId = incomingRequest.data;
                        spotify.sdk.makeRequest('PUT', 'me/player/play', {
                            context_uri: `spotify:playlist:${playlistId}`,
                        });
                    };

                    requestPlaylist(incomingRequest);
                    break;
                }

                case 'setRepeat': {
                    if (incomingRequest.data == null) return;
                    spotify.sdk.player.setRepeatMode(incomingRequest.data);
                    break;
                }

                case 'getPlaylists': {
                    if (incomingRequest.data == null) return;
                    const data = incomingRequest.data;
                    const res = await spotify.sdk.currentUser.playlists.playlists(data.limit, data.offset);
                    peer.connection?.send({ type: 'playlists', id: incomingRequest.id, data: res });
                    break;
                }

                case 'getAlbums': {
                    if (incomingRequest.data == null) return;
                    const data = incomingRequest.data;
                    const res = await spotify.sdk.currentUser.albums.savedAlbums(data.limit, data.offset);
                    peer.connection?.send({ type: 'albums', id: incomingRequest.id, data: res });
                    break;
                }

                case 'playItem': {
                    if (incomingRequest.data == null) return;
                    const requestItemPlay = async (incomingRequest: IPeerRequest) => {
                        if (!device?.device_id) {
                            return;
                        }

                        try {
                            const itemId = incomingRequest.data;
                            await spotify.sdk.makeRequest('PUT', 'me/player/play', {
                                context_uri: itemId,
                            });
                            peer.connection?.send({
                                type: 'albums',
                                id: incomingRequest.id,
                                data: {
                                    status: 200,
                                },
                            });
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } catch (e: any) {
                            const errorData = e.toString().split('Body:')[1];
                            const error = JSON.parse(errorData).error;
                            switch (error.status) {
                                case 404:
                                case 403: {
                                    peer.connection?.send({
                                        type: 'albums',
                                        id: incomingRequest.id,
                                        data: error,
                                    });
                                    break;
                                }
                                default: {
                                    console.error(error);
                                    break;
                                }
                            }
                        }
                    };

                    requestItemPlay(incomingRequest);
                    break;
                }

                case 'setVehicleRadio': {
                    if (incomingRequest.data == null) return;
                    settings.setVehicleRadio(incomingRequest.data);
                    break;
                }

                case 'setPlayingCustomRadio': {
                    if (incomingRequest.data == null) return;
                    setPlayingCustomRadio(incomingRequest.data);
                    break;
                }

                default: {
                    console.error(`Unknown request type: ${incomingRequest.type}`);
                    break;
                }
            }
        });
    }, [peer, player, spotify.sdk, device, settings]);

    return (
        <PlayerContext.Provider
            value={{
                ready,
                setReady,
                error,
                setError,
                player,
                setPlayer,
                device,
                setDevice,
                state,
                setState,
                isPlayerActive,
                playingCustomRadio,
                market,
            }}
        >
            <WebPlaybackSDK
                initialDeviceName={BRAND.name}
                getOAuthToken={getOAuthToken}
                initialVolume={Number(localStorage.getItem('volume')) || 0.5}
                connectOnInitialized={false}
            >
                {props.children}
            </WebPlaybackSDK>
        </PlayerContext.Provider>
    );
};
