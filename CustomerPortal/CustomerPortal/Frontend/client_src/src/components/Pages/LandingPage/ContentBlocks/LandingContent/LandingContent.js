import React from "react";
import { Link } from "react-router-dom";

//Styles
import {
  ContentContainer,
  ContentWrapper,
  ContentLeft,
  ContentLeftHeader,
  ContentLeftText,
  ContentLeftLink,
  ContentImageRight,
  ContentRight,
  ContentImageLeft,
} from "./styles";

const LandingContent = (props) => {
  return (
    <>
      <ContentContainer>
        <ContentWrapper>
          <ContentLeft>
            <div>
              <ContentLeftHeader>
                In-Market IGT Games and Fresh Concepts
              </ContentLeftHeader>
              <ContentLeftText>
                <strong>Client Exclusive:</strong> Search our extensive database
                for IGT exclusive game visuals and performance data. Discover
                new game concepts based on themes, playstyles, and options
              </ContentLeftText>
              {/* <Link to="/Games">
                <ContentLeftLink type="button">
                  Concepts and Showroom
                </ContentLeftLink>
              </Link> */}
            </div>
          </ContentLeft>
          <ContentImageRight />
        </ContentWrapper>
      </ContentContainer>

      <ContentContainer>
        <ContentWrapper>
          <ContentImageLeft />
          <ContentRight>
            <div>
              <ContentLeftHeader>
                Instant Games Reports and Dashboard Environment
              </ContentLeftHeader>
              <ContentLeftText>
                Your "always on" reports center for information on game
                performance, historical sales, game penetration, prize structure
                profiles and peer lottery metrics.
              </ContentLeftText>
              {/* <Link to="/Dashboard">
                <ContentLeftLink type="button">
                  Access IGT Analytics
                </ContentLeftLink>
              </Link> */}
            </div>
          </ContentRight>
        </ContentWrapper>
      </ContentContainer>
    </>
  );
};

export default LandingContent;
