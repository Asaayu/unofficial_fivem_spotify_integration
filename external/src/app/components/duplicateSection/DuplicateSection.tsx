import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BRAND } from '@asaayu-base/brand';

export const DuplicateSection = () => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={1}>
            <Typography variant="body1" textAlign="center" color="error" letterSpacing={0.5}>
                <strong>{BRAND.name}</strong> is already connected in another tab. To connect here, close the other tab and refresh this
                page.
            </Typography>
            <Box my={1} />
            <Button size="large" onClick={() => window.location.reload()} sx={{ my: 1, width: '100%', maxWidth: '25rem' }}>
                Refresh Page
            </Button>
        </Box>
    );
};
