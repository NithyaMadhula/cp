import styled from 'styled-components';

export const ErrorBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(89, 89, 89, 0.7);
  width: 100%;
  height: 100%;
  z-index: 99;
`;

export const ErrorContainer = styled.div`
  min-height: 230px;
  width: 250px;
  background: ${props => props.theme.brandWhite};
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
export const ErrorIcon = styled.div`
  font-size: 2.1em;
  color: ${props => props.theme.warningRed};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    font-size: 0.45em;
    color: ${props => props.theme.baseColor};
    margin-top: 10px;
    font-weight: bold;
  }
`;

export const ErrorMessage = styled.div`
  width: 80%;
  font-size: 0.85em;
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

export const CloseDisplay = styled.button`
  padding: 8px 25px;
  background: ${props => props.theme.igtBlue};
  color: ${props => props.theme.brandWhite};
  font-size: 0.9em;
  font-weight: bold;
  transition: 0.2s;
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.boxShadow};
  border: none;

  &:hover {
    transition: 0.2s;
    color: ${props => props.theme.brandWhite};
    background: ${props => props.theme.igtBlueDark};
  }
`;
