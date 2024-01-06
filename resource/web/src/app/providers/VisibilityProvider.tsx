import Box from '@mui/material/Box';
import React, { createContext, useEffect, useState } from 'react';

import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { isEnvBrowser } from '../utils/misc';

export const VisibilityContext = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
    setVisible: (visible: boolean) => void;
    visible: boolean;
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);

    useNuiEvent<boolean>('setVisible', setVisible);

    // Handle pressing escape/backspace
    useEffect(() => {
        // Only attach listener when we are visible
        if (!visible) return;

        const keyHandler = (e: KeyboardEvent) => {
            if (['Backspace', 'Escape'].includes(e.code)) {
                if (!isEnvBrowser()) fetchNui('hideFrame');
                else setVisible(!visible);
            }
        };

        window.addEventListener('keydown', keyHandler);

        return () => window.removeEventListener('keydown', keyHandler);
    }, [visible]);

    return (
        <VisibilityContext.Provider
            value={{
                visible,
                setVisible,
            }}
        >
            <Box style={{ visibility: visible ? 'visible' : 'hidden', height: '100vh' }}>{children}</Box>
        </VisibilityContext.Provider>
    );
};
