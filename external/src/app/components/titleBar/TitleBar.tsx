import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BRAND } from '@asaayu-base/brand';

import { InternalLink } from '../internalLink/InternalLink';
import { useMemo } from 'react';

export const TitleBar = (props: { noLink?: boolean }) => {
    const TitleBarSaved = useMemo(() => {
        if (props.noLink) {
            return (
                <Typography variant="h3" textAlign="center">
                    {BRAND.nameTitle[0]}
                    <br />
                    {BRAND.nameTitle[1]}
                </Typography>
            );
        }
        return (
            <InternalLink {...props} href="/" color="inherit" underline="none" sx={{ p: 0, m: 0 }}>
                <Typography variant="h3" textAlign="center">
                    {BRAND.nameTitle[0]}
                    <br />
                    {BRAND.nameTitle[1]}
                </Typography>
            </InternalLink>
        );
    }, [props]);

    const TitleBarDataSaved = useMemo(() => {
        return (
            <>
                {TitleBarSaved}
                <Box sx={{ my: 1 }} />
                <Typography variant="subtitle2" textAlign="center" color="text.secondary">
                    Access, control, and listen to Spotify music while in-game.
                </Typography>
            </>
        );
    }, [TitleBarSaved]);

    return TitleBarDataSaved;
};
