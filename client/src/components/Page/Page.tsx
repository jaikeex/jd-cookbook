import React from 'react';
import { styled } from '@mui/material';
import { Box } from '@mui/material';
import { device } from 'theme';

export const Page = styled(Box)({
  margin: '2rem auto',
  padding: '1.5rem',
  width: '23rem',

  [device.sm]: {
    padding: '2rem',
    width: '47rem'
  },

  [device.md]: {
    width: '70rem'
  }
});
