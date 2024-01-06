import { StyledOptions } from '@emotion/styled';
import { SxProps, Theme } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export const InternalLink = (props: {
    href?: string;
    to?: string;
    children: React.ReactNode | React.ReactNode[];
    [key: string]: string | number | boolean | React.ReactNode | React.ReactNode[] | SxProps<Theme> | StyledOptions<Theme>;
}) => {
    return (
        <Link {...props} component={RouterLink} to={props.to || props.href || ''} target="_self" rel="">
            {props.children}
        </Link>
    );
};
