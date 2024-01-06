import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useContext, useMemo } from 'react';
import { FaBackwardStep, FaForwardStep, FaPause, FaPlay } from 'react-icons/fa6';
import { LuRepeat, LuRepeat1, LuShuffle } from 'react-icons/lu';

import { PlayerContext } from '../../providers/PlayerData';
import { SpotifySDKContext } from '../../providers/SpotifySdk';

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
    const player = useContext(PlayerContext);
    const sdk = useContext(SpotifySDKContext);

    const disabled = useMemo(() => {
        return !player.player;
    }, [player.player]);

    const shuffleState = useMemo(() => {
        return player.state?.shuffle;
    }, [player.state?.shuffle]);

    const repeatState = useMemo(() => {
        return player.state?.repeat_mode;
    }, [player.state?.repeat_mode]);

    const ShuffleButtonSaved = useMemo(() => {
        return (
            <IconButtonDefault
                onClick={() => {
                    sdk.sdk.player.togglePlaybackShuffle(!shuffleState);
                }}
                color={shuffleState ? 'primary' : 'error'}
            >
                <LuShuffle size={24} />
            </IconButtonDefault>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shuffleState]);

    const PreviousButtonSaved = useMemo(() => {
        return (
            <IconButtonDefault
                onClick={() => {
                    player.player?.previousTrack();
                }}
            >
                <FaBackwardStep size={24} />
            </IconButtonDefault>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const PauseButtonSaved = useMemo(() => {
        return (
            <IconButtonDefault
                onClick={() => {
                    player.player?.togglePlay();
                }}
            >
                {player.state?.paused ? <FaPlay size={20} style={{ marginLeft: 4 }} /> : <FaPause size={24} />}
            </IconButtonDefault>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.state?.paused]);

    const NextButtonSaved = useMemo(() => {
        return (
            <IconButtonDefault
                onClick={() => {
                    player.player?.nextTrack();
                }}
            >
                <FaForwardStep size={24} />
            </IconButtonDefault>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const RepeatButtonSaved = useMemo(() => {
        return (
            <IconButtonDefault
                onClick={() => {
                    const repeatMode = repeatState === 0 ? 'context' : repeatState === 1 ? 'track' : 'off';
                    sdk.sdk.player.setRepeatMode(repeatMode);
                }}
                color={repeatState === 0 ? 'error' : 'primary'}
            >
                {repeatState === 0 ? <LuRepeat size={24} /> : repeatState === 1 ? <LuRepeat size={24} /> : <LuRepeat1 size={24} />}
            </IconButtonDefault>
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repeatState]);

    const PlayerButtonsSaved = useMemo(() => {
        return (
            <ButtonGroup variant="outlined" disabled={disabled} disableRipple>
                {ShuffleButtonSaved}
                {PreviousButtonSaved}
                {PauseButtonSaved}
                {NextButtonSaved}
                {RepeatButtonSaved}
            </ButtonGroup>
        );
    }, [NextButtonSaved, PauseButtonSaved, PreviousButtonSaved, RepeatButtonSaved, ShuffleButtonSaved, disabled]);

    return <>{PlayerButtonsSaved}</>;
};
