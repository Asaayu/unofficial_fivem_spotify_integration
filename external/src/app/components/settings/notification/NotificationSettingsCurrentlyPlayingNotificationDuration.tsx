import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useContext, useMemo, useState } from 'react';

import { SettingsTooltip } from '../SettingsTooltip';
import { SettingsContext } from '../../../providers/SettingsData';

export const NotificationSettingsCurrentlyPlayingNotificationDuration = () => {
    const settings = useContext(SettingsContext);
    const [value, setValue] = useState(settings.currentlyPlayingNotificationDuration);

    const handleChange = (_: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') return;
        setValue(newValue);
        settings.setCurrentlyPlayingNotificationDuration(value);
    };

    const LabelSaved = useMemo(() => {
        return (
            <SettingsTooltip title="The position of the currently playing notification on the screen." placement="top">
                <Typography variant="body2" color="inherit" textAlign="left" overflow="visible">
                    Currently Playing Notification Duration:
                </Typography>
            </SettingsTooltip>
        );
    }, []);

    const DataSaved = useMemo(() => {
        return (
            <Slider
                value={value}
                onChange={handleChange}
                min={1}
                max={10}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}s`}
                marks
                sx={{ mx: 1, flexShrink: 1 }}
            />
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" gap={5}>
            {LabelSaved}
            {DataSaved}
        </Box>
    );
};
