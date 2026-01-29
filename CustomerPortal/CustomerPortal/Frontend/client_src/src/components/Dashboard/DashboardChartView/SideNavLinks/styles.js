import styled from 'styled-components';

export const SideNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  max-width: 100%;
  align-items: flex-start;

  @media ${props => props.theme.tablet} {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  & > li {
    margin-bottom: 12px;
    transition: 0.2s;
    font-size: 0.95em;
    font-weight: 500;
    display: flex;
    align-items: baseline;
    cursor: pointer;
    color: ${props => props.theme.igtGray};

    @media ${props => props.theme.tablet} {
      margin: 10px;
    }

    & > p {
      margin-left: 7px;
    }

    & > span {
      width: 25px;
      text-align: center;
    }

    &:hover {
      transition: 0.2s;
      color: ${props => props.theme.igtBlueDark};
      fill: ${props => props.theme.igtBlueDark};
      & svg {
        fill: ${props => props.theme.igtBlueDark};
        stroke: ${props => props.theme.igtBlueDark};
      }
    }

    & svg {
      color: ${props => props.theme.igtGray};
      stroke: ${props => props.theme.igtGray};
      fill: ${props => props.theme.igtGray};
      width: 40px;
      height: 30px;

      &:hover {
        fill: ${props => props.theme.igtBlueDark};
        stroke: ${props => props.theme.igtBlueDark};
      }
    }
  }
`;
