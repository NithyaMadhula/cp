import styled from 'styled-components';

export const ChartDisplay = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`;
