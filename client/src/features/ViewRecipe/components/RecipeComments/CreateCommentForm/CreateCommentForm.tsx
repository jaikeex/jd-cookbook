import { Box, TextField, Button, useMediaQuery } from '@mui/material';
import * as React from 'react';
import placeholder from 'assets/placeholder.png';
import { useState } from 'react';

export interface CreateCommentFormProps {
  disabled?: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  inputPlaceholder?: string;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  disabled = false,
  onSubmit,
  inputPlaceholder = ''
}): JSX.Element => {
  const [commentText, setCommentText] = useState('');

  const sm = useMediaQuery('(max-width:740px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default CreateCommentForm;
