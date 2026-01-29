import styled from "styled-components";
import SplashLogo from "../assets/landing_hero2.jpg";


export const HeroContainer = styled.div`
    background-image: url(${SplashLogo});
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow:hidden;
`;
export const ImagePlaceholder = styled.img`
    visibility: hidden;
    object-fit: cover;
    display:block;
`;
export const FlavorContainer = styled.div`

`;
export const FlavorRow = styled.div`
    padding: 3vw 5vw 3vw 5vw
`;
export const Flavorh3 = styled.h3`
    color: #002EE5;
    font-size:calc(12px + 1.5vw);
    padding: 0 0 1vw 0;
`;
export const Flavorp = styled.p`
    font-family: "Lato",Arial,Helvetica,sans-serif;
    font-size: calc(8px + 1vw);
`;
