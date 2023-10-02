import React from 'react';
import { Button } from './Button.styled';

export const BtnLoadMore = ({ click }) => {
  return (
    <Button type="button" onClick={click}>
      Load more...
    </Button>
  );
};
