import React from 'react';
import { List, Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { Comment } from 'core/types';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { useComments } from 'features/ViewRecipe/hooks/useComments';
import { RecipeComment } from './RecipeComment';
import { useRecipeContext } from 'features/ViewRecipe/context';
import { CreateCommentForm } from './CreateCommentForm';

interface RecipeCommentsProps extends BoxProps {}

const RecipeComments: React.FC<RecipeCommentsProps> = (props) => {
  const { recipe } = useRecipeContext();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { comments, postComment, loading } = useComments(recipe._id);

  const handleSubmit = async (value: string) => {
    postComment(value);
  };

  return (
    <Box {...props}>
      <Typography gutterBottom>Comments</Typography>
      {loading && <p>Loading comments...</p>}
      {comments && (
        <List>
          {comments.map((comment: Comment, index) => (
            <RecipeComment key={comment.createdAt} comment={comment} data-testid={`recipe-comment-${index}`} />
          ))}
        </List>
      )}
      <CreateCommentForm
        disabled={!isLoggedIn}
        onSubmit={handleSubmit}
        inputPlaceholder={isLoggedIn ? 'Write a comment' : 'Please login to comment'}
      />
    </Box>
  );
};

export default RecipeComments;
