import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import { GeneralSettingsExternalControl } from './GeneralSettingsExternalControl';
import { useMemo } from 'react';

export const GeneralSettings = () => {
    const GeneralSettingsSaved = useMemo(() => {
        return (
            <Card elevation={0} sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box' }}>
                <Typography variant="h5">General Settings</Typography>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <GeneralSettingsExternalControl />
                </Box>
            </Card>
        );
    }, []);

    return GeneralSettingsSaved;
};
