import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { createContext, useContext, useEffect, useState } from 'react';
import { PeerContext } from './PeerManager';
import Divider from '@mui/material/Divider';

export interface IAutoplay {
    checkAutoplayState: () => void;
}

export const AutoplayContext = createContext({} as IAutoplay);
export const AutoplayManager = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const peer = useContext(PeerContext);

    const [openModal, setOpenModal] = useState(false);

    const checkAutoplayState = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (peer.state?.paused) setOpenModal(true);
    };

    useEffect(() => {
        if (!peer.state?.paused) setOpenModal(false);
    }, [peer.state]);

    return (
        <AutoplayContext.Provider
            value={{
                checkAutoplayState,
            }}
        >
            {props.children}
            <Modal open={openModal && (peer.state?.paused ?? false)} onClose={() => setOpenModal(false)}>
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
                        textAlign: 'center',
                        userSelect: 'none',
                        p: 4,
                    }}
                >
                    <Typography variant="h4">External Interaction Required</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                        Due to browser restrictions, an interaction with the external web app is required to enable autoplay. Alt-tab to the
                        external web app and interact with it by clicking on the page to enable actions from this app to work.
                    </Typography>
                </Box>
            </Modal>
        </AutoplayContext.Provider>
    );
};
