import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Table, TableBody, TableContainer, Button } from '@mui/material';
import type { Recipe } from 'types';
import { GET_RECIPES_QUERY, SEARCH_RECIPES_QUERY } from 'graphql/queries';
import { DELETE_RECIPE } from 'graphql/mutations';
import { CInput } from 'components/CInput';
import { RecipeTableRow } from './RecipeTableRow';
import { RecipeTableHeader } from './RecipeTableHeader';
import { useSortedRecipes } from '@profile/hooks/useSortedRecipes';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog';
import { Page } from 'components';

interface RecipeTableProps {
  userId: string;
}

const RecipeTable: React.FC<RecipeTableProps> = ({ userId }) => {
  const [filterText, setFilterText] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [deleteRecipeId, setDeleteRecipeId] = useState<string | null>(null);
  const { sortedRecipes, sortColumn, handleSortChange, resetSorting } = useSortedRecipes(recipes);

  const [searchRecipes, { data: searchRecipesData }] = useLazyQuery(SEARCH_RECIPES_QUERY);
  const [deleteRecipeMutation] = useMutation(DELETE_RECIPE);
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_RECIPES_QUERY, {
    variables: { userId, first: 20 }
  });

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(event.target.value);
      if (event.target.value) {
        searchRecipes({ variables: { userId, query: event.target.value, first: 50 } });
      }
    },
    [setFilterText, searchRecipes, userId]
  );

  const handleDeleteDialogOpen = useCallback((id: string) => setDeleteRecipeId(id), [setDeleteRecipeId]);

  const handleDeleteDialogClose = useCallback(() => setDeleteRecipeId(null), [setDeleteRecipeId]);

  const handleDeleteRecipe = useCallback(() => {
    deleteRecipeMutation({
      variables: { id: deleteRecipeId }
    });
    handleDeleteDialogClose();
    refetch({
      userId,
      first: 10
    });
  }, [deleteRecipeMutation, handleDeleteDialogClose, deleteRecipeId, refetch, userId]);

  const handleLoadMoreRecipes = useCallback(() => {
    const { endCursor } = data.getRecipes.pageInfo;
    resetSorting();
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }

        fetchMoreResult.getRecipes.edges = [...fetchMoreResult.getRecipes.edges, ...prevResult.getRecipes.edges];
        return fetchMoreResult;
      }
    });
  }, [data, resetSorting, fetchMore]);

  useEffect(() => {
    if (filterText && searchRecipesData) {
      setRecipes(searchRecipesData.searchRecipes.edges.map(({ node }: { node: Recipe; }) => node));
      setHasNextPage(false);
    } else if (!filterText && data) {
      setRecipes(data.getRecipes.edges.map(({ node }: { node: Recipe; }) => node));
      setHasNextPage(data.getRecipes.pageInfo.hasNextPage);
    }
  }, [data, searchRecipesData, filterText]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Page p="0 !important">
      <CInput
        label="Filter by name"
        value={filterText}
        onChange={handleFilterChange}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />
      <TableContainer>
        <Table stickyHeader size="small">
          <RecipeTableHeader sortedColumn={sortColumn} onSortingChange={handleSortChange} />
          <TableBody>
            {sortedRecipes.map((recipe) => (
              <RecipeTableRow key={recipe._id} recipe={recipe} onDeleteButtonClick={handleDeleteDialogOpen} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {hasNextPage && <Button onClick={handleLoadMoreRecipes}>Load More</Button>}
      <ConfirmDeleteDialog open={!!deleteRecipeId} onConfirm={handleDeleteRecipe} onClose={handleDeleteDialogClose} />
    </Page>
  );
};

export default RecipeTable;
