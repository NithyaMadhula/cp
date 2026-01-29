import React, { Component } from 'react';

import { withRouter } from 'react-router';

//Components
import Hero from '../Hero/Hero';
import ContentHeader from '../ContentBlocks/ContentHeader/ContentHeader';
import HomeContent from '../ContentBlocks/HomeContent/HomeContent';

//Styles
import { HomePageContainer } from './styles';

class HomePage extends Component {
  render() {
    return (
      <HomePageContainer>
        <Hero />
        <ContentHeader />
        {/* <HomeContent /> */}
      </HomePageContainer>
    );
  }
}

export default withRouter(HomePage);
