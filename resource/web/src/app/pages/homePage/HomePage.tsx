import { BRAND } from '@asaayu-base/brand';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { ExternalLink } from '../../utils/ExternalLink';

export const HomePage = () => {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                my={2}
                textAlign="center"
                height="fit-content"
            >
                <Typography variant="h3">Welcome 👋</Typography>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Typography variant="body2" px={3} textAlign="center" overflow="auto">
                    {BRAND.name} is free, open-source software for FiveM that allows you to control your Spotify playback from within the
                    game.
                </Typography>
                <Box my={1} />
                <Typography variant="body2" px={3} overflow="auto">
                    This software is completely open source and available on
                    <ExternalLink href={BRAND.gitHubUrl}>GitHub</ExternalLink>. Feel free to see how it works, contribute, and report any
                    issues you may find.
                </Typography>
                <Divider sx={{ width: '100%', my: 4 }} />
                <Typography variant="body2" px={3}>
                    In order to use {BRAND.name}, you must connect to the external web application below and authenticate with Spotify.
                </Typography>
                <Box my={1} />
                <ExternalLink href={`${BRAND.websiteUrl}/login`} underline="none">
                    <Button
                        size="large"
                        sx={{
                            my: 1,
                            px: 10,
                            maxWidth: '25rem',
                        }}
                    >
                        Open Web App
                    </Button>
                </ExternalLink>
            </Box>
        </Container>
    );
};
