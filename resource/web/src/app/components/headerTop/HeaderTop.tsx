import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { BRAND } from '@asaayu-base/brand';

import { ExternalLink } from '../../utils/ExternalLink';

export const HeaderTop = () => {
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
                borderRadius: '1rem 1rem 0 0',
                flexShrink: 0,
                pl: 2,
                pr: 1,
                py: 1,
            }}
            square
        >
            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h5">{BRAND.name}</Typography>
                    <Typography variant="subtitle2" textAlign="left" color="text.secondary">
                        Access, control, and listen to Spotify music while in-game.
                    </Typography>
                </Box>
                <Box flexGrow={1} />
                <ExternalLink href={BRAND.websiteUrl}>
                    <Tooltip title="Open Website" placement="bottom-end">
                        <IconButton sx={{ width: '3rem', height: '3rem', color: 'primary' }}>
                            <FaArrowUpRightFromSquare />
                        </IconButton>
                    </Tooltip>
                </ExternalLink>
            </Box>
        </Paper>
    );
};
