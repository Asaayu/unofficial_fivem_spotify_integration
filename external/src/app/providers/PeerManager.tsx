import { BRAND } from '@asaayu-base/brand';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { sha256 } from 'crypto-hash';
import { DataConnection, Peer } from 'peerjs';
import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface IPeer {
    connection: DataConnection | null;
    setConnect: (connect: boolean) => void;
    reconnecting: boolean;
}

export const PeerContext = createContext({} as IPeer);
export const PeerManager = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const [params] = useSearchParams();

    const [ip, setIp] = useState<string | null>(null);
    const [peer, setPeer] = useState<Peer | null>(null);
    const [connection, setConnection] = useState<DataConnection | null>(null);
    const [connect, setConnect] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);
    const [reloadRequired, setReloadRequired] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (ip) return;
            const res = await fetch('https://api.ipify.org/?format=json');
            const json = await res.json();
            const ipHash = await sha256(json.ip);
            setIp(ipHash);
        };

        load();
    });
    // }, [ip, params, peer]);

    useEffect(() => {
        if (!ip || peer) return;

        const debug = Number(params.get('debug')) || 0;
        const tempPeer = new Peer(`spotify-external-${ip}`, { debug: debug });
        tempPeer.on('open', () => {
            setPeer(tempPeer);
        });

        tempPeer.on('error', (error) => {
            console.error(`External Peer error: ${error}`);
            if (error.type === 'unavailable-id') {
                setReloadRequired(true);
                return;
            }
            setReconnecting(true);
            setTimeout(() => setConnect(false), BRAND.peerReconnectSpeed);
        });

        tempPeer.on('close', () => {
            setPeer(null);
        });
    }, [ip, params, peer]);

    useEffect(() => {
        if (!ip || !peer || !connect) return;

        const connection = establishConnection(peer, `spotify-game-${ip}`);
        const i = setInterval(() => {
            if (connection.peerConnection?.iceConnectionState === 'disconnected') {
                connection.close();
                setConnection(null);
                clearInterval(i);
            }
        }, 1000);

        return () => {
            connection?.close();
            setConnection(null);
            clearInterval(i);
        };
    }, [ip, peer, connect]);

    const establishConnection = (peer: Peer, targetPeerId: string) => {
        const connection = peer.connect(targetPeerId);

        connection.on('open', () => {
            setConnection(connection);
            setReconnecting(false);
        });

        connection.on('error', (error) => {
            if (error.type === 'not-open-yet') return;
            console.error(`External Peer connection error: ${error}`);
        });

        connection.on('close', () => {
            setConnection(null);
            setReconnecting(true);
            setTimeout(() => setConnect(false), BRAND.peerReconnectSpeed);
        });

        return connection;
    };

    return (
        <PeerContext.Provider
            value={{
                connection,
                setConnect,
                reconnecting,
            }}
        >
            {!reloadRequired ? (
                props.children
            ) : (
                <Modal open={reloadRequired}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'fit-content',
                            maxWidth: '35rem',
                            bgcolor: 'background.paper',
                            border: '2px solid #FFF',
                            color: 'text.primary',
                            outline: 'none',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h4" textAlign="center">
                            Page Reload Required
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2">
                            An error has occurred with the peer connection, reload the page to try again. If the error persists, check the
                            console for more information.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                size="large"
                                onClick={() => {
                                    window.location.reload();
                                }}
                                sx={{ my: 1, mx: 'auto', width: '100%', maxWidth: '25rem' }}
                            >
                                Reload
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}
        </PeerContext.Provider>
    );
};
