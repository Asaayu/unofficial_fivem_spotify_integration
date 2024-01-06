import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BRAND } from '@asaayu-base/brand';

import { ExternalLink } from '../../utils/ExternalLink';

export const LegalBottom = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                height: 'fit-content',
                minHeight: '64px',
                width: '100%',
                minWidth: 380,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0 0 1rem 1rem',
                flexShrink: 0,
                px: 2,
                py: 1,
            }}
            component="footer"
            square
        >
            <Grid container spacing={0.5}>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        fontSize="0.65rem"
                        textAlign="center"
                        letterSpacing={0.2}
                        whiteSpace="pretty"
                        color="text.secondary"
                    >
                        This software is not approved, sponsored, nor endorsed by Spotify USA, Inc, Spotify AB, or Rockstar Games. All
                        trademarks, service marks, trade names, logos, domain names, and any other features of a brand are the sole property
                        of their respective owners or licensors. All cover art and song metadata is supplied and made available by Spotify.
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
                        <ExternalLink
                            href={`${BRAND.websiteUrl}${BRAND.eulaUrl}`}
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
                        </ExternalLink>
                        <ExternalLink
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
                        </ExternalLink>
                        <ExternalLink
                            href={`${BRAND.websiteUrl}${BRAND.privacyUrl}`}
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
                        </ExternalLink>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};
