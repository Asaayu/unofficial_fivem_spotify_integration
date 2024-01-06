import { Box, Card, Divider, Typography, AppBar } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { PeerContext } from '../../providers/PeerManager';
import { ExternalLink } from '../../utils/ExternalLink';

type PositionX = 'left' | 'right';
type PositionY = 'top' | 'bottom';

const appBarColor = '#1DB954';
const width = '20rem';
const borderRadius = '0.5rem';

export const Notification = () => {
    const peer = useContext(PeerContext);

    const position = peer.settings?.currentlyPlayingNotificationPosition ?? 'top-right';
    const splits = position.split('-');
    const positionY = splits[0] as PositionY;
    const positionX = splits[1] as PositionX;
    const offsetStart = positionY === 'top' ? '-100%' : '100%';
    const [offset, setOffset] = useState(offsetStart);

    const notificationsEnabled = useMemo(
        () => peer.settings?.currentlyPlayingNotification ?? false,
        [peer.settings?.currentlyPlayingNotification]
    );
    const notificationDuration = useMemo(
        () => peer.settings?.currentlyPlayingNotificationDuration ?? 5,
        [peer.settings?.currentlyPlayingNotificationDuration]
    );

    const trackData = peer.state?.track_window.current_track;
    const trackUrl = useMemo(() => `https://open.spotify.com/${trackData?.type}/${trackData?.id}`, [trackData?.type, trackData?.id]);
    const trackName = useMemo(() => trackData?.name, [trackData?.name]);
    const imageURI = useMemo(
        () => trackData?.album.images.find((image) => image.height === 64)?.url || trackData?.album.images[0]?.url,
        [trackData?.album.images]
    );
    const artistName = useMemo(() => trackData?.artists.map((artist) => artist.name).join(', '), [trackData?.artists]);

    const HeaderAppBar = useMemo(
        () => (
            <AppBar
                position="static"
                enableColorOnDark
                elevation={0}
                sx={{ display: 'flex', justifyContent: 'center', px: 1, py: 0.25, backgroundColor: appBarColor }}
            >
                <Typography variant="h6" color="inherit" textTransform="uppercase" textAlign="center">
                    Currently Playing
                </Typography>
            </AppBar>
        ),
        []
    );

    const TrackArtSaved = useMemo(
        () => (
            <ExternalLink
                href={trackUrl}
                sx={{
                    m: 0,
                    p: 0,
                    transition: 'transform 0.1s ease-in-out',
                    '&:hover': { transform: 'scale(1.1)' },
                }}
            >
                {imageURI ? (
                    <img src={imageURI} alt="Album Art" style={{ display: 'flex', width: 64, height: 64, padding: 0 }} />
                ) : (
                    <Card
                        elevation={4}
                        sx={{
                            display: 'flex',
                            width: 64,
                            height: 64,
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            padding: 0,
                        }}
                        square
                    />
                )}
            </ExternalLink>
        ),
        [trackUrl, imageURI]
    );

    const TrackNameSaved = useMemo(
        () => (
            <ExternalLink href={trackUrl} underline="none" color="inherit" sx={{ m: 0, width: '100%' }}>
                <Typography variant="body1" whiteSpace="nowrap" maxWidth="100%" fontWeight={700} letterSpacing={-0.5}>
                    {trackName}
                </Typography>
            </ExternalLink>
        ),
        [trackUrl, trackName]
    );

    const ArtistNameSaved = useMemo(
        () => (
            <Typography variant="caption" color="textSecondary" whiteSpace="nowrap" maxWidth="100%">
                {artistName}
            </Typography>
        ),
        [artistName]
    );

    const DataSaved = useMemo(
        () => (
            <Card elevation={0} square sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box p={1.5} display="flex" gap={1.5} width="100%" flexGrow={1}>
                    {TrackArtSaved}
                    <Divider orientation="vertical" flexItem />
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-start"
                        flexDirection="column"
                        textAlign="left"
                        flexGrow={1}
                        width="calc(100% - 10rem)"
                    >
                        {TrackNameSaved}
                        {ArtistNameSaved}
                    </Box>
                </Box>
            </Card>
        ),
        [TrackArtSaved, TrackNameSaved, ArtistNameSaved]
    );

    useEffect(() => {
        if (!notificationsEnabled) return;

        setOffset('0%');

        const t = setTimeout(() => {
            setOffset(offsetStart);
        }, notificationDuration * 1000);

        return () => {
            setOffset(offsetStart);
            clearTimeout(t);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackName]);

    if (!notificationsEnabled) return null;

    return (
        <Box
            position="fixed"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={width}
            height="fit-content"
            sx={{
                [positionY]: 0,
                [positionX]: 0,
                zIndex: 9999,
                overflow: 'hidden',
                userSelect: 'none',
                fontWeight: 700,
                borderRadius:
                    position === 'top-left'
                        ? `0 0 ${borderRadius} 0`
                        : position === 'top-right'
                          ? `0 0 0 ${borderRadius}`
                          : position === 'bottom-left'
                            ? `0 ${borderRadius} 0 0`
                            : position === 'bottom-right'
                              ? `${borderRadius} 0 0 0`
                              : '0',
                transform: `translateY(${offset})`,
                transition: 'transform 0.5s ease-in-out',
            }}
        >
            {HeaderAppBar}
            {DataSaved}
        </Box>
    );
};
