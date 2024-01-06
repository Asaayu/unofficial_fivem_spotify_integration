import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

const featuresPlanned = [
    <>Automatically lower your Spotify playback volume when someone is speaking nearby for a better listening experience.</>,
    <>Let in-game events switch up your Spotify playback for a dynamic experience that matches the action.</>,
];

export const PlannedFeaturesCard = (props: { variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined }) => {
    return (
        <>
            <Typography variant={props.variant}>Planned Features 🚧</Typography>
            <Card elevation={0} sx={{ p: 2, width: '85%' }}>
                <Box display="flex" flexDirection="column" textAlign="left" gap={1}>
                    {featuresPlanned.map((feature, index) => (
                        <Fragment key={index}>
                            <Typography variant="caption">{feature}</Typography>
                            <Divider />
                        </Fragment>
                    ))}
                    <Typography variant="body2" width="100%" textAlign="center">
                        And many more...
                    </Typography>
                </Box>
            </Card>
        </>
    );
};
