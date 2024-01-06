import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useContext } from 'react';
import { FaBackwardStep, FaForwardStep, FaPause, FaPlay } from 'react-icons/fa6';
import { LuRepeat, LuRepeat1, LuShuffle } from 'react-icons/lu';

// import { AutoplayContext } from '../../providers/AutoplayManager';
import { PeerContext } from '../../providers/PeerManager';

const IconButtonDefault = (props: {
    children: React.ReactNode | React.ReactNode[];
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    disabled?: boolean;
}) => {
    return (
        <Button
            onClick={props.onClick}
            color={props.color ?? 'primary'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
                width: '3.5rem',
                height: '2.5rem',
            }}
            disabled={props.disabled ?? false}
        >
            {props.children}
        </Button>
    );
};

export const PlayerButtons = () => {
    const peer = useContext(PeerContext);
    // const autoplay = useContext(AutoplayContext);

    const shuffleState = peer.state?.shuffle;
    const repeatState = peer.state?.repeat_mode;

    return (
        <>
            <ButtonGroup variant="outlined" disableRipple>
                <IconButtonDefault
                    onClick={() => {
                        peer.sendRequest({ type: 'toggleShuffle', data: !shuffleState });
                    }}
                    color={shuffleState ? 'primary' : 'error'}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState != 'connected'}
                >
                    <LuShuffle size={24} />
                </IconButtonDefault>
                <IconButtonDefault
                    onClick={() => {
                        peer.player?.previousTrack();
                    }}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState != 'connected'}
                >
                    <FaBackwardStep size={24} />
                </IconButtonDefault>
                <IconButtonDefault
                    onClick={() => {
                        peer.player?.togglePlay();
                        // if (peer.state?.paused) autoplay.checkAutoplayState();
                    }}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState != 'connected'}
                >
                    {peer.state?.paused ? <FaPlay size={20} style={{ marginLeft: 4 }} /> : <FaPause size={24} />}
                </IconButtonDefault>
                <IconButtonDefault
                    onClick={() => {
                        peer.player?.nextTrack();
                    }}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState != 'connected'}
                >
                    <FaForwardStep size={24} />
                </IconButtonDefault>
                <IconButtonDefault
                    onClick={() => {
                        const repeatMode = repeatState === 0 ? 'context' : repeatState === 1 ? 'track' : 'off';
                        peer.sendRequest({ type: 'setRepeatMode', data: repeatMode });
                    }}
                    color={repeatState === 0 ? 'error' : 'primary'}
                    disabled={peer.connection != null && peer.connection.peerConnection.connectionState != 'connected'}
                >
                    {repeatState === 0 ? <LuRepeat size={24} /> : repeatState === 1 ? <LuRepeat size={24} /> : <LuRepeat1 size={24} />}
                </IconButtonDefault>
            </ButtonGroup>
        </>
    );
};
