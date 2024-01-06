import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BRAND } from '@asaayu-base/brand';

import { InternalLink } from '../internalLink/InternalLink';

export const LegalBottom = () => {
    return (
        <Box position="static" width="100%">
            <Paper elevation={1} sx={{ p: 1.5 }}>
                <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                fontSize="0.75rem"
                                lineHeight="1rem"
                                textAlign="center"
                                letterSpacing={0.2}
                                whiteSpace="pretty"
                                color="text.secondary"
                            >
                                This software is not approved, sponsored, nor endorsed by Spotify USA, Inc, Spotify AB, or Rockstar Games.
                                All trademarks, service marks, trade names, logos, domain names, and any other features of a brand are the
                                sole property of their respective owners or licensors.
                            </Typography>
                            <Typography
                                variant="body2"
                                fontSize="0.75rem"
                                lineHeight="1rem"
                                textAlign="center"
                                letterSpacing={0.2}
                                whiteSpace="pretty"
                                color="text.secondary"
                            >
                                All cover art and song metadata is supplied and made available by Spotify.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                justifyContent="center"
                                width="100%"
                            >
                                <InternalLink
                                    href={BRAND.eulaUrl}
                                    sx={{
                                        width: {
                                            xs: '100%',
                                            sm: '33%',
                                        },
                                    }}
                                >
                                    <Typography variant="body2" textAlign="center" whiteSpace="nowrap">
                                        End-User License Agreement
                                    </Typography>
                                </InternalLink>
                                <InternalLink
                                    href={BRAND.peerStatusUrl}
                                    sx={{
                                        width: {
                                            xs: '100%',
                                            sm: '33%',
                                        },
                                    }}
                                >
                                    <Typography variant="body2" textAlign="center" whiteSpace="nowrap">
                                        PeerJS Status
                                    </Typography>
                                </InternalLink>
                                <InternalLink
                                    href={BRAND.privacyUrl}
                                    sx={{
                                        width: {
                                            xs: '100%',
                                            sm: '33%',
                                        },
                                    }}
                                >
                                    <Typography variant="body2" textAlign="center" whiteSpace="nowrap">
                                        Privacy Policy
                                    </Typography>
                                </InternalLink>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Box>
    );
};
