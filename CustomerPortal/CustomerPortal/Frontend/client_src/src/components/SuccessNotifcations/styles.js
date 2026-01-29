import styled from 'styled-components';

export const SuccessWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.brandWhite};
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SuccessIcon = styled.div`
  font-size: 2.5em;
  color: ${props => props.theme.successGreen};
`;

export const SuccessMessage = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 38px;
  margin-bottom: 38px;
`;

export const CloseMessage = styled.button`
  padding: 8px 15px;
  color: ${props => props.theme.brandWhite};
  background: ${props => props.theme.igtBlue};
  font-size: 0.95em;
  font-weight: bold;
  border: none;
  border-radius: ${props => props.theme.boxRadius};
`;
