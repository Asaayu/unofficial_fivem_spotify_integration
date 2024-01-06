import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useContext, useEffect, useState } from 'react';
import { FaVolumeHigh, FaVolumeLow } from 'react-icons/fa6';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { PeerContext } from '../../providers/PeerManager';

const volumeMarks = [
    {
        scaledValue: 0,
        label: '0%',
    },
    {
        scaledValue: 0.001,
        label: '0.1%',
    },
    {
        scaledValue: 0.002,
        label: '0.2%',
    },
    {
        scaledValue: 0.003,
        label: '0.3%',
    },
    {
        scaledValue: 0.004,
        label: '0.4%',
    },
    {
        scaledValue: 0.005,
        label: '0.5%',
    },
    {
        scaledValue: 0.006,
        label: '0.6%',
    },
    {
        scaledValue: 0.007,
        label: '0.7%',
    },
    {
        scaledValue: 0.008,
        label: '0.8%',
    },
    {
        scaledValue: 0.009,
        label: '0.9%',
    },
    {
        scaledValue: 0.01,
        label: '1%',
    },
    {
        scaledValue: 0.02,
        label: '2%',
    },
    {
        scaledValue: 0.03,
        label: '3%',
    },
    {
        scaledValue: 0.04,
        label: '4%',
    },
    {
        scaledValue: 0.05,
        label: '5%',
    },
    {
        scaledValue: 0.06,
        label: '6%',
    },
    {
        scaledValue: 0.07,
        label: '7%',
    },
    {
        scaledValue: 0.08,
        label: '8%',
    },
    {
        scaledValue: 0.09,
        label: '9%',
    },
    {
        scaledValue: 0.1,
        label: '10%',
    },
    {
        scaledValue: 0.2,
        label: '20%',
    },
    {
        scaledValue: 0.3,
        label: '30%',
    },
    {
        scaledValue: 0.4,
        label: '40%',
    },
    {
        scaledValue: 0.5,
        label: '50%',
    },
    {
        scaledValue: 0.6,
        label: '60%',
    },
    {
        scaledValue: 0.7,
        label: '70%',
    },
    {
        scaledValue: 0.8,
        label: '80%',
    },
    {
        scaledValue: 0.9,
        label: '90%',
    },
    {
        scaledValue: 1,
        label: '100%',
    },
];

const scale = (value: number) => {
    const mark = volumeMarks.find((_, index) => index === value);
    if (!mark) return 0;
    return mark.scaledValue;
};

const unscale = (value: number) => {
    const mark = volumeMarks.find((mark) => value <= mark.scaledValue);
    if (!mark) return 0;
    return volumeMarks.indexOf(mark);
};

export const VolumeSliderScaled = () => {
    const peer = useContext(PeerContext);

    const [value, setValue] = useState(0);
    const [seeking, setSeeking] = useState(false);

    useEffect(() => {
        const updateVolume = async () => {
            if (!peer || !peer.playerData || seeking) return;
            const currentVolume = await peer.player.getVolume();
            const scaledVolume = unscale(currentVolume);
            setValue(scaledVolume);
        };

        updateVolume();
    });

    const handleChange = async (_event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') return;
        setValue(newValue);

        const scaledValue = scale(newValue);
        peer.player?.setVolume(scaledValue);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            width="100%"
            px={1}
            gap={2}
            sx={{ position: 'relative' }}
        >
            <FaVolumeLow size={24} />
            <Slider
                value={value}
                max={volumeMarks.length - 1}
                scale={scale}
                onChange={handleChange}
                onMouseDown={() => setSeeking(true)}
                onMouseUp={() => setSeeking(false)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => volumeMarks[unscale(value)].label}
                disabled={
                    (peer.connection != null && peer.connection.peerConnection.connectionState != 'connected') ||
                    (peer.settings?.vehicleRadio && !peer.playingCustomRadio)
                }
                color="info"
                sx={{
                    mx: 1,
                    flexGrow: 1,
                    '& .MuiSlider-thumb': {
                        transition: 'none',
                    },
                    '& .MuiSlider-track': {
                        transition: 'none',
                    },
                }}
            />
            <FaVolumeHigh size={30} />
            {peer.settings?.vehicleRadio && !peer.playingCustomRadio && (
                <Box
                    position="absolute"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="calc(100% + 0.5rem)"
                    borderRadius={1}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }}
                >
                    <Tooltip
                        title="Disable the Custom Vehicle Radio option in the external web app to control playback volume."
                        placement="top"
                    >
                        <Typography variant="body2" color="inherit" overflow="hidden" width="100%">
                            Volume Muted by Custom Vehicle Radio
                        </Typography>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
};
