import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import App from './app/App';
import { Notification } from './app/components/notification/Notification';
import { PeerManager } from './app/providers/PeerManager';
import { Theme } from './app/providers/Theme';
import { VisibilityProvider } from './app/providers/VisibilityProvider';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MemoryRouter>
        <Theme>
            <PeerManager>
                <VisibilityProvider>
                    <App />
                </VisibilityProvider>
                <Notification />
            </PeerManager>
        </Theme>
    </MemoryRouter>
);

console.log('%cStop!', 'font: 5rem sans-serif; color: red;');
console.log(
    '%cThis is a browser feature intended for developers.\nIf someone told you to copy-paste something here to enable or unlock a feature, it is a scam and will give them access to your personal data and your Spotify account.',
    'font: 2em sans-serif; color: red;'
);
