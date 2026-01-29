import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const formFadeIn = keyframes`
    ${fadeIn};
`;

export const SignInForm = styled.form`
  width: 100%;
  padding: 20px calc(50% - 200px);
  min-height: 300px;
  background: ${(props) => props.theme.brandWhite};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  border-radius: ${(props) => props.theme.boxRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  animation: 0.5s ${formFadeIn} ease;

  @media ${(props) => props.theme.tablet} {
    width: 80%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  & > input {
    width: 100%;

    background: ${(props) => props.theme.brandWhite};
    border: solid 1px ${(props) => props.theme.igtBlue};
    padding: 15px 10px;
    border-radius: ${(props) => props.theme.boxRadius};
    margin-bottom: 8px;
  }
`;

export const FormHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;

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

export const FormSubmit = styled.button`
  width: 75px;
  height: 38px;
  border: solid 1px ${(props) => props.theme.igtBlue};
  background: ${(props) => props.theme.igtBlue};
  color: ${(props) => props.theme.brandWhite};
  transition: 0.2s;
  font-size: 0.9em;
  font-weight: bold;
  border-radius: ${(props) => props.theme.boxRadius};

  &:hover {
    transition: 0.2s;
    background: ${(props) => props.theme.igtLightGray};
    color: ${(props) => props.theme.igtBlue};
  }
`;
