import { BRAND } from '@asaayu-base/brand';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import { SpotifySDK } from './app/providers/SpotifySdk';
import { Theme } from './app/providers/Theme';
import { UserData } from './app/providers/UserData';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={`${BRAND.baseUrl}`}>
        <Theme>
            <UserData>
                <SpotifySDK>
                    <App />
                </SpotifySDK>
            </UserData>
        </Theme>
    </BrowserRouter>
);

console.log('%cStop!', 'font: 5rem sans-serif; color: red;');
console.log(
    '%cThis is a browser feature intended for developers.\nIf someone told you to copy-paste something here to enable or unlock a feature, it is a scam and will give them access to your personal data and your Spotify account.',
    'font: 2em sans-serif; color: red;'
);
