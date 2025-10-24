import styled from 'styled-components';

export const StyledButton = styled.button`
  width: calc(100% - 20px);
  padding: 16px 20px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #046ee5;
  color: white;
  margin-left: 7px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &,
  a {
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }
`;
