import styled from 'styled-components';

export const NoFavoritesMessageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > h3 {
    color: ${props => props.theme.warningRed};
  }

  & > p {
    font-size: 0.95em;
    color: ${props => props.theme.igtGray};
  }
`;
