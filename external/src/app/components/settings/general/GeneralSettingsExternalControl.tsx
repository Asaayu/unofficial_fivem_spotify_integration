import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useContext, useMemo, useState } from 'react';

import { SettingsTooltip } from '../SettingsTooltip';
import { SettingsContext } from '../../../providers/SettingsData';

export const GeneralSettingsExternalControl = () => {
    const settings = useContext(SettingsContext);
    const [value, setValue] = useState(settings.externalControl);

    const SettingSaved = useMemo(
        () => (
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
                <SettingsTooltip
                    title="Allow external resources to interact with your Spotify session by pausing, playing, seeking, etc."
                    placement="top"
                >
                    <Typography variant="body2" color="inherit" textAlign="left">
                        External Control:
                    </Typography>
                </SettingsTooltip>
                <Switch
                    checked={value}
                    onChange={() => {
                        setValue(!value);
                        settings.setExternalControl(!value);
                    }}
                />
            </Box>
        ),
        [value, settings]
    );

    return SettingSaved;
};
