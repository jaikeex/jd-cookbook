import * as React from 'react';

export interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = (props): JSX.Element => {
  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid black',
        borderRadius: '5px',
        boxShadow: '0 0 3px white'
      }}
    >
      LOL
    </div>
  );
};

export default NotFoundPage;
