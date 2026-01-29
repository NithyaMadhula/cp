import styled from 'styled-components';

export const LightBoxContainer = styled.div`
  z-index: 9999;
  border-radius: ${props => props.theme.boxRadius};
  width: 50%;
  height: 50%;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px ${props => props.theme.igtGray};

  & > a {
    margin-top: 20px;
  }
`;

export const LightBoxImage = styled.img`
  width: 120px;
`;

export const LightBoxDataBox = styled.div`
  width: 75%;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const LightBoxHeader = styled.div`
  width: 75%;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
`;

export const CloseLightBox = styled.div`
  position: absolute;
  top: -40px;
  right: -95px;
  color: ${props => props.theme.warningRed};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease all;

  &:hover {
    transition: 0.3s ease all;
  }

  & > p {
    margin-left: 8px;
    margin-bottom: 3px;
  }
`;

export const GameDataWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media ${props => props.theme.tablet} {
    margin-bottom: 12px;
  }

  & > h4 {
    color: ${props => props.theme.igtBlue};
    margin-bottom: 0;
  }

  & > p {
    font-size: 0.95em;
    color: ${props => props.theme.igtGray};
    font-weight: bold;
    margin-left: 10px;
  }
`;
