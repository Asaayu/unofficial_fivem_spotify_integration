import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Suspense, useContext, useEffect, useMemo, useState } from 'react';

import { debugData } from '../app/utils/debugData';
import { HeaderTop } from './components/headerTop/HeaderTop';
import { LegalBottom } from './components/legalBottom/LegalBottom';
import { ConnectedPage } from './pages/connectedPage/ConnectedPage';
import { HomePage } from './pages/homePage/HomePage';
import { PeerContext } from './providers/PeerManager';

// This will set the NUI to visible if we are
// developing in browser
debugData([
    {
        action: 'setVisible',
        data: true,
    },
]);

const Loading = () => {
    return (
        <Paper elevation={0} sx={{ height: '100vh', width: '100vw', borderRadius: 0 }}>
            <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ height: '100vh' }}>
                <CircularProgress color="inherit" disableShrink />
                <Typography variant="h6" textAlign="center" mt={2} ml={0.5}>
                    Loading Data...
                </Typography>
            </Grid>
        </Paper>
    );
};

const App = () => {
    const peer = useContext(PeerContext);

    const [connected, setConnected] = useState(false);

    const HeaderTopSaved = useMemo(() => <HeaderTop />, []);
    const LegalBottomSaved = useMemo(() => <LegalBottom />, []);

    const MainDataSaved = useMemo(() => {
        return (
            <Container
                maxWidth="md"
                sx={{
                    height: '100%',
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    userSelect: 'none',
                    py: 2,
                }}
            >
                {HeaderTopSaved}
                <Paper
                    elevation={1}
                    sx={{ height: 'fit-content', maxHeight: '75%', overflow: 'auto', width: '100%', position: 'relative', p: 2 }}
                    square
                >
                    <Suspense fallback={<Loading />}>{connected ? <ConnectedPage /> : <HomePage />}</Suspense>
                </Paper>
                {LegalBottomSaved}
            </Container>
        );
    }, [HeaderTopSaved, LegalBottomSaved, connected]);

    useEffect(() => {
        setConnected(!!peer.connection && peer.connection.peerConnection.connectionState === 'connected');
    }, [peer.connection, peer.connection?.peerConnection.connectionState]);

    return MainDataSaved;
};

export default App;
