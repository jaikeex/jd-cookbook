import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { COMMENT_RECIPE_MUTATION } from 'graphql/mutations';
import type { User, Comment } from 'types';
import { GET_COMMENTS_QUERY } from 'graphql/queries';

interface Props {
  recipeId: string;
}

const CommentSection: React.FC<Props> = ({ recipeId }) => {
  const [commentText, setCommentText] = useState('');

  console.log(recipeId);

  const { loading, error, data } = useQuery(GET_COMMENTS_QUERY, {
    variables: { id: recipeId }
  });

  const [commentRecipe] = useMutation(COMMENT_RECIPE_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <TextField label="Write a comment" fullWidth value={commentText} onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit" disabled={!commentText}>
          Post
        </Button>
      </form>
      {loading && <p>Loading comments...</p>}
      {error && <p>Error loading comments</p>}
      {data && (
        <List>
          {data.getComments.map((comment: Comment) => (
            <ListItem key={comment.createdAt}>
              <ListItemText primary={comment.user.username} secondary={new Date(+comment.createdAt).toDateString()} />
              <ListItemText primary={comment.text} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default CommentSection;
