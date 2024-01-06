import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useContext, useMemo } from 'react';
import { FaSpotify } from 'react-icons/fa6';

import { PlayerContext } from '../../providers/PlayerData';
import { PlayerButtons } from '../playerButtons/PlayerButtons';
import { SeekSlider } from '../seekSlider/SeekSlider';
import { SettingsTooltip } from '../settings/SettingsTooltip';
import { VolumeSliderScaled } from '../volumeSliderScaled/VolumeSliderScaled';

export const PlayerControls = () => {
    const player = useContext(PlayerContext);

    const trackData = player.state?.track_window.current_track;
    const trackName = useMemo(() => {
        return trackData?.name;
    }, [trackData?.name]);
    const artistName = useMemo(() => {
        return trackData?.artists.map((artist) => artist.name).join(', ');
    }, [trackData?.artists]);
    const trackUrl = useMemo(() => {
        return `https://open.spotify.com/${trackData?.type}/${trackData?.id}`;
    }, [trackData?.type, trackData?.id]);
    const imageURI = useMemo(() => {
        return trackData?.album.images.find((image) => image.height === 64)?.url ?? trackData?.album.images[0]?.url;
    }, [trackData?.album.images]);

    const TrackNameSaved = useMemo(() => {
        return (
            <Link href={trackUrl} underline="none" color="inherit" sx={{ m: 0, width: 'fit-content', maxWidth: 'calc(100% - 2.5rem)' }}>
                <SettingsTooltip title={trackName} placement="top" sx={{ width: 'fit-content' }}>
                    <Typography variant="body1" whiteSpace="nowrap" maxWidth="100%" fontWeight={700} letterSpacing={-0.5}>
                        {trackName}
                    </Typography>
                </SettingsTooltip>
            </Link>
        );
    }, [trackName, trackUrl]);

    const ArtistNameSaved = useMemo(() => {
        return (
            <SettingsTooltip title={artistName} placement="bottom">
                <Typography variant="caption" color="textSecondary" whiteSpace="nowrap" maxWidth="calc(100% - 2.5rem)">
                    {artistName}
                </Typography>
            </SettingsTooltip>
        );
    }, [artistName]);

    const SpotifyButtonSaved = useMemo(() => {
        return (
            <Link href={trackUrl} underline="none" color="inherit" sx={{ m: 0, width: '100%' }}>
                <SettingsTooltip title="Open in Spotify" placement="bottom-end">
                    <IconButton
                        color="inherit"
                        sx={{
                            position: 'absolute',
                            right: '-0.5rem',
                            top: '-0.5rem',
                        }}
                    >
                        <FaSpotify size={24} />
                    </IconButton>
                </SettingsTooltip>
            </Link>
        );
    }, [trackUrl]);

    const TrackDataCardSaved = useMemo(() => {
        return (
            <Card elevation={10} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box p={1.5} display="flex" gap={1.5} width="calc(100% - 10rem)" flexGrow={1}>
                    <Link
                        href={trackUrl}
                        sx={{
                            m: 0,
                            p: 0,
                            transition: 'transform 0.1s linear',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        {imageURI ? (
                            <img
                                src={imageURI}
                                alt="Album Art"
                                style={{
                                    display: 'flex',
                                    width: 64,
                                    height: 64,
                                    padding: 0,
                                }}
                            />
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
                    </Link>
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
                        {ArtistNameSaved}
                        {SpotifyButtonSaved}
                    </Box>
                </Box>
            </Card>
        );
    }, [trackUrl, imageURI, TrackNameSaved, ArtistNameSaved, SpotifyButtonSaved]);

    const DividerSaved = useMemo(() => {
        return <Divider sx={{ my: 1 }} />;
    }, []);

    const TitleSaved = useMemo(() => {
        return <Typography variant="h5">Currently Playing</Typography>;
    }, []);

    const PlayerButtonsSaved = useMemo(() => {
        return <PlayerButtons />;
    }, []);

    const SeekSliderSaved = useMemo(() => {
        return <SeekSlider />;
    }, []);

    const VolumeSliderSaved = useMemo(() => {
        return <VolumeSliderScaled />;
    }, []);

    const BoxSaved = useMemo(() => {
        return <Box my={0.25} />;
    }, []);

    const PlayerButtonsGroupSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} mx={2} mt={2}>
                {PlayerButtonsSaved}
                {BoxSaved}
                {SeekSliderSaved}
                {VolumeSliderSaved}
            </Box>
        );
    }, [PlayerButtonsSaved, SeekSliderSaved, VolumeSliderSaved, BoxSaved]);

    return (
        <Card elevation={0} sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box' }}>
            {TitleSaved}
            {DividerSaved}
            {TrackDataCardSaved}
            {PlayerButtonsGroupSaved}
        </Card>
    );
};
