import styled from "styled-components";

//Assets
import IGTContentBG from "./assets/igt_hero.jpg";

export const ContentContainer = styled.div`
  min-height: 300px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 80%;
  min-height: 200px;
  display: flex;

  @media ${(props) => props.theme.tablet} {
    flex-direction: column-reverse;
    width: 100%;
    align-items: center;
  }
`;

export const ContentLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  @media ${(props) => props.theme.tablet} {
    width: 75%;
  }
`;

export const ContentLeftHeader = styled.h3`
  color: #0c51a1;
  font-weight: Normal;
  font-style: normal;
  font-size: 24px;
  font-family: "Verlag A", "Verlag B", Arial, sans-serif;
  line-height: 1.15538em;
  text-rendering: optimizeLegibility;
`;
export const ContentLeftText = styled.p`
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 0.95em;
  font-size: 16px;
  font-family: "Lato", Arial, Helvetica, sans-serif;
  line-height: 1.625em;
`;
export const ContentLeftLink = styled.button`
  position: relative;
  display: inline-block;
  width: auto;
  height: 35.85532px;
  border-radius: 0;
  background: #1b9ddb;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  line-height: 35.85532px;
  cursor: pointer !important;
  -webkit-appearance: none;

  &:hover {
    background: #41b2e8;
  }
`;

export const ContentRight = styled.div`
  width: 50%;
  background: url(${IGTContentBG});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 50;
  height: 200px;

  @media ${(props) => props.theme.tablet} {
    margin-bottom: 15px;
    width: 75%;
  }
`;
