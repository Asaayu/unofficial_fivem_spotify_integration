import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useContext, useMemo, useState } from 'react';

import { SettingsTooltip } from '../SettingsTooltip';
import { SettingsContext } from '../../../providers/SettingsData';

export const NotificationSettingsCurrentlyPlayingNotificationPosition = () => {
    const settings = useContext(SettingsContext);
    const [value, setValue] = useState(settings.currentlyPlayingNotificationPosition);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value);
        settings.setCurrentlyPlayingNotificationPosition(event.target.value);
    };

    const LabelSaved = useMemo(
        () => (
            <SettingsTooltip title="The position of the currently playing notification on the screen." placement="top">
                <Typography variant="body2" color="inherit" textAlign="left" overflow="visible">
                    Currently Playing Notification Position:
                </Typography>
            </SettingsTooltip>
        ),
        []
    );

    const DataSaved = useMemo(
        () => (
            <Select value={value} onChange={handleChange} variant="standard" sx={{ flexGrow: 1, maxWidth: '15rem', textAlign: 'right' }}>
                <MenuItem value="top-left">Top Left</MenuItem>
                <MenuItem value="top-right">Top Right</MenuItem>
                <MenuItem value="bottom-left">Bottom Left</MenuItem>
                <MenuItem value="bottom-right">Bottom Right</MenuItem>
            </Select>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" gap={5}>
            {LabelSaved}
            {DataSaved}
        </Box>
    );
};
