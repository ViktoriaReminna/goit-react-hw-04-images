import { Button } from './Button.styled';

export const BtnLoadMore = ({ onClick, children }) => {
  return (
    <>
      <Button onClick={onClick}>{children}</Button>
    </>
  );
};
