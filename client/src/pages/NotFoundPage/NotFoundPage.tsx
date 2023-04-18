import { Typography } from '@mui/material';
import { Page } from 'components/Page/Page';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = (props): JSX.Element => {
  return (
    <Page>
      <Typography variant="h2" mb={3} textAlign="center">
        Page not Found :(
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography textAlign="center">Return to the home page</Typography>
      </Link>
    </Page>
  );
};

export default NotFoundPage;
