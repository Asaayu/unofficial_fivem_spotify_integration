import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Devices } from '@spotify/web-api-ts-sdk';
import { BRAND } from '@asaayu-base/brand';

import { CardBottom } from '../../components/cardBottom/CardBottom';
import { ConnectedSection } from '../../components/connectedSection/ConnectedSection';
import { DuplicateSection } from '../../components/duplicateSection/DuplicateSection';
import { ErrorSection } from '../../components/errorSection/ErrorSection';
import { TitleBar } from '../../components/titleBar/TitleBar';
import { PeerContext } from '../../providers/PeerManager';
import { PlayerContext } from '../../providers/PlayerData';
import { SpotifySDKContext } from '../../providers/SpotifySdk';
import isDev from '../../utils/isDev';

export default function PlayerPage() {
    const spotify = useContext(SpotifySDKContext);
    const player = useContext(PlayerContext);
    const peer = useContext(PeerContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [duplicate, setDuplicate] = useState(false);
    const [devices, setDevices] = useState<Devices | null>(null);

    const [error, setError] = useState<{ type: string; message: string } | null>(null);

    const TitleBarSaved = useMemo(() => {
        return <TitleBar noLink />;
    }, []);

    const DividerSaved = useMemo(() => {
        return <Divider variant="middle" flexItem sx={{ width: '65%', mx: 'auto', my: 1 }} />;
    }, []);

    const CardBottomSaved = useMemo(() => {
        return <CardBottom />;
    }, []);

    const CardDataSaved = useMemo(() => {
        return (
            <Box
                position="relative"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                gap={1}
                my={2}
                minHeight="10rem"
            >
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <CircularProgress />
                        <p>Waiting for Spotify Authorization...</p>
                    </Box>
                ) : duplicate ? (
                    <DuplicateSection />
                ) : error ? (
                    <ErrorSection error={error} />
                ) : (
                    <ConnectedSection />
                )}
            </Box>
        );
    }, [duplicate, error, loading]);

    useEffect(() => {
        // Hopefully help fix the issue where the player doesn't activate on click
        window.addEventListener('click', () => {
            player.player?.activateElement();
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window]);

    useEffect(() => {
        async function load() {
            const hasPassedLoginPage = localStorage.getItem('hasPassedLoginPage');
            if (hasPassedLoginPage !== 'true' || searchParams.get('error') === 'access_denied') {
                localStorage.removeItem('hasPassedLoginPage');
                navigate('/login');
                return;
            }

            const authenticated = await spotify.sdk.authenticate();
            if (!authenticated.authenticated) {
                localStorage.removeItem('hasPassedLoginPage');
                navigate('/login');
                return;
            }

            const availableDevices = devices || (await spotify.sdk.player.getAvailableDevices());
            setDevices(availableDevices);

            availableDevices.devices.every((device) => {
                const duplicate = device.name === BRAND.name && device.id !== player.device?.device_id && !isDev();
                setDuplicate(duplicate);
                return !duplicate; // Return false to break the loop
            });

            setLoading(false);
        }

        load();
    });

    useEffect(() => {
        const error = player.error as { type: string; message: string };
        if (!error) return;

        setError(error);
    }, [player.error]);

    useEffect(() => {
        peer.setConnect(!loading && !duplicate && !error);
    }, [peer, loading, duplicate, error]);

    return (
        <>
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }}>
                <Paper
                    elevation={2}
                    sx={{ width: '100%', maxWidth: '35rem', borderRadius: '0.75rem', overflow: 'hidden', px: 4, pt: 2, my: 3 }}
                >
                    {TitleBarSaved}
                    {DividerSaved}
                    {CardDataSaved}
                    {DividerSaved}
                    {CardBottomSaved}
                </Paper>
            </Container>
        </>
    );
}
