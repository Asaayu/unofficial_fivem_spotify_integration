import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LegalBottom } from './components/legalBottom/LegalBottom';
import { PeerManager } from './providers/PeerManager';
import { PlayerData } from './providers/PlayerData';
import { SettingsData } from './providers/SettingsData';

const EULAPolicyPage = React.lazy(() => import('./pages/eulaPolicyPage/EULAPolicyPage'));
const HomePage = React.lazy(() => import('./pages/homePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/loginPage/LoginPage'));
const NotFoundPage = React.lazy(() => import('./pages/notFoundPage/NotFoundPage'));
const PlayerPage = React.lazy(() => import('./pages/playerPage/PlayerPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/privacyPolicyPage/PrivacyPolicyPage'));
const LogoutPage = React.lazy(() => import('./pages/logoutPage/LogoutPage'));

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

const DataWrapper = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    return (
        <PeerManager>
            <SettingsData>
                <PlayerData>{props.children}</PlayerData>
            </SettingsData>
        </PeerManager>
    );
};

export const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="fit-content"
                minHeight="100vh"
                width="100%"
            >
                <Box flexGrow={1} />
                <Routes>
                    {/* HOME */}
                    <Route path="/" element={<HomePage />} />

                    {/* APP */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route
                        path="/player"
                        element={
                            <DataWrapper>
                                <PlayerPage />
                            </DataWrapper>
                        }
                    />

                    {/* LEGAL */}
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/end-user-license-agreement" element={<EULAPolicyPage />} />

                    {/* NOT FOUND */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Box flexGrow={1} />
                <LegalBottom />
            </Box>
        </Suspense>
    );
};
