import { Button, CircularProgress, Divider, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { SavedAlbum, SimplifiedAlbum, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';

// import { AutoplayContext } from '../../providers/AutoplayManager';
import { PeerContext } from '../../providers/PeerManager';

const hoverWeight = 700;

export const LibraryCard = () => {
    const peer = useContext(PeerContext);
    // const autoplay = useContext(AutoplayContext);

    const [loading, setLoading] = useState(true);
    const [playlistsNext, setPlaylistsNext] = useState(true);
    const [playlistsOffset, setPlaylistsOffset] = useState(0);
    const [albumsNext, setAlbumsNext] = useState(true);
    const [albumsOffset, setAlbumsOffset] = useState(0);

    const [library, setLibrary] = useState<(SimplifiedPlaylist | SimplifiedAlbum)[]>([]);

    const handleLibraryLoadingFirst = () => {
        if (library.length > 0) return;
        handleLibraryLoading();
    };

    const handleLibraryLoading = async () => {
        let playlists: SimplifiedPlaylist[] = [];
        let albums: SimplifiedAlbum[] = [];

        if (playlistsNext) {
            const newPlaylists = await peer
                .sendRequest({
                    id: Math.random().toString(36),
                    type: 'getPlaylists',
                    data: {
                        limit: 50,
                        offset: playlistsOffset,
                    },
                })
                .catch(() => {
                    return {
                        items: [],
                        next: null,
                    };
                });

            playlists = newPlaylists.items;
            setPlaylistsNext(newPlaylists.next != null);
            setPlaylistsOffset(playlistsOffset + 50);
        }

        if (albumsNext) {
            const newAlbums = await peer
                .sendRequest({
                    id: Math.random().toString(36),
                    type: 'getAlbums',
                    data: {
                        limit: 50,
                        offset: albumsOffset,
                    },
                })
                .catch(() => {
                    return {
                        items: [],
                        next: null,
                    };
                });

            albums = newAlbums.items.map((item: SavedAlbum) => item.album);
            setAlbumsNext(newAlbums.next != null);
            setAlbumsOffset(albumsOffset + 50);
        }

        if (playlists.length <= 0 && albums.length <= 0) {
            setLoading(false);
            return;
        }

        setLibrary([...library].concat([...playlists, ...albums]));
        setLoading(false);
    };

    const scrollCheck = (event: React.UIEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).scrollTop !== (event.target as HTMLDivElement).scrollHeight) return;
        handleLibraryLoading();
    };

    const LibraryItems = useMemo(() => {
        return library.map((libraryItem) => {
            return (
                <Button
                    key={libraryItem.id}
                    color="inherit"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.contrastText,
                            fontWeight: hoverWeight,
                        },
                    }}
                    onClick={async () => {
                        const res = await peer.sendRequest({
                            type: 'playItem',
                            data: libraryItem.uri,
                            id: Math.random().toString(36),
                        });
                        if (res && res.status !== 200) return;
                    }}
                >
                    <Typography variant="subtitle2" fontWeight="inherit">
                        {libraryItem.name}
                    </Typography>
                </Button>
            );
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [library]);

    const LoadingSpinner = useMemo(() => {
        return (
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" mt={1}>
                <CircularProgress />
            </Box>
        );
    }, []);

    const LibraryData = useMemo(() => {
        return (
            <Card
                elevation={0}
                sx={{
                    height: 'calc(181px - 1rem)',
                    px: 2,
                    pt: 0,
                    pb: 2,
                    flexGrow: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '0 0 4px 4px',
                }}
            >
                <Box
                    overflow="auto"
                    height="100%"
                    pr="0.25rem"
                    onScroll={scrollCheck}
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: 6,
                            borderRadius: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            cursor: 'pointer',
                        },
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        {loading ? (
                            LoadingSpinner
                        ) : library.length <= 0 ? (
                            <Typography variant="body2">No Content Found...</Typography>
                        ) : (
                            LibraryItems
                        )}
                    </Box>
                </Box>
            </Card>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [library, loading, LibraryItems, LoadingSpinner]);

    const TopCard = useMemo(() => {
        return (
            <Card
                elevation={0}
                sx={{
                    maxHeight: 'fit-content',
                    px: 2,
                    pt: 1,
                    borderRadius: '4px 4px 0 0',
                    '&::-webkit-scrollbar': {
                        width: '0.4rem',
                    },
                    '&::-webkit-scrollbar-track': {
                        my: 2,
                    },
                }}
                onScroll={scrollCheck}
            >
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="baseline" height="fit-content">
                    <Typography variant="body1" fontWeight={700}>
                        Library
                    </Typography>
                    <IconButton
                        color="inherit"
                        sx={{
                            p: 1,
                        }}
                        onClick={() => {
                            setLoading(true);
                            setLibrary([]);

                            setPlaylistsNext(true);
                            setPlaylistsOffset(0);

                            setAlbumsNext(true);
                            setAlbumsOffset(0);

                            handleLibraryLoadingFirst();
                        }}
                        disabled={library.length <= 0 && (playlistsNext || albumsNext)}
                    >
                        <FaArrowsRotate size={14} />
                    </IconButton>
                </Box>
                <Divider sx={{ mt: 0.25, mb: 1 }} />
            </Card>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [library, playlistsNext, albumsNext]);

    useEffect(() => {
        if (peer.connection == null || peer.connection.peerConnection.connectionState != 'connected') return;
        if (library.length > 0) return;
        handleLibraryLoadingFirst();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [library, peer.connection, peer.connection?.peerConnection.connectionState]);

    return (
        <Box display="flex" flexDirection="column" width="100%">
            {TopCard}
            {LibraryData}
        </Box>
    );
};
