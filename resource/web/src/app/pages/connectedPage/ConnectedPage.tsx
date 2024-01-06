import { BRAND } from '@asaayu-base/brand';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useContext, useMemo } from 'react';

import { PlayerControls } from '../../components/playerControls/PlayerControls';
import { PeerContext } from '../../providers/PeerManager';
import { LibraryCard } from '../../components/libraryCard/LibraryCard';

export const ConnectedPage = () => {
    const peer = useContext(PeerContext);

    const connected = useMemo(
        () => peer.connection?.peerConnection.connectionState === 'connected',
        [peer.connection?.peerConnection.connectionState]
    );

    const TopContainer = useMemo(() => {
        return (
            <Container
                maxWidth="sm"
                sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
            >
                <Typography variant="h4">You're all connected!</Typography>
                <Box sx={{ my: 0.5 }} />
                <Typography variant="body2">
                    {BRAND.name} is ready to use, remember to keep the web app open in your browser while you play. If playback doesn't
                    start when using the buttons below, you may need to start playback from the external web app.
                </Typography>
                <Divider sx={{ my: 2 }} flexItem />
            </Container>
        );
    }, []);

    const DividerSaved = useMemo(() => <Divider sx={{ my: 2 }} flexItem />, []);
    const LibraryCardSaved = useMemo(() => <LibraryCard />, []);
    const PlayerControlsSaved = useMemo(() => <PlayerControls />, []);
    const ConnectedContainer = useMemo(() => {
        return (
            <Container
                maxWidth="sm"
                sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
            >
                {PlayerControlsSaved}
                {DividerSaved}
                {LibraryCardSaved}
            </Container>
        );
    }, [DividerSaved, LibraryCardSaved, PlayerControlsSaved]);

    return (
        <>
            {TopContainer}
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', pb: 3, minHeight: 'min-content' }}>
                {connected ? (
                    ConnectedContainer
                ) : (
                    <Box width="100%" my={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <CircularProgress />
                        <Box my={2} />
                        <Typography variant="h6">Loading Data...</Typography>
                    </Box>
                )}
            </Container>
        </>
    );
};
