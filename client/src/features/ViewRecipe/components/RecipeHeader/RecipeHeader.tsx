import React from 'react';
import { AccessTimeRounded, OutdoorGrillRounded } from '@mui/icons-material';
import { Typography, Divider, Box, useMediaQuery } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { FlexBetween, LikeButton, RecipeInfoTag } from 'components';
import { useRecipeContext } from '@viewRecipe/context';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from 'store';

export interface RecipeHeaderProps extends BoxProps {
  onLikeRecipe: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ onLikeRecipe, ...props }): JSX.Element => {
  const { recipe } = useRecipeContext();
  const user = useSelector((state: RootState) => state.auth.user);
  const md = useMediaQuery('(max-width:1200px)');

  return (
    <Box {...props}>
      <FlexBetween>
        <Typography variant="h1">{recipe.name}</Typography>
        <LikeButton
          defaultChecked={recipe.likedByUser}
          disabled={!user}
          onChange={onLikeRecipe}
          label={recipe.likesCount}
          labelPlacement="start"
          data-testid="recipe-like-button"
        />
      </FlexBetween>
      <Divider />
      <Box display="flex" gap="1rem" mt="0.375rem">
        <RecipeInfoTag icon={<AccessTimeRounded />} data-testid="recipe-info-cooking-time">
          <Typography variant="body2">{recipe.cookingTime} min.</Typography>
        </RecipeInfoTag>
        <RecipeInfoTag icon={<OutdoorGrillRounded />} data-testid="recipe-info-difficulty">
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {recipe.difficulty}
          </Typography>
        </RecipeInfoTag>
        <Box ml="auto" display="flex" gap="1.5rem" flexDirection={md ? 'column' : 'row'}>
          <Typography
            component={Link}
            to={`/profile/${recipe.user._id}`}
            variant="caption"
            color="primary"
            sx={{ textDecoration: 'none' }}
            data-testid="recipe-author-link"
          >
            Author: {recipe.user.username}
          </Typography>
          <Typography variant="caption">{new Date(+recipe.createdAt).toLocaleDateString()}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeHeader;
