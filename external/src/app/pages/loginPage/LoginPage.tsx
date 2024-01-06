import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card, Checkbox, Link } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardBottom } from '../../components/cardBottom/CardBottom';
import { TitleBar } from '../../components/titleBar/TitleBar';
import { SpotifySDKContext } from '../../providers/SpotifySdk';
import { UserContext } from '../../providers/UserData';

const importantInformation = [
    <>This software is not approved, sponsored, nor endorsed by Spotify USA, Inc, Spotify AB, or Rockstar Games.</>,
    <>
        This software requires a<Link href="https://www.spotify.com/premium/">Spotify Premium</Link>subscription.
    </>,
    <>
        The use of this software is restricted by the
        <Link href="https://www.spotify.com/legal/end-user-agreement/">End-User License Agreement</Link>.
    </>,
    <>
        Information collected and used by this software is subject to the
        <Link href="https://www.spotify.com/legal/privacy-policy/">Privacy Policy</Link>.
    </>,
    <>
        You can revoke access to your Spotify account at any time by going to
        <Link href="https://www.spotify.com/account/apps/">spotify.com/account/apps</Link>.
    </>,
];

export interface ISettingsData {
    externalControl: boolean;

    currentlyPlayingNotification: boolean;
    currentlyPlayingNotificationPosition: string;
    currentlyPlayingNotificationDuration: number;

    vehicleRadio: boolean;
    vehicleRadioPause: boolean;
    vehicleRadioPlaylist: string;
}

export default function LoginPage() {
    const user = useContext(UserContext);
    const spotify = useContext(SpotifySDKContext);

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [checkboxOne, setCheckboxOne] = useState(false);
    const [checkboxTwo, setCheckboxTwo] = useState(false);
    const [showLegalUpdatedAlert, setShowLegalUpdatedAlert] = useState(false);

    useEffect(() => {
        const load = async () => {
            // Check if the user needs to accept the legal information
            const legalUser = user.lastLegalVersionAccepted;
            const legalLocal = user.currentLegalVersion;
            const needsToAcceptLegal = legalUser !== '' && legalUser !== legalLocal;
            setShowLegalUpdatedAlert(needsToAcceptLegal);
            if (needsToAcceptLegal) {
                setLoaded(true);
                return;
            }

            // Check if the user hasn't passed the login page
            const hasPassedLoginPage = localStorage.getItem('hasPassedLoginPage');
            if (hasPassedLoginPage !== 'true') {
                setLoaded(true);
                return;
            }

            // Check if the user is already authorized
            const authorized = await spotify.sdk.getAccessToken();
            if (!authorized) {
                setLoaded(true);
                return;
            }

            // Navigate to the player page
            localStorage.setItem('hasPassedLoginPage', 'true');
            navigate('/player');
        };

        load();
    });

    // Don't render the page until the users authorization status is known
    if (!loaded) return null;

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }} maxWidth="lg">
                <Paper
                    elevation={2}
                    sx={{ width: 'fit-content', maxWidth: '35rem', borderRadius: '0.75rem', overflow: 'hidden', px: 4, pt: 2, my: 3 }}
                >
                    <TitleBar />
                    <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                        <Typography variant="body2">
                            Before authorizing this software, please make sure you are familiar with the following important information:
                        </Typography>
                        <Box sx={{ my: 1 }} />
                        <Card elevation={0} sx={{ p: 2, width: '85%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {importantInformation.map((info, index) => (
                                    <Fragment key={index}>
                                        <Typography variant="caption">{info}</Typography>
                                        {index < importantInformation.length - 1 && <Divider />}
                                    </Fragment>
                                ))}
                            </Box>
                        </Card>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mx: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, my: 1 }}>
                            <Checkbox required value={checkboxOne} onChange={() => setCheckboxOne(!checkboxOne)} />
                            <Typography variant="body2" textAlign="left">
                                I have read through the above and understand the important information regarding this software.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, my: 1 }}>
                            <Checkbox required value={checkboxTwo} onChange={() => setCheckboxTwo(!checkboxTwo)} />
                            <Typography variant="body2" textAlign="left" flexGrow={1}>
                                I have read and agree to the
                                <Link href="" sx={{ whiteSpace: 'nowrap', textUnderlineOffset: '0.25rem' }}>
                                    End-User License Agreement
                                </Link>
                                <br />
                                and
                                <Link href="" sx={{ whiteSpace: 'nowrap', textUnderlineOffset: '0.25rem' }}>
                                    Privacy Policy
                                </Link>
                                .
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                        <Button
                            size="large"
                            onClick={async () => {
                                const result = await spotify.startUserLoginProcess();
                                if (result) {
                                    localStorage.setItem('hasPassedLoginPage', 'true');
                                    navigate('/player');
                                }
                            }}
                            disabled={!checkboxOne || !checkboxTwo}
                            sx={{
                                my: 1,
                                width: '100%',
                                maxWidth: '25rem',
                            }}
                        >
                            Authorize
                        </Button>
                    </Box>
                    <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                    <CardBottom />
                </Paper>
            </Container>
            <Modal open={showLegalUpdatedAlert}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'fit-content',
                        maxWidth: '35rem',
                        bgcolor: 'background.paper',
                        border: '2px solid #FFF',
                        color: 'text.primary',
                        outline: 'none',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h4" textAlign="center">
                        Important Legal Information Update
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                        Important legal information about this software has been updated since you last authorized it. You will be required
                        to accept the updated legal information before you can continue to use this software, therefore, please read through
                        the updated legal information carefully.
                    </Typography>
                    <Box sx={{ my: 2 }} />
                    <Typography variant="body2">
                        Last Updated:{' '}
                        <Typography variant="body2" component="span" display="inline" fontWeight={600}>
                            {user.currentLegalVersion}
                        </Typography>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            size="large"
                            onClick={() => setShowLegalUpdatedAlert(false)}
                            sx={{ my: 1, mx: 'auto', width: '100%', maxWidth: '25rem' }}
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
