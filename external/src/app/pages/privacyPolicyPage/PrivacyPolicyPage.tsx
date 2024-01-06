import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { BRAND } from '@asaayu-base/brand';

import { CardBottom } from '../../components/cardBottom/CardBottom';
import { TitleBar } from '../../components/titleBar/TitleBar';

const urlParts = BRAND.gitHubUrl.split('/');
const repoName = urlParts[urlParts.length - 1];
const url = `https://raw.githubusercontent.com/Asaayu/${repoName}/main/PRIVACY-POLICY.md`;

export default function PrivacyPolicyPage() {
    const [policy, setPolicy] = useState('');

    useEffect(() => {
        fetch(url)
            .then((response) => response.text())
            .then((text) => setPolicy(text))
            .catch((error) => {
                console.error(error);
                setPolicy(`An error occurred while loading the privacy policy, please go to ${url} to view it in full.`);
            });
    }, []);

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
                    textAlign="left"
                    gap={1}
                    sx={{ my: 2 }}
                >
                    <Typography variant="h4">Privacy Policy</Typography>
                    <Typography variant="body2">
                        View on<Link href={url}>GitHub</Link>
                    </Typography>
                    <Card elevation={0} sx={{ p: 2, width: '85%' }}>
                        <Box display="flex" flexDirection="column" textAlign="left" gap={1}>
                            {policy === '' ? <Skeleton /> : <Markdown>{policy}</Markdown>}
                        </Box>
                    </Card>
                </Box>
                <Divider sx={{ position: 'relative', my: 2, width: 999, left: -100 }} />
                <CardBottom />
            </Paper>
        </Container>
    );
}
