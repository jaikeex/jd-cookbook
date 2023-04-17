import { Paper, styled } from '@mui/material';
import * as React from 'react';

const StyledPaper = styled(Paper)({
  padding: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  maxWidth: 'max-content'
});

export interface RecipeInfoTagProps extends React.PropsWithChildren {
  icon?: React.ReactNode;
}

const RecipeInfoTag: React.FC<RecipeInfoTagProps> = ({ children = null, icon = null }): JSX.Element => {
  return (
    <StyledPaper>
      {icon}
      {children}
    </StyledPaper>
  );
};

export default RecipeInfoTag;
