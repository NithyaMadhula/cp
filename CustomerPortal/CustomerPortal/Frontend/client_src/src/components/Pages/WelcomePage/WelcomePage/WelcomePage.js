import React, { Component } from 'react';

import { withRouter } from 'react-router';

//Components
import Hero from '../Hero/Hero';
import LandingContent from '../ContentBlocks/LandingContent/LandingContent';

//Styles
import { LandingPageContainer } from './styles';

class LandingPage extends Component {
  render() {
    return (
      <LandingPageContainer>
        <Hero />
        <LandingContent />
      </LandingPageContainer>
    );
  }
}

export default withRouter(LandingPage);
