import { createContext, useContext, useEffect, useState } from 'react';
import { PeerContext } from './PeerManager';

export interface ISettings {
    externalControl: boolean;
    currentlyPlayingNotification: boolean;
    currentlyPlayingNotificationPosition: string;
    currentlyPlayingNotificationDuration: number;
    vehicleRadio: boolean;
    vehicleRadioPlaylist: string;
    setExternalControl: (externalControl: boolean) => void;
    setCurrentlyPlayingNotification: (currentlyPlayingNotification: boolean) => void;
    setCurrentlyPlayingNotificationPosition: (currentlyPlayingNotificationPosition: string) => void;
    setCurrentlyPlayingNotificationDuration: (currentlyPlayingNotificationDuration: number) => void;
    setVehicleRadio: (vehicleRadio: boolean) => void;
    setVehicleRadioPlaylist: (vehicleRadioPlaylist: string) => void;
}

export const SettingsContext = createContext({} as ISettings);
export const SettingsData = (props: { children: React.ReactNode | React.ReactNode[] }) => {
    const peer = useContext(PeerContext);

    const [loaded, setLoaded] = useState(false); // Used to prevent settings from being saved before they're loaded
    const [externalControl, setExternalControl] = useState(false);
    const [currentlyPlayingNotification, setCurrentlyPlayingNotification] = useState(true);
    const [currentlyPlayingNotificationPosition, setCurrentlyPlayingNotificationPosition] = useState('top-right');
    const [currentlyPlayingNotificationDuration, setCurrentlyPlayingNotificationDuration] = useState(5);
    const [vehicleRadio, setVehicleRadio] = useState(false);
    const [vehicleRadioPlaylist, setVehicleRadioPlaylist] = useState('');

    // Load settings from local storage on startup
    useEffect(() => {
        const local = localStorage.getItem('settings');
        if (!local) {
            setLoaded(true);
            return;
        }

        const localSettings = JSON.parse(local);
        setExternalControl(localSettings.externalControl);
        setCurrentlyPlayingNotification(localSettings.currentlyPlayingNotification);
        setCurrentlyPlayingNotificationPosition(localSettings.currentlyPlayingNotificationPosition);
        setCurrentlyPlayingNotificationDuration(localSettings.currentlyPlayingNotificationDuration);
        setVehicleRadio(localSettings.vehicleRadio);
        setVehicleRadioPlaylist(localSettings.vehicleRadioPlaylist);
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        const settings = {
            externalControl,
            currentlyPlayingNotification,
            currentlyPlayingNotificationPosition,
            currentlyPlayingNotificationDuration,
            vehicleRadio,
            vehicleRadioPlaylist,
        } as ISettings; // Force type to cause error if we forget to add a setting
        localStorage.setItem('settings', JSON.stringify(settings));
        peer.connection?.send({ type: 'settingsUpdate', settings });
    }, [
        loaded,
        externalControl,
        currentlyPlayingNotification,
        currentlyPlayingNotificationPosition,
        currentlyPlayingNotificationDuration,
        vehicleRadio,
        vehicleRadioPlaylist,
        peer,
    ]);

    useEffect(() => {
        const local = localStorage.getItem('settings');
        if (!local) return;

        const localSettings = JSON.parse(local);
        setExternalControl(localSettings.externalControl);
        setCurrentlyPlayingNotification(localSettings.currentlyPlayingNotification);
        setCurrentlyPlayingNotificationPosition(localSettings.currentlyPlayingNotificationPosition);
        setCurrentlyPlayingNotificationDuration(localSettings.currentlyPlayingNotificationDuration);
        setVehicleRadio(localSettings.vehicleRadio);
        setVehicleRadioPlaylist(localSettings.vehicleRadioPlaylist);
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                externalControl,
                currentlyPlayingNotification,
                currentlyPlayingNotificationPosition,
                currentlyPlayingNotificationDuration,
                vehicleRadio,
                vehicleRadioPlaylist,
                setExternalControl,
                setCurrentlyPlayingNotification,
                setCurrentlyPlayingNotificationPosition,
                setCurrentlyPlayingNotificationDuration,
                setVehicleRadio,
                setVehicleRadioPlaylist,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
