import Link from '@mui/material/Link';

import { isEnvBrowser } from './misc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ExternalLink = (props: { href: string; children: React.ReactNode; [key: string]: any }) => {
    return (
        <Link
            onClick={() => {
                const url = props.href;
                if (isEnvBrowser()) window.open(url, '_blank');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                else (window as any).invokeNative('openUrl', url);
            }}
            sx={{ cursor: 'pointer' }}
            {...props}
        >
            {props.children}
        </Link>
    );
};
