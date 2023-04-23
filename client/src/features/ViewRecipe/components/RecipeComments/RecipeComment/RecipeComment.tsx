import React from 'react';
import type { BoxProps } from '@mui/material';
import { Box, alpha, Typography, Divider, useTheme } from '@mui/material';
import { FlexBetween, TextLink } from 'components';
import type { Comment } from 'types';

export interface CommentProps extends BoxProps {
  comment: Comment;
}

const RecipeComment: React.FC<CommentProps> = ({ comment, ...props }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box borderRadius={1} border={`1px solid ${alpha(theme.palette.primary.dark, 0.25)}`} p={2} mb={1} {...props}>
      <FlexBetween>
        <TextLink variant="h4" to={`/profile/${comment.user._id}`}>
          {comment.user.username}
        </TextLink>
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
