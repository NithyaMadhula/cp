import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  flex-wrap: wrap;
`;

export const InputMinMaxContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  margin: 6px;
  width: 50%;

  & > p {
    height: 100%;
    margin-top: 14px;
    margin-right: 8px;
    margin-left: 8px;
  }

  & > .minMaxInput {
    padding: 10px;
    width: 55%;
    border: none;
    background: '#ffffff';
    border-radius: ${props => props.theme.boxRadius};
    border: solid 1.5px ${props => props.theme.igtLightGray};
    font-size: 0.9em;
  }

  & > button {
    border: none;
    background: ${props => props.theme.igtBlue};
    color: ${props => props.theme.brandWhite};
    padding: 12px 8px;
    width: 25%;
    font-size: 0.8em;
    border-radius: ${props => props.theme.boxRadius};
    margin-left: 12px;
    transition: 0.3s;
  }

  & > .setButton {
    background: ${props => props.theme.successGreen};
    transition: 0.3s;
  }
`;

export const InputOptionContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 6px;

  & > p {
    margin-left: 8px;
  }

  & > form {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
  }

  & > form > .inputRanges {
    padding: 10px 15px;
    border-radius: 3px;
    box-shadow: ${props => props.theme.altBoxShadow};
    border: none;
    margin-left: 0px;
    border: solid 1px ${props => props.theme.igtLightGray};
  }

  & > form > .inputBreak {
    width: 15%;
    margin-top: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    margin-left: -2px;
    color: ${props => props.theme.igtGray};
  }
`;

export const InputSliderBox = styled.div`
  width: 100%;
`;

export const InputBoxHeader = styled.p`
  position: absolute;
  top: -25px;
  left: 0px;
  padding-left: 4px;
  font-size: 1.15em;
  text-transform: uppercase;
  font-weight: normal;
  letter-spacing: 0.2px;
  color: ${props => props.theme.igtBlueDark};
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 18px;
`;

export const InputLabel = styled.p`
  font-size: 0.95em;
  color: ${props => props.theme.igtGray};
  padding-left: 6px;
`;

export const SetButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  background: ${props => props.theme.igtBlue};
  color: ${props => props.theme.brandWhite};
  margin-left: 6px;
`;
