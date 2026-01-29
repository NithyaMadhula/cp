import styled from 'styled-components';

export const GameCatagoriesContainer = styled.div`
  margin-top: -12px;

  & > a,
  p {
    margin-right: 4px;
    margin-top: 4px;
    font-size: 0.87em;
    align-self: center;
    margin-bottom: -4px;
    display: block;
  }

  & > p {
    color: ${props => props.theme.igtBlue};
  }
`;

export const CatagoriesWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;
