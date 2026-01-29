import styled from 'styled-components';

export const GameViewPage = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.tablet} {
    padding: 100px 0 0;
  }  
`;
