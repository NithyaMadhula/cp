import styled from 'styled-components';

export const AdvancedSearchPage = styled.div`
  width: 96%;
  min-height: 100vh;
  margin: 18px auto 0;  
`;

export const AdvancedSearchHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  & > h1 {
    letter-spacing: 0.2px;
    font-weight: normal;
    color: ${props => props.theme.igtBlue};
  }

  & > p {
    font-size: 1.1em;
    color: ${props => props.theme.igtGray};
  }
`;

export const AdvancedSearchForm = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 14px 8px;
  border: solid 1px ${props => props.theme.igtLightGray};
  color: ${props => props.theme.igtGray};
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.altBoxShadow};
`;

export const SearchBtn = styled.button`
  padding: 10px 20px;
  background: ${props => props.theme.igtBlue};
  color: ${props => props.theme.brandWhite};
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.altBoxShadow};
  position: absolute;
  border: none;
  top: 120px;
  right: 8px;
`;
