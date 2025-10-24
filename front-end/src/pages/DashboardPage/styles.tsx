import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

export const ContactsList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContactItem = styled.li`
  background: #f2f2f2;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContactInfo = styled.div`
  & > h3 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 1.2em;
  }

  & > p {
    margin: 0;
    color: #666;
  }
`;
