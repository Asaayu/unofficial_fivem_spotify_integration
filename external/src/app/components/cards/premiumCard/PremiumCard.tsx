import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const PremiumCard = (props: { variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined; showTitle?: boolean }) => {
    return (
        <>
            {props.showTitle && (
                <>
                    <Typography variant={props.variant}>Spotify Premium 📀</Typography>
                    <Typography variant="body2">
                        The use of this software requires a<Link href="https://www.spotify.com/premium/">Spotify Premium</Link>
                        subscription.
                    </Typography>
                </>
            )}
            <Card elevation={0} sx={{ p: 2, width: '85%' }}>
                <Typography variant="body2" width="100%" textAlign="center">
                    Spotify Premium lets you play any track, ad-free and with better audio quality. Go to
                    <Link href="https://www.spotify.com/premium/">spotify.com/premium</Link>
                    for more information.
                </Typography>
            </Card>
        </>
    );
};
