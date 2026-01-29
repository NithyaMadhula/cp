import styled from 'styled-components';

import IGTHero1 from '../../../../assets/landing_hero.jpg';

export const HeroContainer = styled.div`
  min-width: 100%;
  height: 20vw;
  background-image: url(${IGTHero1});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;
