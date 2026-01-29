import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;

  @media ${props => props.theme.tablet} {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const ChartTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;

  & h5 {
    font-weight: normal;
    font-size: 1.5em;
    text-align: left;
  }
`;

export const TotalSalesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${props => props.theme.igtGray};
  padding: 0 0 2em;
  margin: 0 0 3em 0;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }

`;

export const DataContainer = styled.div`
  height: 100%;
  width: 50%;

  @media ${props => props.theme.tablet} {
    width: 90%;
    margin: 0 auto;
  }
`;

export const DataBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80px;
  margin: 0 0 2em;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    width: 100%;
  }

  & h3 {
    font-size: 3em;
    font-weight: normal;
  }

  & p {
    font-size: 2em;
  }

`;

export const DataLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }

  & > h3 {
    letter-spacing: 0.2px;
    color: ${props => props.theme.baseColor};

    & > svg {
      margin-right: 6px;
    }

    & > img {
      width: 20px;
    }
  }

  & > span {
    margin-left: 10px;
    font-size: 0.95em;
    color: ${props => props.theme.igtGray};

    @media ${props => props.theme.tablet} {
      font-size: 1.25em;
    }

    & > svg {
      margin-right: 6px;
      font-size: 1.1em;
    }
  }
`;

export const DataTitle = styled.p`
  width: 100%;
  text-align: left;
  font-weight: 500;
  letter-spacing: 0.2px;
  margin-top: 10px;
`;
