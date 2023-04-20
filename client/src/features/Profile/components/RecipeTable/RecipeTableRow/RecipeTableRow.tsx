import React, { useCallback } from 'react';
import { TableRow, TableCell, IconButton, Tooltip, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Recipe } from 'types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export interface RecipeTableRowProps {
  onDeleteButtonClick: (id: string) => void;
  recipe: Recipe;
}

export const RecipeTableRow: React.FC<RecipeTableRowProps> = ({ onDeleteButtonClick, recipe }): JSX.Element => {
  const theme = useTheme();

  const handleDeleteButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      onDeleteButtonClick(recipe._id);
    },
    [onDeleteButtonClick]
  );

  return (
    <TableRow hover>
      <TableCell>
        <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
          {recipe.name}
        </Link>
      </TableCell>
      <TableCell>{new Date(parseInt(recipe.createdAt)).toLocaleDateString()}</TableCell>
      <TableCell>{recipe.comments?.length || 0}</TableCell>
      <TableCell>{recipe.likesCount || 0}</TableCell>
      <TableCell>
        <Link to={`/edit/${recipe._id}`}>
          <IconButton>
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          </IconButton>
        </Link>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleDeleteButtonClick}>
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
