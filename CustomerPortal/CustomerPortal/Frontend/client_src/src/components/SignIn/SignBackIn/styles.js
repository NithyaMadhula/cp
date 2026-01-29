import styled from 'styled-components';

export const SignBackInContainer = styled.div`
  background: ${props => props.theme.igtBlue};
  min-height: 75vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SignInFormContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 450px;
  & > img {
    margin-bottom: 30px;
    width: 80px;
  }
`;
