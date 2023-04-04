import React, { useState } from 'react';
import { TextField, Button, List, Box, Divider, useTheme, alpha, Typography, useMediaQuery } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_RECIPE_MUTATION } from 'core/graphql/mutations';
import type { Comment } from 'core/types';
import { GET_COMMENTS_QUERY } from 'core/graphql/queries';
import FlexBetween from 'components/FlexBetween/FlexBetween';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { useComments } from 'core/hooks/useComments';
import { RecipeComment } from './RecipeComment';

interface Props {
  recipeId: string;
}

const CommentSection: React.FC<Props> = ({ recipeId }) => {
  const [commentText, setCommentText] = useState('');
  const sm = useMediaQuery('(max-width:740px)');
  const user = useSelector((state: RootState) => state.auth.user);
  const { comments, postComment, loading } = useComments(recipeId);

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
    <div>
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
          <Button variant="contained" color="primary" type="submit" disabled={!commentText} sx={{ minWidth: 120 }}>
            Post
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CommentSection;
