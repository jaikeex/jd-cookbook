import React from 'react';
import type { DropzoneProps, DropzoneRef } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import * as Styled from './styles';
import { FormControl, FormHelperText } from '@mui/material';
import type { SxProps } from '@mui/material';

export interface CDropzoneProps extends DropzoneProps, React.RefAttributes<DropzoneRef> {
  uploadedFileSrc?: string;
  helperText?: string;
  error?: boolean;
  sx?: SxProps;
  prompt?: string;
}

export const CDropzone: React.FC<CDropzoneProps> = ({
  uploadedFileSrc = '',
  helperText = '',
  error = false,
  sx = {},
  prompt = 'Add picture',
  ...props
}): JSX.Element => {
  return (
    <Styled.OuterBox sx={sx}>
      <Dropzone
        {...props}
        accept={{
          'image/png': ['.png', '.jpg', '.jpeg']
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Styled.InnerBox {...getRootProps()}>
            <input {...getInputProps()} />
            {!uploadedFileSrc ? (
              <p>{prompt}</p>
            ) : (
              <img
                width="100%"
                src={uploadedFileSrc}
                alt="uploaded picture"
                style={{
                  maxHeight: '20rem',
                  objectFit: 'contain'
                }}
              />
            )}
          </Styled.InnerBox>
        )}
      </Dropzone>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Styled.OuterBox>
  );
};
