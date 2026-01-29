import styled from 'styled-components';

//Assets
import IGTHero from './assets/igt_hero.jpg';

export const ContactContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ImageHeader = styled.div`
  width: 100%;
  background: url(${IGTHero});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 450px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 40px;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: rgba(0, 56, 98, 0.3);
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  & > h2 {
    width: 50%;
    color: ${props => props.theme.brandWhite};
    font-weight: 500;
    position: relative;
    z-index: 99;
    
    @media ${props => props.theme.tablet} {
      width: 85%;
      text-align: center;
    }
  }

  @media ${props => props.theme.tablet} {
    justify-content: center;
  }
`;

export const ContactInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 14px;
`;

export const ContactHeader = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > h3 {
    color: ${props => props.theme.igtBlue};
    margin-bottom: 8px;
  }

  & > p {
    margin-bottom: 8px;
    font-size: 0.88em;
    color: ${props => props.theme.igtGray};
    font-weight: 500;
    letter-spacing: 0.2px;
  }
`;

export const ContactInput = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media ${props => props.theme.tablet} {
    flex-flow: column;
    width: 100%;
  }

  & > input {
    padding: 12px 8px;
    width: 50%;
    border: solid 1px ${props => props.theme.igtLightGray};
    border-radius: ${props => props.theme.boxRadius};
    margin-right: 4px;
    margin-left: 4px;

    @media ${props => props.theme.tablet} {      
      width: 100%;
      margin: 10px 0;
    }    
  }

  & > button {
    padding: 11px 18px;
    background: none;
    border: none;
    color: ${props => props.theme.brandWhite};
    font-size: 0.85em;
    background: ${props => props.theme.igtBlue};
    border-radius: ${props => props.theme.boxRadius};
    margin-left: 10px;
    transition: 0.2s;

    @media ${props => props.theme.tablet} {      
      width: 100%;
      margin: 10px 0;
    }

    &:hover {
      transition: 0.2s;
      background: ${props => props.theme.igtLightGray};
      color: ${props => props.theme.brandWhite};
    }
`;
