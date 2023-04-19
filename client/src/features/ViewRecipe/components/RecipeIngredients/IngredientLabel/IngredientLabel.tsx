import React from 'react';
import { CheckRounded } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import type { Ingredient } from 'types';

export interface IngredientLabelProps {
  ingredient: Ingredient;
}

const IngredientLabel: React.FC<IngredientLabelProps> = ({ ingredient }): JSX.Element => {
  return (
    <ListItem dense>
      <ListItemIcon sx={{ minWidth: '2.5rem' }}>
        <CheckRounded color="success" />
      </ListItemIcon>
      <ListItemText primary={`${ingredient.amount || ''} ${ingredient.name}`} />
    </ListItem>
  );
};

export default IngredientLabel;
