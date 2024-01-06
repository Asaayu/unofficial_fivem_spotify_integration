import { useContext, useEffect, useState, useMemo } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import { PeerContext } from '../../providers/PeerManager';
import { PlayerContext } from '../../providers/PlayerData';

const msToMinutes = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
};

export const SeekSlider = () => {
    const player = useContext(PlayerContext);
    const peer = useContext(PeerContext);

    const [position, setPosition] = useState(-1);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [seekingPosition, setSeekingPosition] = useState(-1);
    const [lastSeek, setLastSeek] = useState(0);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        const value = newValue as number;
        setSeekingPosition(value);
    };

    const durationSaved = useMemo(() => {
        return player.state?.duration || 0;
    }, [player.state?.duration]);

    const positionSaved = useMemo(() => {
        return player.state?.position || 0;
    }, [player.state?.position]);

    useEffect(() => {
        if (lastSeek > Date.now() - 1000) return;
        setDuration(durationSaved);
        setPosition(positionSaved);
    }, [durationSaved, positionSaved, lastSeek]);

    useEffect(() => {
        if (!player.player || seekingPosition <= 0 || seeking) return;
        player.player.seek(seekingPosition);
        setPosition(seekingPosition);
    }, [seeking, seekingPosition, player.player]);

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" width="100%" px={1} gap={2}>
                <code>{seeking ? msToMinutes(seekingPosition) : msToMinutes(position)}</code>
                <Slider
                    value={seeking ? seekingPosition : position}
                    max={duration}
                    onChange={handleChange}
                    onMouseDown={() => setSeeking(true)}
                    onMouseUp={() => {
                        setSeeking(false);
                        setLastSeek(Date.now());
                    }}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState !== 'connected'}
                    color="primary"
                    sx={{
                        mx: 0.5,
                        flexGrow: 1,
                        '& .MuiSlider-thumb': {
                            transition: 'none',
                        },
                        '& .MuiSlider-track': {
                            transition: 'none',
                        },
                    }}
                />
                <code>{msToMinutes(duration)}</code>
            </Box>
        </>
    );
};
