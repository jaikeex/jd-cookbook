import React, { useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  useTheme,
  alpha,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_RECIPE_MUTATION } from 'core/graphql/mutations';
import type { Comment } from 'core/types';
import { GET_COMMENTS_QUERY } from 'core/graphql/queries';
import FlexBetween from 'components/utils/FlexBetween/FlexBetween';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';

interface Props {
  recipeId: string;
}

const CommentSection: React.FC<Props> = ({ recipeId }) => {
  const [commentText, setCommentText] = useState('');
  const theme = useTheme();
  const sm = useMediaQuery('(max-width:740px)');
  const user = useSelector((state: RootState) => state.auth.user);

  const [commentRecipe] = useMutation(COMMENT_RECIPE_MUTATION);
  const { loading, error, data } = useQuery(GET_COMMENTS_QUERY, {
    variables: { id: recipeId }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commentText) {
      await commentRecipe({
        variables: { id: recipeId, text: commentText },
        refetchQueries: [{ query: GET_COMMENTS_QUERY, variables: { id: recipeId } }]
      });
      setCommentText('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <div>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error loading comments</p>}
      {data && (
        <List>
          {data.getComments.map((comment: Comment) => (
            <Box
              key={comment.createdAt}
              borderRadius={1}
              border={`1px solid ${alpha(theme.palette.primary.dark, 0.25)}`}
              p={2}
            >
              <FlexBetween>
                <Typography variant="h4" component={Link} to="/" color="primary" sx={{ textDecoration: 'none' }}>
                  {comment.user.username}
                </Typography>
                <Typography variant="caption">{new Date(+comment.createdAt).toLocaleDateString()}</Typography>
              </FlexBetween>
              <Divider />
              <Typography variant="body2" sx={{ mt: 2 }}>
                {comment.text}
              </Typography>
            </Box>
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
