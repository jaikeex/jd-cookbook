import React from 'react';
import type { DropzoneProps, DropzoneRef } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import * as Styled from './styles';
import type { SxProps } from '@mui/material';

export interface CDropzoneProps extends DropzoneProps, React.RefAttributes<DropzoneRef> {
  uploadedFileSrc?: string;
  sx?: SxProps;
}

export const CDropzone: React.FC<CDropzoneProps> = ({ uploadedFileSrc = '', sx = {}, ...props }): JSX.Element => {
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
              <p>Add Picture Here</p>
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
    </Styled.OuterBox>
  );
};
