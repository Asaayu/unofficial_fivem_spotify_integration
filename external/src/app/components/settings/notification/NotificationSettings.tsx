import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { NotificationSettingsCurrentlyPlayingNotificationPosition } from './NotificationSettingsCurrentlyPlayingNotificationPosition';
import { NotificationSettingsShowCurrentlyPlayingNotification } from './NotificationSettingsShowCurrentlyPlayingNotification';
import { NotificationSettingsCurrentlyPlayingNotificationDuration } from './NotificationSettingsCurrentlyPlayingNotificationDuration';
import { useMemo } from 'react';

export const NotificationSettings = () => {
    const DividerSaved = useMemo(() => {
        return <Divider sx={{ my: 1 }} />;
    }, []);

    const NotificationSettingsShowCurrentlyPlayingNotificationSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
                <NotificationSettingsShowCurrentlyPlayingNotification />
            </Box>
        );
    }, []);

    const NotificationSettingsCurrentlyPlayingNotificationPositionSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
                <NotificationSettingsCurrentlyPlayingNotificationPosition />
            </Box>
        );
    }, []);

    const NotificationSettingsCurrentlyPlayingNotificationDurationSaved = useMemo(() => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={2}>
                <NotificationSettingsCurrentlyPlayingNotificationDuration />
            </Box>
        );
    }, []);

    const TitleSaved = useMemo(() => {
        return <Typography variant="h5">Notification Settings</Typography>;
    }, []);

    return (
        <Card elevation={0} sx={{ width: '100%', height: '100%', p: 2, boxSizing: 'border-box' }}>
            {TitleSaved}
            {DividerSaved}
            {NotificationSettingsShowCurrentlyPlayingNotificationSaved}
            {DividerSaved}
            {NotificationSettingsCurrentlyPlayingNotificationPositionSaved}
            {DividerSaved}
            {NotificationSettingsCurrentlyPlayingNotificationDurationSaved}
        </Card>
    );
};
