import { useContext, useEffect, useMemo, useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { PeerContext } from '../../providers/PeerManager';

const msToMinutes = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
};

export const SeekSlider = () => {
    const peer = useContext(PeerContext);
    const [position, setPosition] = useState(-1);
    const [duration, setDuration] = useState(0);

    const updateTime = () => {
        if (peer && peer.state) {
            const { position, duration } = peer.state;
            setPosition(position);
            setDuration(duration);
        }
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 100);
        return () => clearInterval(intervalId);
    }, [peer]); // eslint-disable-line react-hooks/exhaustive-deps

    const SliderComponentSaved = useMemo(
        () => (
            <Slider
                value={position}
                max={duration}
                color="primary"
                sx={{
                    flexGrow: 1,
                    pointerEvents: 'none',
                    color: (theme) => theme.palette.primary.main,
                    '& .MuiSlider-root': {
                        p: 0,
                    },
                    '& .MuiSlider-thumb': {
                        transition: 'none',
                        visibility: 'hidden',
                    },
                    '& .MuiSlider-track': {
                        transition: 'none',
                    },
                }}
            />
        ),
        [position, duration]
    );

    const CurrentPositionSaved = useMemo(() => <code>{msToMinutes(position)}</code>, [position]);
    const DurationSaved = useMemo(() => <code>{msToMinutes(duration)}</code>, [duration]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            width="100%"
            height="fit-content"
            px={2}
            gap={2}
        >
            {CurrentPositionSaved}
            {SliderComponentSaved}
            {DurationSaved}
        </Box>
    );
};
