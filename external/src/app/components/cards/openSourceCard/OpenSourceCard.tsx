import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { BRAND } from '@asaayu-base/brand';

export const OpenSourceCard = (props: { variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined }) => {
    return (
        <>
            <Typography variant={props.variant}>Open Source 🌐</Typography>
            <Typography variant="body2" px={3}>
                This software is completely open source and available on
                <Link href={BRAND.gitHubUrl}>GitHub</Link>. Feel free to see how it works, contribute, and report any issues you may find.
            </Typography>
        </>
    );
};
