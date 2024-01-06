import { BRAND } from '@asaayu-base/brand';
import { IPeerRequest, IPlayer, ISettings } from '@asaayu-base/types';
import { sha256 } from 'crypto-hash';
import { DataConnection, Peer } from 'peerjs';
import { createContext, useEffect, useState } from 'react';

import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';

export interface IPeer {
    connection: DataConnection | null;
    sendRequest: (inputData: IPeerRequest) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    state: Spotify.PlaybackState | null;
    setState: (state: Spotify.PlaybackState) => void;
    player: Spotify.Player;
    playerData: IPlayer | null;
    setPlayerData: (playerData: IPlayer) => void;
    settings: ISettings | null;
    setSettings: (settings: ISettings) => void;
    playingCustomRadio: boolean;
    setPlayingCustomRadio: (playing: boolean) => void;
}

interface PeerStateUpdate {
    type: 'stateUpdate';
    state: Spotify.PlaybackState;
}

interface PeerSettingsUpdate {
    type: 'settingsUpdate';
    settings: ISettings;
}

interface PeerPlayerUpdate {
    type: 'playerUpdate';
    player: IPlayer;
}

interface PeerRequestResponse {
    id?: string;
    type: string;
    data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

type PeerUpdate = PeerStateUpdate | PeerSettingsUpdate | PeerPlayerUpdate | PeerRequestResponse;

export const PeerContext = createContext({} as IPeer);
export const PeerManager = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const [ip, setIp] = useState<string | null>(null);
    const [connection, setConnection] = useState<DataConnection | null>(null);
    const [state, setState] = useState<Spotify.PlaybackState | null>(null);
    const [settings, setSettings] = useState<ISettings | null>(null);
    const [playerData, setPlayerData] = useState<IPlayer | null>(null);
    const [playingCustomRadio, setPlayingCustomRadio] = useState<boolean>(false);

