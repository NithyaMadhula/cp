import React from 'react';

//Styles
import {
  ContentContainer,
  ContentWrapper,
  ContentLeft,
  ContentLeftHeader,
  ContentLeftText,
  ContentLeftLink,
  ContentRight
} from './styles';

const HomeContent = props => {
  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeft>
          <ContentLeftHeader>
            A leader in global gaming solutions.
          </ContentLeftHeader>
          <ContentLeftText>
            IGT enables players to experience their favorite games across all channels and regulated segments, from Gaming Machines and Lotteries to Digital and Social Gaming. Leveraging a wealth of premium content, substantial investment in innovation, in-depth customer intelligence, operational expertise, and leading-edge technology, our gaming solutions anticipate the demands of consumers wherever they decide to play.
          </ContentLeftText>
          <ContentLeftLink type="button">Who We Are</ContentLeftLink>
        </ContentLeft>
        <ContentRight />
      </ContentWrapper>
    </ContentContainer>
  );
};

export default HomeContent;
