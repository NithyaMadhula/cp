import styled from 'styled-components';

export const CrumbTrailContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: center;
  max-height: 105px;
  margin-right: 20px;

  @media ${props => props.theme.tablet} {
    display: none; //Hide Filters Quick Remove
  }
`;

export const CrumbTrailBox = styled.div`
  width: 100%;
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.boxShadowInset};
  padding: 8px;
  padding-top: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  overflow: auto;
`;

export const FilterTagRemove = styled.div`
  width: 100%;
  position: absolute;
  top: 4px;
  left: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.7em;
  color: ${props => props.theme.igtLightGray};

  & > p {
    margin-left: 4px;
  }
`;

export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: ${props => props.theme.igtBlueDark};
  color: ${props => props.theme.brandWhite};
  padding: 4px 14px;
  margin: 6px;
  cursor: pointer;
  transition: 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.02);
    transition: 0.2s;
  }

  & > p {
    font-size: 0.9em;
    letter-spacing: 0.2px;
  }
`;

export const FilterTagMask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  background: none;
  color: ${props => props.theme.igtBlueDark};
  font-size: 0.01em;
`;
