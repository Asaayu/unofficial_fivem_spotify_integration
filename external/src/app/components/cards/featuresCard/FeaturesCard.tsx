import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

const features = [
    <>Set up a playlists as in-game radio station for a musical drive of your favorite tracks.</>,
    <>View and control the currently playing song through a custom in-game interface, along with a currently playing notification.</>,
    <>Control your Spotify playback with in-game keybinds and commands to play, pause, and skip.</>,
];

export const FeaturesCard = (props: { variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined }) => {
    return (
        <>
            <Typography variant={props.variant}>Features 🖥️</Typography>
            <Card elevation={0} sx={{ p: 2, width: '85%' }}>
                <Box display="flex" flexDirection="column" textAlign="left" gap={1}>
                    {features.map((feature, index) => (
                        <Fragment key={index}>
                            <Typography variant="caption">{feature}</Typography>
                            {index < features.length - 1 && <Divider />}
                        </Fragment>
                    ))}
                </Box>
            </Card>
        </>
    );
};
