import { Box, TextField, useMediaQuery } from '@mui/material';
import { CButton } from 'components';
import * as React from 'react';
import { useState } from 'react';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commentText) {
      onSubmit(commentText);
      setCommentText('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

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
