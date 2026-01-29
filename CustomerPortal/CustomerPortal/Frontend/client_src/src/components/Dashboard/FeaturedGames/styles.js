import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`
  ${fadeIn}
`;

export const FeaturedGamesContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  flex-direction: column;
  position: relative;

  & img {
    width: 100%;
    animation-delay: 0.3s;
    animation: 0.8s ease ${fadeInAnimation};
  }

  & .alice-carousel__wrapper {    
    & ul {
      & li {
        max-height: 400px;
      }
    }
  }
`;


export const ImageSlide = styled.div`
  width: 100%;
  height: 440px;
  /* // background: url(${props => props.bgImage}); */
  background-size: cover;
  background-position: center;
  position: relative;


  & > a {
    position: absolute;
    width: 100%;
    height: 100%;
    background: none;
    z-index: 99;
    cursor: pointer;
  }

  & img {
    width: 100%;
  }


`;

export const FeaturedGamesHeader = styled.div`
  padding-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 14px;
  margin: 1em 0 1.5em & > h2 {
    color: #000;
    margin-bottom: 8px;
    letter-spacing: 0.2px;
    font-weight: 500;
    font-size: 2.5em;
  }

  & > p {
    color: ${props => props.theme.igtGray};
    font-size: 0.98em;
    letter-spacing: 0.2px;
  }
`;