    // Mock the spotify player to work with the peer manager
    const player: Spotify.Player = {
        _options: {
            getOAuthToken: () => {},
            id: '',
            name: '',
            volume: 0,
        },
        on: () => {},
        activateElement: () => {
            return new Promise((resolve) => {
                resolve();
            });
        },
        addListener: () => {},
        removeListener: () => {},
        disconnect: () => {},
        setName: () => {
            return new Promise((resolve) => {
                resolve();
            });
        },
        connect: () => {
            return new Promise((resolve) => {
                resolve(false);
            });
        },
        getCurrentState: () => {
            return new Promise((resolve) => {
                resolve(state);
            });
        },
        getVolume: () => {
            return new Promise((resolve, reject) => {
                if (!playerData) {
                    reject('No player data');
                    return;
                }
                resolve(playerData.volume);
            });
        },
        nextTrack: () => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'nextTrack' })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        pause: () => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'pause' })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        previousTrack: () => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'previousTrack' })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        resume: () => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'resume' })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        seek: (position: number) => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'seek', data: position })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        setVolume: (volume: number) => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'setVolume', data: volume })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        togglePlay: () => {
            return new Promise((resolve, reject) => {
                sendRequest({ type: 'togglePlay' })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    };

    const handleIncomingData = (peerData: PeerUpdate) => {
        if ('id' in peerData && peerData.id) return;

        switch (peerData.type) {
            case 'stateUpdate':
                if (!('state' in peerData)) return;
                if (peerData.state === undefined) return;
                setState(peerData.state);
                fetchNui('setSpotifyStateData', peerData.state, {});
                break;

            case 'settingsUpdate':
                if (!('settings' in peerData)) return;
                if (peerData.settings === undefined) return;
                setSettings(peerData.settings);
                fetchNui('setSpotifySettingsData', peerData.settings, {});
                break;

            case 'playerUpdate':
                if (!('player' in peerData)) return;
                if (peerData.player === undefined) return;
                setPlayerData(peerData.player);
                fetchNui('setSpotifyPlayerData', peerData.player, {});
                break;

            default:
                console.warn('Unknown peer data received!');
                console.warn(JSON.stringify(peerData, null, 2));
                break;
        }
    };

    const sendRequest = (inputData: IPeerRequest) => {
        return new Promise((resolve, reject) => {
            if (!connection) {
                reject('No connection to peer');
                return;
            }

            if (connection.peerConnection.connectionState !== 'connected') {
                reject('Peer connection is not open');
                return;
            }

            // Add a listener for the response
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            connection.on('data', (resultData: any) => {
                if (!resultData.id || resultData.id !== inputData.id) return;
                resolve(resultData.data);
            });

            // Send the request
            connection.send(inputData);

            // Skip the timeout if no id is provided - this is a one-way request
            if (!inputData.id) {
                resolve(undefined);
                return;
            }

            // Reject the promise if the request times out
            setTimeout(() => {
                reject(`Request timed out after ${inputData.timeout ?? 10000}ms - ${JSON.stringify(inputData)}`);
            }, inputData.timeout ?? 10000);
        });
    };

    const updateRadioState = () => {
        if (!connection || !playerData || !state) return;
        sendRequest({ type: 'setPlayingCustomRadio', data: playingCustomRadio });
    };

    useNuiEvent('userRadioStart', async () => {
        if (!settings) return;
        if (!settings.vehicleRadio) return;

        const volume = await player.getVolume();
        if (volume > 0) return;

        const savedVolume = Number(localStorage.getItem('volume') ?? volume.toString());
        player.setVolume(savedVolume);
        setPlayingCustomRadio(true);
        fetchNui('setSpotifyCustomRadioPlayingData', true, {});
    });

    useNuiEvent('userRadioStop', async () => {
        if (!settings) return;
        if (!settings.vehicleRadio) return;
        if (state?.paused) return;

        const volume = await player.getVolume();
        if (volume <= 0) return;

        localStorage.setItem('volume', volume.toString());
        player.setVolume(0);
        setPlayingCustomRadio(false);
        fetchNui('setSpotifyCustomRadioPlayingData', false, {});
    });

    useNuiEvent('command', (command: string) => {
        switch (command) {
            case 'resume': {
                player.resume();
                fetchNui('notification', 'Playback has been resumed.');
                break;
            }

            case 'pause': {
                player.pause();
                fetchNui('notification', 'Playback has been paused.');
                break;
            }

            case 'next': {
                player.nextTrack();
                fetchNui('notification', 'Skipped to next track.');
                break;
            }

            case 'previous': {
                player.previousTrack();
                fetchNui('notification', 'Skipped to previous track.');
                break;
            }

            default: {
                fetchNui('notification', 'Unknown command.');
                return;
            }
        }
    });

    useNuiEvent('export', (command: string) => {
        if (settings?.externalControl) return;

        switch (command) {
            case 'resume': {
                player.resume();
                break;
            }

            case 'pause': {
                player.pause();
                break;
            }

            case 'next': {
                player.nextTrack();
                break;
            }

            case 'previous': {
                player.previousTrack();
                break;
            }

            default: {
                return;
            }
        }
    });

    useEffect(() => {
        if (!state) return;
        const trackData = state?.track_window.current_track;
        if (!trackData) return;
        fetchNui(
            'setCurrentSongData',
            {
                artist: trackData.artists.map((artist) => artist.name).join(', '),
                title: trackData.name,
            },
            true
        );
    }, [state]);

    useEffect(() => {
        const load = async () => {
            if (ip) return;

            const res = await fetch('https://api.ipify.org/?format=json');
            const json = await res.json();
            const ipHash = await sha256(json.ip);
            setIp(ipHash);
        };

        load();
    }, [ip]);

    useEffect(() => {
        if (!ip) return;

        const peer = new Peer(`spotify-game-${ip}`);
        peer.on('connection', (connection) => {
            setConnection(connection);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            connection.on('data', (peerData: any) => handleIncomingData(peerData));
            connection.on('close', () => {
                setConnection(null);
            });
        });

        return () => {
            peer.destroy();
        };
    }, [ip]);

    useEffect(() => {
        updateRadioState();
        const i = setInterval(() => updateRadioState(), BRAND.updateSpeed);

        return () => clearInterval(i);
    });

    return (
        <PeerContext.Provider
            value={{
                connection,
                sendRequest,
                state,
                setState,
                player,
                playerData,
                setPlayerData,
                settings,
                setSettings,
                playingCustomRadio,
                setPlayingCustomRadio,
            }}
        >
            {props.children}
        </PeerContext.Provider>
    );
};
