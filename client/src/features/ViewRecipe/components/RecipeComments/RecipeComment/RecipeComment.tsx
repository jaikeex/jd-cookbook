import React from 'react';
import type { BoxProps } from '@mui/material';
import { Box, alpha, Typography, Divider, useTheme } from '@mui/material';
import { FlexBetween } from 'components';
import type { Comment } from 'types';
import { Link } from 'react-router-dom';

export interface CommentProps extends BoxProps {
  comment: Comment;
}

const RecipeComment: React.FC<CommentProps> = ({ comment, ...props }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box borderRadius={1} border={`1px solid ${alpha(theme.palette.primary.dark, 0.25)}`} p={2} mb={1} {...props}>
      <FlexBetween>
        <Typography
          variant="h4"
          component={Link}
          to={`/profile/${comment.user._id}`}
          color="primary"
          sx={{ textDecoration: 'none' }}
        >
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
