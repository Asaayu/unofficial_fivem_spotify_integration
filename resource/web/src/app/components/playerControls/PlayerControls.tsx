import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useContext, useMemo } from 'react';
import { FaSpotify } from 'react-icons/fa6';

import { PeerContext } from '../../providers/PeerManager';
import { ExternalLink } from '../../utils/ExternalLink';
import { SeekSlider } from '../seekSlider/SeekSlider';

export const PlayerControls = () => {
    const peer = useContext(PeerContext);

    const trackData = peer.state?.track_window.current_track;
    const trackUrl = useMemo(() => `https://open.spotify.com/${trackData?.type}/${trackData?.id}`, [trackData?.type, trackData?.id]);
    const trackName = useMemo(() => trackData?.name, [trackData?.name]);
    const imageURI = useMemo(
        () => trackData?.album.images.find((image) => image.height === 64)?.url || trackData?.album.images[0]?.url,
        [trackData?.album.images]
    );
    const artistName = useMemo(() => trackData?.artists.map((artist) => artist.name).join(', '), [trackData?.artists]);

    const TrackArtSaved = useMemo(
        () => (
            <ExternalLink
                href={trackUrl}
                sx={{ m: 0, p: 0, transition: 'transform 0.1s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
            >
                {imageURI ? (
                    <img
                        src={imageURI}
                        alt="Album Art"
                        style={{ display: 'flex', width: '100%', height: '100%', padding: 0, flexGrow: 1 }}
                    />
                ) : (
                    <Card
                        elevation={4}
                        sx={{ display: 'flex', width: '100%', height: '100%', border: '1px solid rgba(255, 255, 255, 0.25)', padding: 0 }}
                        square
                    />
                )}
            </ExternalLink>
        ),
        [trackUrl, imageURI]
    );

    const TrackNameSaved = useMemo(
        () => (
            <ExternalLink
                href={trackUrl}
                underline="none"
                color="inherit"
                sx={{ m: 0, width: 'fit-content', maxWidth: 'calc(100% - 2rem)' }}
            >
                <Tooltip title={trackName} placement="top">
                    <Typography variant="body1" whiteSpace="nowrap" maxWidth="100%" fontWeight={700} letterSpacing={-0.5}>
                        {trackName}
                    </Typography>
                </Tooltip>
            </ExternalLink>
        ),
        [trackUrl, trackName]
    );

    const TrackArtistSaved = useMemo(
        () => (
            <Tooltip title={artistName} placement="bottom">
                <Typography variant="caption" color="textSecondary" whiteSpace="nowrap" maxWidth="100%">
                    {artistName}
                </Typography>
            </Tooltip>
        ),
        [artistName]
    );

    const SpotifyLinkSaved = useMemo(
        () => (
            <ExternalLink href={trackUrl} underline="none" color="inherit" sx={{ m: 0, width: '100%' }}>
                <Tooltip title="Open in Spotify" placement="top-end">
                    <IconButton color="inherit" sx={{ position: 'absolute', right: '-0.5rem', top: '-0.5rem' }}>
                        <FaSpotify size={24} />
                    </IconButton>
                </Tooltip>
            </ExternalLink>
        ),
        [trackUrl]
    );

    const PlayerCardSaved = useMemo(
        () => (
            <Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Box p={2} pb={0} display="flex" gap={1.5} width="100%" flexGrow={1}>
                    {TrackArtSaved}
                    <Divider orientation="vertical" flexItem />
                    <Box
                        display="flex"
                        position="relative"
                        justifyContent="center"
                        alignItems="flex-start"
                        flexDirection="column"
                        textAlign="left"
                        flexGrow={1}
                        width="calc(100% - 10rem)"
                    >
                        {TrackNameSaved}
                        {TrackArtistSaved}
                        {SpotifyLinkSaved}
                    </Box>
                </Box>
                <SeekSlider />
            </Card>
        ),
        [TrackArtSaved, TrackNameSaved, TrackArtistSaved, SpotifyLinkSaved]
    );

    return PlayerCardSaved;
};
