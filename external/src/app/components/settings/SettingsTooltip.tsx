import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { useContext } from 'react';

import { ThemeContext } from '../../providers/Theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const SettingsTooltip = (props: TooltipProps) => {
    const theme = useContext(ThemeContext);

    return (
        <Tooltip
            {...props}
            title={
                <Box sx={{ userSelect: 'none' }}>
                    <Typography variant="caption">{props.title}</Typography>
                </Box>
            }
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: theme.theme.palette.background.paper,
                        border: '2px solid #555',
                        borderRadius: 2,
                        boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.5)',
                        width: 'fit-content',
                        '& .MuiTooltip-arrow': {
                            color: '#555',
                        },
                    },
                },
            }}
        >
            {props.children}
        </Tooltip>
    );
};
