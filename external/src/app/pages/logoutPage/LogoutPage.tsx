import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpotifySDKContext } from '../../providers/SpotifySdk';

export default function LogoutPage() {
    const spotify = useContext(SpotifySDKContext);

    const navigate = useNavigate();

    useEffect(() => {
        spotify.sdk.logOut();
        localStorage.removeItem('hasPassedLoginPage');
        navigate('/login');
    });

    return <></>;
}
