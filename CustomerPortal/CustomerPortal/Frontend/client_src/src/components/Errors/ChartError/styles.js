import styled from 'styled-components';

export const ChartErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 6px;
`;

export const ChartErrorIcon = styled.div`
  color: ${props => props.theme.warningRed};
  font-size: 2em;
`;

export const ChartMessage = styled.p`
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: 0.2px;
  width: 85%;
  text-align: center;
  color: ${props => props.theme.igtGray};
  margin-top: 10px;
`;
