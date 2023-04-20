import React, { useCallback } from 'react';
import { TableHead, TableRow, TableCell, IconButton } from '@mui/material';
import { Sort as SortIcon } from '@mui/icons-material';
import { tableColumns } from '@profile/components/RecipeTable/utils';
import type { ColumnFields } from '@profile/components/RecipeTable/utils';

export interface RecipeTableHeaderProps {
  onSortingChange: (column: ColumnFields) => void;
  sortedColumn: ColumnFields;
}

export const RecipeTableHeader: React.FC<RecipeTableHeaderProps> = ({ onSortingChange, sortedColumn }): JSX.Element => {
  const handleSortChange = useCallback((column: ColumnFields) => () => onSortingChange(column), [onSortingChange]);

  return (
    <TableHead>
      <TableRow>
        {tableColumns.map((col) => (
          <TableCell key={col.field}>
            {col.title}
            <IconButton
              onClick={handleSortChange(col.field)}
              color={sortedColumn === col.field ? 'success' : 'default'}
            >
              <SortIcon fontSize="small" />
            </IconButton>
          </TableCell>
        ))}
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};
