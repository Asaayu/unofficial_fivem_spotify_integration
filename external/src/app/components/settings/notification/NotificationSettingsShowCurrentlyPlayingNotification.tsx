import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useContext, useMemo, useState } from 'react';

import { SettingsTooltip } from '../SettingsTooltip';
import { SettingsContext } from '../../../providers/SettingsData';

export const NotificationSettingsShowCurrentlyPlayingNotification = () => {
    const settings = useContext(SettingsContext);
    const [value, setValue] = useState(settings.currentlyPlayingNotification);

    const handleChange = async (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setValue(checked);
        settings.setCurrentlyPlayingNotification(checked);
    };

    const LabelSaved = useMemo(() => {
        return (
            <SettingsTooltip
                title="Enable a custom notification that shows the currently playing song when the song changes."
                placement="top"
            >
                <Typography variant="body2" color="inherit" textAlign="left">
                    Enable Currently Playing Notifications:
                </Typography>
            </SettingsTooltip>
        );
    }, []);

    const DataSaved = useMemo(() => {
        return <Switch checked={value} onChange={handleChange} />;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
            {LabelSaved}
            {DataSaved}
        </Box>
    );
};
