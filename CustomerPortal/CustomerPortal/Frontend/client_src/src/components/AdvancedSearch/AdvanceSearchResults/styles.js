import styled from 'styled-components';

export const CatalogPage = styled.div`
  min-height: 100vh;
`;

export const CatalogViewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  position: relative;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export const CatalogCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;
  margin-left: 50px;

  @media ${props => props.theme.tablet} {
    min-width: 100%;
  }
`;

export const CatalogPageHeader = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h3 {
    color: ${props => props.theme.igtBlue};
  }
`;

export const ReturnToGamesPage = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 0.9em;

  & > a {
    color: ${props => props.theme.igtGray};
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      transition: 0.2s;
      color: ${props => props.theme.igtBlue};
    }
  }

  & > a span {
    color: ${props => props.theme.igtBlueDark};
    margin-right: 6px;
    font-weight: bold;
  }
`;
