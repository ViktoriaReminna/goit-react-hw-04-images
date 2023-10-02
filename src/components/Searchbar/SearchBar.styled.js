import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 400px; 
  margin: 0 auto; 

  position: relative;

  margin-bottom: 20px; 
`;

export const Input = styled.input`
  width: 100%;
  height: 40px; 

  border: none;
  border-bottom: 1px solid #000; 
  background-color: transparent;

  padding: 8px;
  padding-right: 40px; 
  outline: none;

  transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s; 

  font-size: 16px; 
  color: #000; 
  font-weight: 300;
  letter-spacing: 0.03em;

  &::placeholder {
    font-weight: 200;
  }
`;

export const InputBtn = styled.button`
  width: 40px; 
  height: 40px; 

  font-size: 16px;
  font-weight: bold;
  color: #000; 

  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  cursor: pointer;
`;
