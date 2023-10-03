import { PaginationBtn } from './Button.styled';

export const Pagination = ({ onClick, children }) => {
  return (
    <>
      <PaginationBtn onClick={onClick}>{children}</PaginationBtn>
    </>
  );
};
