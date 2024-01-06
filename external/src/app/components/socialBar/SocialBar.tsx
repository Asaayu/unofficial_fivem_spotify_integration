import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { BRAND } from '@asaayu-base/brand';

import DiscordIcon from './../../../assets/discord/discord_logo_small_white.svg';
import GitHubIcon from './../../../assets/github/github_logo_small_white.svg';
import SpotifyIcon from './../../../assets/spotify/spotify_logo_small_white.svg';
import { useMemo } from 'react';

const SOCIAL_ICON_SIZE = 30;
const SOCIAL_LINKS = [
    {
        url: BRAND.gitHubUrl,
        icon: <img src={GitHubIcon} alt="GitHub Icon" height={SOCIAL_ICON_SIZE} width={SOCIAL_ICON_SIZE} />,
        tooltip: 'View this project on GitHub',
    },
    {
        url: BRAND.discordUrl,
        icon: <img src={DiscordIcon} alt="Discord Icon" height={SOCIAL_ICON_SIZE} width={SOCIAL_ICON_SIZE} />,
        tooltip: 'Join the community Discord',
    },
    {
        url: 'https://www.spotify.com/account/apps/',
        icon: <img src={SpotifyIcon} alt="Spotify Icon" height={SOCIAL_ICON_SIZE} width={SOCIAL_ICON_SIZE} />,
        tooltip: 'Manage authorized apps',
    },
];

export const SocialBar = () => {
    const SocialBarSaved = useMemo(() => {
        return (
            <Box display="flex" justifyContent="center">
                {SOCIAL_LINKS.map((link, index) => (
                    <Box key={index}>
                        <Tooltip key={index} title={link.tooltip} placement="bottom">
                            <IconButton href={link.url} target="_blank" rel="noopener noreferrer" sx={{ px: 1, mx: 0.5 }}>
                                {link.icon}
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>
        );
    }, []);

    return SocialBarSaved;
};
