import styled from 'styled-components';

export const PageNumberContainer = styled.div`
  width: 100% !important;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`;

export const PageNumberContainerBottom = styled.div`
  width: 100% !important;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

export const NumberWrap = styled.div`
  max-width: 80%;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  overflow: auto;
`;

export const PageNumber = styled.p`
  height: 100%;
  margin: 0;
  color: ${props => props.theme.igtBlueLight};
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  margin-left: 2px;
  margin-right: 2px;
  padding: 14px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props =>
    props.isClicked ? `${props.theme.pagNumberActive}` : ''};
  border-radius: ${props => (props.isClicked ? `50%` : '')};

  &:hover {
    color: ${props => props.theme.igtBlueDark};
    transition: 0.3s;
  }
`;

export const ArrowContainer = styled.div`
  margin-right: 12px;
  margin-left: 12px;
  & > span {
    margin-left: 6px;
    margin-right: 6px;
    color: ${props => props.theme.igtLightGray};
    cursor: pointer;
    transition: 0.3s;
  }

  & > span:hover {
    color: ${props => props.theme.igtBlueLight};
    transition: 0.3s;
  }
`;
