import { useContext, useEffect } from 'react';
import { useErrorState, usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from 'react-spotify-web-playback-sdk';
import { BRAND } from '@asaayu-base/brand';

import { PlayerContext } from '../../providers/PlayerData';

export const WebPlayerHandler = () => {
    const player = useContext(PlayerContext);

    const webPlayerReady = useWebPlaybackSDKReady();
    const webPlayerError = useErrorState();
    const webPlayerPlayer = useSpotifyPlayer();
    const webPlayerDevice = usePlayerDevice();
    const webPlayerState = usePlaybackState(true, BRAND.updateSpeed);

    useEffect(() => player.setReady(webPlayerReady), [player, webPlayerReady]);
    useEffect(() => player.setError(webPlayerError), [player, webPlayerError]);
    useEffect(() => player.setPlayer(webPlayerPlayer), [player, webPlayerPlayer]);
    useEffect(() => player.setDevice(webPlayerDevice), [player, webPlayerDevice]);
    useEffect(() => player.setState(webPlayerState), [player, webPlayerState]);

    useEffect(() => {
        async function load() {
            if (!webPlayerPlayer) return;
            await webPlayerPlayer.connect();
        }

        load();

        return () => {
            if (!webPlayerPlayer) return;
            webPlayerPlayer.disconnect();
        };
    }, [webPlayerPlayer]);

    return <></>;
};
