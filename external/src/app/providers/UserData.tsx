import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createContext, useEffect, useState } from 'react';
import { BRAND } from '@asaayu-base/brand';

interface IUser {
    lastLegalVersionAccepted: string;
    currentLegalVersion: string;
    setLastLegalVersionAccepted: (version: string) => void;
}

export const UserContext = createContext({} as IUser);
export const UserData = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const [lastLegalVersionAccepted, setLastLegalVersionAccepted] = useState(localStorage.getItem('lastLegalVersionAccepted') || '');
    const [currentLegalVersion, setCurrentLegalVersion] = useState('');

    // Load the current legal version from the GitHub repository
    useEffect(() => {
        const urlParts = BRAND.gitHubUrl.split('/');
        const repoName = urlParts[urlParts.length - 1];
        const url = `https://raw.githubusercontent.com/Asaayu/${repoName}/main/LEGAL-UPDATE.md`;
        fetch(url)
            .then((response) => response.text())
            .catch(() => '0')
            .then((text) => setCurrentLegalVersion(text));
    }, []);

    // Save the values to local storage when they change
    useEffect(() => {
        localStorage.setItem('lastLegalVersionAccepted', lastLegalVersionAccepted);
    }, [lastLegalVersionAccepted]);

    return (
        <UserContext.Provider
            value={{
                lastLegalVersionAccepted,
                currentLegalVersion,
                setLastLegalVersionAccepted,
            }}
        >
            {
                // Wait for everything to load before rendering the children
                currentLegalVersion === '' ? (
                    <Paper elevation={0} sx={{ height: '100vh', width: '100vw', borderRadius: 0 }}>
                        <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ height: '100vh' }}>
                            <CircularProgress color="inherit" disableShrink />
                            <Typography variant="h6" textAlign="center" mt={2} ml={0.5}>
                                Loading Data...
                            </Typography>
                        </Grid>
                    </Paper>
                ) : (
                    props.children
                )
            }
        </UserContext.Provider>
    );
};
