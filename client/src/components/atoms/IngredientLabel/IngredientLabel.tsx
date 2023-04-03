import { CheckRounded } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import type { Ingredient } from 'types';

export interface IngredientLabelProps {
  ingredient: Ingredient;
}

const IngredientLabel: React.FC<IngredientLabelProps> = ({ ingredient }): JSX.Element => {
  return (
    <ListItem dense>
      <ListItemIcon>
        <CheckRounded color="success" />
      </ListItemIcon>
      <ListItemText primary={`${ingredient.amount || ''} ${ingredient.name}`} />
    </ListItem>
  );
};

export default IngredientLabel;
