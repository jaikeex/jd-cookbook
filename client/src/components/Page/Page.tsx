import { Box, useMediaQuery } from '@mui/material';
import React from 'react';

export interface PageProps extends React.PropsWithChildren {}

export const Page: React.FC<PageProps> = ({ children }): JSX.Element => {
  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');

  return (
    <Box width={md ? (sm ? '23rem' : '47rem') : '70rem'} p={sm ? 3 : 4} m="2rem auto">
      {children}
    </Box>
  );
};
