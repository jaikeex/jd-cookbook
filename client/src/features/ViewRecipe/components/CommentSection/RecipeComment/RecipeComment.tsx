import { Box, alpha, Typography, Divider, useTheme } from '@mui/material';
import { FlexBetween } from 'components';
import type { Comment } from 'core';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface CommentProps {
  comment: Comment;
}

const RecipeComment: React.FC<CommentProps> = ({ comment }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box borderRadius={1} border={`1px solid ${alpha(theme.palette.primary.dark, 0.25)}`} p={2} mb={1}>
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
  );
};

export default RecipeComment;
