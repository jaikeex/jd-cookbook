import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { getGoogleUrl } from 'features/Auth/utils/getGoogleUrl';

export interface GoogleLoginProps {}

/**
 * Will be enabled at a later date.
 */
export const GoogleLogin: React.FC<GoogleLoginProps> = (): JSX.Element => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || '/';

  return (
    <Box>
      <Typography>Or continue with Google:</Typography>
      <Link to={getGoogleUrl(from)}>
        <Box
          sx={{
            backgroundColor: '#f5f6f7',
            borderRadius: 1,
            py: '0.6rem',
            columnGap: '1rem',
            textDecoration: 'none',
            color: '#393e45',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)'
            }
          }}
        >
          <GoogleIcon /> Google
        </Box>
      </Link>
    </Box>
  );
};
