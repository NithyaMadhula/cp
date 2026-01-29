import styled from 'styled-components';

//Assets
import ContentHeaderBG from './assets/content_header.jpg';

export const ContentHeaderContainer = styled.div`
  min-height: 300px;
  width: 100%;
  background-image: url(${ContentHeaderBG});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
  padding-bottom: 30px;
`;

export const ContentHeaderText = styled.p`
  color: ${props => props.theme.brandWhite};
  font-size: 1.5em;
  letter-spacing: 0.3px;
  width: 40%;
  text-align: center;
  font-weight: lighter;
`;
