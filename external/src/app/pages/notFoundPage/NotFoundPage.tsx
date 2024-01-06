import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { CardBottom } from '../../components/cardBottom/CardBottom';
import { TitleBar } from '../../components/titleBar/TitleBar';

export default function NotFoundPage() {
    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }}>
            <Paper
                elevation={2}
                sx={{ width: 'fit-content', maxWidth: '35rem', borderRadius: '0.75rem', overflow: 'hidden', px: 4, pt: 2, my: 5 }}
            >
                <TitleBar />
                <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    gap={1}
                    sx={{ my: 2 }}
                >
                    <Typography variant="h4">Error: 404</Typography>
                    <Typography variant="body2">
                        Looks like the page you're looking for doesn't exist.
                        <br />
                        We'll take you back to the previous page.
                    </Typography>
                    <Box my={0.5} />
                    <Button size="large" onClick={() => window.history.back()} sx={{ my: 1, width: '100%', maxWidth: '25rem' }}>
                        Go Back
                    </Button>
                </Box>
                <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                <CardBottom />
            </Paper>
        </Container>
    );
}
