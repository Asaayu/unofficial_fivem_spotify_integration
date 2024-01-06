import { BRAND } from '@asaayu-base/brand';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Fragment, useContext, useMemo } from 'react';

import { IPeer, PeerContext } from '../../providers/PeerManager';
import { ISpotify, PlayerContext } from '../../providers/PlayerData';
import { ThemeContext } from '../../providers/Theme';

type UserFeedbackSection = {
    name: string;
    description: JSX.Element;
    condition: (player: ISpotify, peer: IPeer) => boolean | number;
    states?: {
        positive: string;
        negative: string;
    };
    results?: JSX.Element[];
};

const userFeedbackSections: UserFeedbackSection[] = [
    {
        name: 'SDK Script',
        description: (
            <Box sx={{ userSelect: 'none' }}>
                <Typography variant="h6">SDK Script</Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="caption">
                    The Spotify Web Playback SDK script, if it fails to load, make sure{' '}
                    <code style={{ whiteSpace: 'nowrap', backgroundColor: '#2d2d2d', paddingInline: 5, paddingBlock: 2, borderRadius: 5 }}>
                        sdk.scdn.co/spotify-player.js
                    </code>{' '}
                    is not blocked by an adblocker, firewall, or VPN.
                </Typography>
            </Box>
        ),
        condition: (player: ISpotify) => player.player != null,
        states: {
            positive: 'Loaded',
            negative: 'Not Loaded',
        },
    },
    {
        name: 'Web Player',
        description: (
            <Box sx={{ userSelect: 'none' }}>
                <Typography variant="h6">Web Player</Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="caption">
                    The Spotify Web Player, if it fails to connect, ensure you have authorized this software with Spotify, and try
                    refreshing the page. If it still fails to connect, check the console for errors.
                </Typography>
            </Box>
        ),
        condition: (player: ISpotify) => player.device != null,
        states: {
            positive: 'Connected',
            negative: 'Not Connected',
        },
    },
    {
        name: 'Device Status',
        description: (
            <Box sx={{ userSelect: 'none' }}>
                <Typography variant="h6">Device Status</Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="caption">
                    The Web Player device status, if it is not active, open Spotify on your device and connect to{' '}
                    <code style={{ whiteSpace: 'nowrap', backgroundColor: '#2d2d2d', paddingInline: 5, paddingBlock: 2, borderRadius: 5 }}>
                        {BRAND.name}
                    </code>{' '}
                    using Spotify Connect.
                </Typography>
            </Box>
        ),
        condition: (player: ISpotify) => player.isPlayerActive(),
        states: {
            positive: 'Active',
            negative: 'Not Active',
        },
    },
    {
        name: 'FiveM Connection',
        description: (
            <Box sx={{ userSelect: 'none' }}>
                <Typography variant="h6">FiveM Connection</Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="caption">
                    The connection between FiveM and the Web Player, if it is not connected, ensure FiveM is running, the {BRAND.name}{' '}
                    resource is running, and this page is open on the same computer as FiveM.
                </Typography>
            </Box>
        ),
        condition: (_: ISpotify, peer: IPeer) => {
            switch (true) {
                case peer.connection?.peerConnection?.iceConnectionState === 'connected':
                    return 0;
                case peer.reconnecting:
                    return 1;
                default:
                    return 2;
            }
        },
        results: [
            <Typography variant="h6" color="primary.main" textTransform="uppercase">
                Connected
            </Typography>,
            <Typography variant="h6" color="info.main" textTransform="uppercase">
                Attempting to Connect
            </Typography>,
            <Typography variant="h6" color="error.main" textTransform="uppercase">
                Not Connected
            </Typography>,
        ],
    },
];

const HtmlTooltip = (props: TooltipProps) => {
    const theme = useContext(ThemeContext);

    return (
        <Tooltip
            {...props}
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: theme.theme.palette.background.paper,
                        border: '2px solid #555',
                        borderRadius: 2,
                        boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.5)',
                        width: 'fit-content',
                        '& .MuiTooltip-arrow': {
                            color: '#555',
                        },
                    },
                },
            }}
        >
            {props.children}
        </Tooltip>
    );
};

const StatusText = (text: string, type: 'positive' | 'negative') => {
    return (
        <Typography variant="h6" color={type === 'positive' ? 'primary.main' : 'error.main'} whiteSpace="nowrap" textTransform="uppercase">
            {text}
        </Typography>
    );
};

export const ConnectedFeedback = () => {
    const player = useContext(PlayerContext);
    const peer = useContext(PeerContext);

    const feedbackElements = useMemo(() => {
        if (!player || !peer) return null;

        return userFeedbackSections.map((section, index) => (
            <Fragment key={section.name}>
                <Grid item xs={6} display="flex">
                    <Box flexGrow={1} />
                    <HtmlTooltip title={section.description} placement="top" arrow>
                        <Typography variant="h6" textAlign="right" whiteSpace="nowrap">
                            {section.name}:
                        </Typography>
                    </HtmlTooltip>
                </Grid>
                <Grid item xs={6} textAlign="left">
                    {section.results
                        ? section.results[Number(section.condition(player, peer))]
                        : section.states &&
                          (section.condition(player, peer)
                              ? StatusText(section.states.positive, 'positive')
                              : StatusText(section.states.negative, 'negative'))}
                </Grid>
                {index < userFeedbackSections.length - 1 && <Grid item xs={12} />}
            </Fragment>
        ));
    }, [player, peer]);

    return feedbackElements;
};
