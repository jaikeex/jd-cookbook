import { useState, useCallback, useMemo } from 'react';
import type { ColumnFields } from '@profile/components/RecipeTable/utils';
import type { Recipe } from 'types';

export const useSortedRecipes = (recipes: Recipe[]) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortColumn, setSortColumn] = useState<ColumnFields>('createdAt');

  const handleSortChange = useCallback(
    (column: ColumnFields) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortDirection('asc');
        setSortColumn(column);
      }
    },
    [sortColumn, sortDirection, setSortDirection, setSortColumn]
  );

  const resetSorting = useCallback(() => {
    setSortDirection('desc');
    setSortColumn('createdAt');
  }, [setSortColumn, setSortDirection]);

  const sortedRecipes = useMemo(
    () =>
      recipes.slice().sort((a: Recipe, b: Recipe) => {
        let sortValue = 0;
        if (sortColumn === 'name') {
          sortValue = a.name.localeCompare(b.name);
        } else if (sortColumn === 'createdAt') {
          sortValue = parseInt(a.createdAt) - parseInt(b.createdAt);
        } else if (sortColumn === 'commentsCount') {
          sortValue = a.comments?.length - b.comments?.length;
        } else if (sortColumn === 'likesCount') {
          sortValue = a.likesCount - b.likesCount;
        }
        return sortDirection === 'asc' ? sortValue : -sortValue;
      }),
    [recipes, sortColumn, sortDirection]
  );

  return { sortedRecipes, sortColumn, handleSortChange, resetSorting };
};
