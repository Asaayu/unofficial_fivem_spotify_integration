import { ThemeOptions, createTheme } from '@mui/material';
import { Theme as MaterialTheme, ThemeProvider } from '@mui/material/styles';
import { createContext } from 'react';

interface ITheme {
    theme: MaterialTheme;
}

export const ThemeContext = createContext({} as ITheme);
export const Theme = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const theme = createTheme(themeData);

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider
                value={{
                    theme,
                }}
            >
                {props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

const themeData: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            // main: '#1DB954', // Spotify Green
            main: '#1ED760', // Spotify Light Green
            contrastText: '#000000',
        },
        secondary: {
            main: '#191414', // Spotify Black
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                disableElevation: false,
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    borderRadius: '9999px',
                    textTransform: 'none',
                    fontWeight: 700,
                    letterSpacing: 0.75,
                    padding: '0.5rem 1rem',
                },
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            },
        },
        MuiAppBar: {
            defaultProps: {
                color: 'default',
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
                fontWeight: 700,
                mx: '0.20rem',
                target: '_blank',
                rel: 'noopener noreferrer',
            },
        },
        MuiTypography: {
            defaultProps: {
                whiteSpace: 'pretty',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        },
    },
    typography: {
        fontFamily: 'Montserrat',

        h1: {
            fontSize: '3rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 700,
        },
        button: {
            fontWeight: 600,
            letterSpacing: 0.5,
        },
        body1: {
            lineHeight: '1.25rem',
        },
    },
};
