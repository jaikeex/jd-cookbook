import React, { useCallback } from 'react';
import { List, Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { Comment } from 'types';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { useComments } from '@viewRecipe/hooks';
import { useRecipeContext } from '@viewRecipe/context';
import { CreateCommentForm } from './CreateCommentForm';
import { RecipeComment } from './RecipeComment';

interface RecipeCommentsProps extends BoxProps {}

const RecipeComments: React.FC<RecipeCommentsProps> = (props) => {
  const { recipe } = useRecipeContext();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { comments, postComment, loading } = useComments(recipe._id);

  const handleSubmit = useCallback(
    async (value: string) => {
      postComment(value);
    },
    [postComment]
  );

  return (
    <Box {...props}>
      <Typography gutterBottom>Comments</Typography>
      {loading ? <p>Loading comments...</p> : null}
      {comments ? (
        <List>
          {comments.map((comment: Comment, index) => (
            <RecipeComment key={comment.createdAt} comment={comment} data-testid={`recipe-comment-${index}`} />
          ))}
        </List>
      ) : null}
      <CreateCommentForm
        disabled={!isLoggedIn}
        onSubmit={handleSubmit}
        inputPlaceholder={isLoggedIn ? 'Write a comment' : 'Please login to comment'}
      />
    </Box>
  );
};

export default RecipeComments;
