import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { BRAND } from '@asaayu-base/brand';

import { PremiumCard } from '../cards/premiumCard/PremiumCard';

export const ErrorSection = (props: { error: { type: string; message: string } }) => {
    const errorType = props.error.type;
    const errorName = props.error.type.toUpperCase().replace(/_/g, ' ');
    const errorDescription = props.error.message;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" color="error">
                {errorName}
            </Typography>
            <Typography textAlign="center" color="error">
                {errorDescription}, refresh the page to try again. If the problem persists, please contact us on
                <Link href={BRAND.discordUrl}>Discord</Link>
            </Typography>
            {errorType === 'account_error' && <PremiumCard variant="h4" />}
        </Box>
    );
};
