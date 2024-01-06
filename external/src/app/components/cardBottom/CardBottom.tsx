import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { BRAND } from '@asaayu-base/brand';

import { SocialBar } from '../socialBar/SocialBar';
import { useMemo } from 'react';

export const CardBottom = () => {
    const CardBottomSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ my: 1 }}>
                <Typography variant="caption" textAlign="center">
                    If you have any questions or concerns, please contact us on<Link href={BRAND.discordUrl}>Discord</Link>
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <SocialBar />
                </Box>
            </Box>
        );
    }, []);

    return CardBottomSaved;
};
