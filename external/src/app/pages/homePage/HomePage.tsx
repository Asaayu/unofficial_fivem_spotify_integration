import { BRAND } from '@asaayu-base/brand';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { CardBottom } from '../../components/cardBottom/CardBottom';
import { FeaturesCard } from '../../components/cards/featuresCard/FeaturesCard';
import { OpenSourceCard } from '../../components/cards/openSourceCard/OpenSourceCard';
import { PlannedFeaturesCard } from '../../components/cards/plannedFeaturesCard/plannedFeaturesCard';
import { PremiumCard } from '../../components/cards/premiumCard/PremiumCard';
import { TitleBar } from '../../components/titleBar/TitleBar';

const DividerWithMargin = () => <Divider sx={{ width: '75%', mx: 'auto', my: 2 }} />;

export default function HomePage() {
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
                    <Typography variant="h4">Welcome 👋</Typography>
                    <Typography variant="body2" px={3}>
                        {BRAND.name} is free, open-source software for FiveM that allows you to control your Spotify playback from within
                        the game.
                    </Typography>
                    <DividerWithMargin />
                    <Typography variant="h4">In-Game 💻</Typography>
                    <Typography variant="body2" px={3}>
                        When players are in-game, they can use the
                        <Card component="span" elevation={0} sx={{ px: 0.75, py: 0.5, mx: 0.5, display: 'inline' }}>
                            <code>/spotify</code>
                        </Card>
                        command to open the Spotify playback control menu. They will then be prompted to authorize the software and can then
                        control their Spotify playback from within the game.
                    </Typography>
                    <DividerWithMargin />
                    <OpenSourceCard variant="h4" />
                    <DividerWithMargin />
                    <FeaturesCard variant="h4" />
                    <DividerWithMargin />
                    <PlannedFeaturesCard variant="h4" />
                    <DividerWithMargin />
                    <PremiumCard variant="h4" showTitle />
                </Box>
                <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                <CardBottom />
            </Paper>
        </Container>
    );
}
