import styled from 'styled-components';

export const SearchGamesContainer = styled.div`
  min-height: 100px;
  width: 100%;
  background: ${props => props.theme.altBlueBg};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Heading = styled.div`
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
`;

export const SearchInput = styled.form`
  min-width: 50%;
  position: relative;
  text-align: center;

  @media ${props => props.theme.tablet} {
    min-width: 75%;
  }

  & > input {
    padding: 12px 8px;
    width: 50%;
    border: solid 1px ${props => props.theme.igtLightGray};
    border-radius: ${props => props.theme.boxRadius};
  }

  & > button {
    padding: 11px 18px;
    background: none;
    border: none;
    color: ${props => props.theme.brandWhite};
    font-size: 0.85em;
    background: ${props => props.theme.igtBlue};
    border-radius: ${props => props.theme.boxRadius};
    margin-left: 10px;
    transition: 0.2s;

    &:hover {
      transition: 0.2s;
      background: ${props => props.theme.igtLightGray};
      color: ${props => props.theme.brandWhite};
    }
  }
`;
