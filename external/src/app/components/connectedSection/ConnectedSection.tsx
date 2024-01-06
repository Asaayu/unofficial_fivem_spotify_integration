import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../../providers/PlayerData';
import { SpotifySDKContext } from '../../providers/SpotifySdk';
import { ConnectedFeedback } from '../connectedFeedback/ConnectedFeedback';
import { PlayerControls } from '../playerControls/PlayerControls';
import { GeneralSettings } from '../settings/general/GeneralSettings';
import { NotificationSettings } from '../settings/notification/NotificationSettings';
import { RadioSettings } from '../settings/radio/RadioSettings';
import { WebPlayerHandler } from '../webPlayerHandler/WebPlayerHandler';

export const ConnectedSection = () => {
    const player = useContext(PlayerContext);
    const spotify = useContext(SpotifySDKContext);

    const navigate = useNavigate();

    const FeedbackSaved = useMemo(() => {
        return (
            <Grid container columnSpacing={1} justifyContent="space-between">
                <ConnectedFeedback />
            </Grid>
        );
    }, []);

    const DividerSaved = useMemo(() => {
        return <Divider variant="middle" flexItem sx={{ width: '65%', mx: 'auto', my: 1 }} />;
    }, []);

    const LogoutSaved = useMemo(() => {
        return (
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%" mt={1}>
                <Box flexGrow={1} />
                <Button
                    variant="text"
                    onClick={() => {
                        player.player?.disconnect();
                        navigate('/logout');
                    }}
                    sx={{ mt: 1 }}
                >
                    Logout
                </Button>
            </Box>
        );
    }, [navigate, player.player]);

    useEffect(() => {
        async function load() {
            if (!player.ready) return;
            if (!player.device) return;

            // Check the user is authenticated
            const accessToken = await spotify.sdk.getAccessToken();
            if (!accessToken) return;

            // Check that the player is not already active
            const deviceId = player.device?.device_id;
            if (!deviceId) return;

            // Check if the user is blocked from using the app
            const profileData = await spotify.sdk.currentUser.profile();
            const userId = profileData.id;

            const blocked = await spotify.checkBlocklist(userId);
            if (blocked) {
                navigate('/logout');
                alert('Your access to this app has been blocked. Please contact the developer for more information.');
                return;
            }

            spotify.sdk?.player.transferPlayback([deviceId]);
        }

        load();
    }, [player.device, player.ready, spotify, spotify.sdk, navigate]);

    // Call authenticate every five seconds to refresh the access token
    useEffect(() => {
        const interval = setInterval(async () => {
            const accessToken = await spotify.sdk.getAccessToken();
            if (!accessToken) {
                navigate('/login');
                return;
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [spotify.sdk, navigate]);

    const SettingsSaved = useMemo(() => {
        return (
            <Grid container spacing={2} justifyContent="center" textAlign="center" my={0} width="100%">
                <Grid item xs={11}>
                    <PlayerControls />
                </Grid>
                <Grid item xs={11}>
                    <GeneralSettings />
                </Grid>
                <Grid item xs={11}>
                    <NotificationSettings />
                </Grid>
                <Grid item xs={11}>
                    <RadioSettings />
                </Grid>
            </Grid>
        );
    }, []);

    const LabelSaved = useMemo(() => {
        return (
            <Typography variant="body1" textAlign="center" color="error" letterSpacing={0.5} px={10}>
                Do not close this page, keep it open in the background and return to FiveM.
            </Typography>
        );
    }, []);

    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" width="100%">
            {FeedbackSaved}
            {DividerSaved}
            {LabelSaved}
            {DividerSaved}
            {player.isPlayerActive() && SettingsSaved}
            {LogoutSaved}
            <WebPlayerHandler />
        </Box>
    );
};
