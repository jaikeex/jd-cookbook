import { AccessTimeRounded } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import * as React from 'react';

interface RecipeInfoTagProps extends React.PropsWithChildren {
  icon?: React.ReactNode;
}

const RecipeInfoTag: React.FC<RecipeInfoTagProps> = ({ children = null, icon = null }): JSX.Element => {
  return (
    <Paper
      sx={{
        p: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: 'max-content'
      }}
    >
      {icon}
      {children}
    </Paper>
  );
};

export default RecipeInfoTag;
