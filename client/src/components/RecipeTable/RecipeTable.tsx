import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Sort as SortIcon } from '@mui/icons-material';
import type { Recipe } from 'types';
import { GET_RECIPES_QUERY, SEARCH_RECIPES_QUERY } from 'graphql/queries';
import { DELETE_RECIPE } from 'graphql/mutations';

interface RecipeTableProps {
  userId: string;
}

const RecipeTable: React.FC<RecipeTableProps> = ({ userId }) => {
  const [filterText, setFilterText] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortColumn, setSortColumn] = useState<'name' | 'createdAt' | 'commentsCount' | 'likesCount'>('createdAt');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteRecipeId, setDeleteRecipeId] = useState<string | null>(null);
  const md = useMediaQuery('(max-width:1200px)');
  const sm = useMediaQuery('(max-width:740px)');
  const theme = useTheme();

  const { data, loading, error, fetchMore, refetch } = useQuery(GET_RECIPES_QUERY, {
    variables: {
      userId,
      first: 10
    }
  });

  const [searchRecipes, { data: searchRecipesData }] = useLazyQuery(SEARCH_RECIPES_QUERY);

  const [deleteRecipeMutation] = useMutation(DELETE_RECIPE);

  const handleSortChange = (column: 'name' | 'createdAt' | 'commentsCount' | 'likesCount') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDirection('asc');
      setSortColumn(column);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    if (event.target.value) {
      searchRecipes({ variables: { query: event.target.value, first: 50 } });
    }
  };

  const handleDeleteClick = (recipeId: string) => {
    deleteRecipeMutation({
      variables: {
        id: recipeId
      },
      update(cache) {
        cache.modify({
          fields: {
            getRecipes(existingRecipeRefs, { readField }) {
              return existingRecipeRefs.filter(
                (recipeRef: { __ref: string; }) => readField('_id', recipeRef) !== recipeId
              );
            }
          }
        });
      }
    });
  };

  const handleDeleteDialogOpen = (id: string) => {
    setDeleteRecipeId(id);
    setOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteRecipeId(null);
    setOpen(false);
  };

  const handleDeleteRecipe = () => {
    deleteRecipeMutation({
      variables: { id: deleteRecipeId }
    });
    handleDeleteDialogClose();
    refetch({
      userId,
      first: 10
    });
  };

  useEffect(() => {
    if (filterText && searchRecipesData) {
      /* @ts-ignore */
      setRecipes(searchRecipesData.searchRecipes.edges.map(({ node }) => node));
      setHasNextPage(false);
    } else if (!filterText && data) {
      /* @ts-ignore */
      setRecipes(data.getRecipes.edges.map(({ node }) => node));
      setHasNextPage(data.getRecipes.pageInfo.hasNextPage);
    }
  }, [data, searchRecipesData, filterText]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sortedRecipes = recipes.slice().sort((a: Recipe, b: Recipe) => {
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
  });

  const recipeRows = sortedRecipes.map((node: Recipe) => (
    <React.Fragment key={node._id}>
      <TableRow key={node._id} hover>
        <TableCell>
          <Link to={`/recipe/${node._id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            {node.name}
          </Link>
        </TableCell>
        <TableCell>{new Date(parseInt(node.createdAt)).toLocaleDateString()}</TableCell>
        <TableCell>{node.comments?.length || 0}</TableCell>
        <TableCell>{node.likesCount || 0}</TableCell>
        <TableCell>
          <Link to={`/edit/${node._id}`}>
            <IconButton>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </Link>
        </TableCell>
        <TableCell>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteDialogOpen(node._id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  ));

  return (
    <Box width={md ? (sm ? '23rem' : '47rem') : '70rem'} p="2rem" m="2rem auto">
      <TextField label="Filter by name" value={filterText} onChange={handleFilterChange} fullWidth />
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                <IconButton
                  onClick={() => handleSortChange('name')}
                  color={sortColumn === 'name' ? 'success' : 'default'}
                >
                  <SortIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                Creation date
                <IconButton
                  onClick={() => handleSortChange('createdAt')}
                  color={sortColumn === 'createdAt' ? 'success' : 'default'}
                >
                  <SortIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                Comments
                <IconButton
                  onClick={() => handleSortChange('commentsCount')}
                  color={sortColumn === 'commentsCount' ? 'success' : 'default'}
                >
                  <SortIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                Likes
                <IconButton
                  onClick={() => handleSortChange('likesCount')}
                  color={sortColumn === 'likesCount' ? 'success' : 'default'}
                >
                  <SortIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{recipeRows}</TableBody>
        </Table>
      </TableContainer>
      {hasNextPage && (
        <Button
          onClick={() => {
            const { endCursor } = data.getRecipes.pageInfo;
            setSortDirection('desc');
            setSortColumn('createdAt');
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prevResult;
                }

                fetchMoreResult.getRecipes.edges = [
                  ...fetchMoreResult.getRecipes.edges,
                  ...prevResult.getRecipes.edges
                ];
                return fetchMoreResult;
              }
            });
          }}
        >
          Load More
        </Button>
      )}
      <Dialog open={open} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this recipe?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteRecipe} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecipeTable;
