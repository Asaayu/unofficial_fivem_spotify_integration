import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CircularProgress, MenuItem } from '@mui/material';

import { SpotifySDKContext } from '../../../providers/SpotifySdk';
import { SettingsTooltip } from '../SettingsTooltip';
import { SettingsContext } from '../../../providers/SettingsData';

export const RadioSettingsVehicleRadioPlaylist = () => {
    const settings = useContext(SettingsContext);
    const spotify = useContext(SpotifySDKContext);

    const [value, setValue] = useState(settings.vehicleRadioPlaylist);
    const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);
    const [offset, setOffset] = useState(0);
    const [next, setNext] = useState(true);

    useEffect(() => {
        settings.setVehicleRadioPlaylist(value);
    }, [value, settings]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value);
    };

    const scrollCheck = (event: React.UIEvent<HTMLUListElement>) => {
        const target = event.target as HTMLUListElement;
        if (target.scrollTop !== target.scrollHeight) return;
        handlePlaylistLoading();
    };

    const handlePlaylistLoadingFirst = async () => {
        if (playlists.length > 0) return;
        handlePlaylistLoading();
    };

    const handlePlaylistLoading = async () => {
        if (!next) return;

        const newPlaylist = (await spotify.sdk?.currentUser.playlists.playlists(50, offset)) ?? { items: [], next: null };
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...newPlaylist.items]);
        setNext(newPlaylist.next != null);
        setOffset((prevOffset) => prevOffset + 50);
    };

    const LabelSaved = useMemo(
        () => (
            <SettingsTooltip
                title="The Spotify playlist to play by default if Spotify is paused, otherwise the already playing content will be used."
                placement="top"
            >
                <Typography variant="body2" color="inherit" textAlign="left" overflow="visible">
                    Default Vehicle Radio Playlist:
                </Typography>
            </SettingsTooltip>
        ),
        []
    );

    const SelectSaved = useMemo(
        () => (
            <Select
                MenuProps={{
                    PaperProps: {
                        onScroll: scrollCheck,
                    },
                }}
                value={value}
                onChange={handleChange}
                onMouseEnter={handlePlaylistLoadingFirst}
                variant="standard"
                sx={{ flexGrow: 1, textAlign: 'right' }}
                disabled={playlists.length === 0}
            >
                {playlists.map((playlist) => (
                    <MenuItem value={playlist.id} key={playlist.id}>
                        {playlist.name}
                    </MenuItem>
                ))}
            </Select>
        ),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value, playlists]
    );

    useEffect(() => {
        if (spotify.sdk) handlePlaylistLoadingFirst();
    }, [spotify.sdk]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%" gap={5}>
            {LabelSaved}
            {playlists.length > 0 ? SelectSaved : <CircularProgress />}
        </Box>
    );
};
