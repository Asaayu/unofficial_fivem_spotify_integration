import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { RadioSettingsVehicleRadio } from './RadioSettingsVehicleRadio';
// import { RadioSettingsVehicleRadioPlaylist } from './RadioSettingsVehicleRadioPlaylist';
import { useMemo } from 'react';

export const RadioSettings = () => {
    const RadioSettingsVehicleRadioSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
                <RadioSettingsVehicleRadio />
            </Box>
        );
    }, []);

    // const RadioSettingsVehicleRadioPlaylistSaved = useMemo(() => {
    //     return (
    //         <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
    //             <RadioSettingsVehicleRadioPlaylist />
    //         </Box>
    //     );
    // }, []);

    const TitleSaved = useMemo(() => {
        return <Typography variant="h5">Vehicle Radio Settings</Typography>;
    }, []);

    const DividerSaved = useMemo(() => {
        return <Divider sx={{ my: 1 }} />;
    }, []);

    return (
        <Card elevation={0} sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box' }}>
            {TitleSaved}
            {DividerSaved}
            {RadioSettingsVehicleRadioSaved}
            {/* {DividerSaved} */}
            {/* {RadioSettingsVehicleRadioPlaylistSaved} */}
        </Card>
    );
};
