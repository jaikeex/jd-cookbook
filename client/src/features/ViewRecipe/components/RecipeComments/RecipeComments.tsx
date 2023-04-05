import React, { useState } from 'react';
import { TextField, List, Box, useMediaQuery, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import type { Comment } from 'core/types';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { useComments } from 'core/hooks/useComments';
import { RecipeComment } from './RecipeComment';
import { CButton } from 'components';
import { useRecipeContext } from 'features/ViewRecipe/context';

interface RecipeCommentsProps extends BoxProps {}

const RecipeComments: React.FC<RecipeCommentsProps> = (props) => {
  const { recipe } = useRecipeContext();
  const user = useSelector((state: RootState) => state.auth.user);
  const { comments, postComment, loading } = useComments(recipe._id);
  const [commentText, setCommentText] = useState('');

  const sm = useMediaQuery('(max-width:740px)');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commentText) {
      postComment(commentText);
      setCommentText('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <Box {...props}>
      <Typography gutterBottom>Comments</Typography>
      {loading && <p>Loading comments...</p>}
      {comments && (
        <List>
          {comments.map((comment: Comment) => (
            <RecipeComment key={comment.createdAt} comment={comment} />
          ))}
        </List>
      )}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={sm ? 'column' : 'row'} gap={2} mt={4}>
          <TextField
            disabled={!user}
            placeholder={user ? 'Write a comment' : 'Please login to comment'}
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={handleChange}
            multiline
            rows={4}
            InputProps={{
              sx: {
                fontSize: '1rem'
              }
            }}
          />
          <CButton primary type="submit" disabled={!commentText} sx={{ minWidth: 120 }}>
            Post
          </CButton>
        </Box>
      </form>
    </Box>
  );
};

export default RecipeComments;
