import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const formFadeIn = keyframes`
    ${fadeIn};
`;

export const RequestAccessForm = styled.form`
  min-height: 400px;
  width: 55%;
  background: white;
  border-radius: ${(props) => props.theme.boxRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
  animation: 0.5s ${formFadeIn} ease;

  @media ${(props) => props.theme.mobileL} {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  min-height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* @media ${(props) => props.theme.tablet} {
    flex-direction: column;
  } */
`;

export const InputsLeft = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px;

  & > input {
    width: 100%;

    background: ${(props) => props.theme.brandWhite};
    border: solid 1px ${(props) => props.theme.igtBlue};
    padding: 15px 10px;
    border-radius: ${(props) => props.theme.boxRadius};
  }
`;

export const InputsRight = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px;

  & > input {
    width: 100%;

    background: ${(props) => props.theme.brandWhite};
    border: solid 1px ${(props) => props.theme.igtBlue};
    padding: 15px 10px;
    border-radius: ${(props) => props.theme.boxRadius};
  }
`;

export const FormSubmitDisabled = styled.button`
  padding: 8px 16px;
  border: solid 1px ${(props) => props.theme.igtLightGray};
  background: ${(props) => props.theme.igtGray};
  color: ${(props) => props.theme.igtLightGray};
  transition: 0.2s;
  font-size: 0.9em;
  font-weight: bold;
  border-radius: ${(props) => props.theme.boxRadius};
`;

export const FormSubmit = styled.button`
  padding: 8px 16px;
  border: solid 1px ${(props) => props.theme.igtBlue};
  background: ${(props) => props.theme.igtBlue};
  color: ${(props) => props.theme.brandWhite};
  transition: 0.2s;
  font-size: 0.9em;
  font-weight: bold;
  border-radius: ${(props) => props.theme.boxRadius};

  &:hover {
    transition: 0.2s;
    background: ${(props) => props.theme.brandWhite};
    color: ${(props) => props.theme.igtBlue};
  }
`;

export const FormHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: -20px;

  & > h4 {
    margin-bottom: 6px;
    color: ${(props) => props.theme.igtBlue};
  }

  & > p {
    font-size: 0.85em;

    @media ${(props) => props.theme.tablet} {
      font-size: 0.65em;
    }
  }

  @media ${(props) => props.theme.tablet} {
    margin-bottom: -10px;
  }
`;

export const RequiredWarning = styled.div`
  position: absolute;
  right: 30px;
  bottom: 5px;
  font-size: 0.75em;
  color: ${(props) => props.theme.igtGray};
  text-align: center;
`;

export const invalidEmail = {
  border: "solid 1px #ff682e",
  transition: ".2s",
};
