import React, { useCallback, useState } from 'react';
import { Box, TextField, useMediaQuery } from '@mui/material';
import { CButton } from 'components';

interface CreateCommentFormProps {
  onSubmit: (value: string) => void;
  inputPlaceholder?: string;
  disabled?: boolean;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  disabled = false,
  onSubmit,
  inputPlaceholder = ''
}): JSX.Element => {
  const [commentText, setCommentText] = useState('');

  const sm = useMediaQuery('(max-width:740px)');

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (commentText) {
        onSubmit(commentText);
        setCommentText('');
      }
    },
    [onSubmit, setCommentText, commentText]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommentText(e.target.value);
    },
    [setCommentText]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection={sm ? 'column' : 'row'} gap={2} mt={4}>
        <TextField
          disabled={disabled}
          placeholder={inputPlaceholder}
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={handleChange}
          multiline
          rows={4}
          name="comment-input"
          data-testid="recipe-comment-input"
          InputProps={{
            sx: {
              fontSize: '1rem'
            }
          }}
        />
        <CButton
          primary
          type="submit"
          disabled={!commentText}
          sx={{ minWidth: 120 }}
          data-testid="recipe-comment-submit"
        >
          Post
        </CButton>
      </Box>
    </form>
  );
};

export default CreateCommentForm;
