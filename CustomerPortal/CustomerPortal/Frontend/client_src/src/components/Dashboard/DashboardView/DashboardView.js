import React, { Component } from "react";
import { withRouter } from "react-router";

//CSS Transition
import { CSSTransition } from "react-transition-group";

//Styles
import { DashboardViewContainer } from "./styles";

//Components
import DashboardTabs from "../DashboardTabs/DashboardTabs";

//CSS Transition Vars
const transitionName = "dashboard-view";

class DashboardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentMountCssTransition: true,
    };    
  }

  clickedLink = () => {
    this.setState({ componentMountCssTransition: false });
  };

  componentWillUnmount() {
    this.setState({
      componentMountCssTransition: true,
    });
  }

  render() {
    const { componentMountCssTransition } = this.state;
    return (
      <CSSTransition
        in={componentMountCssTransition}
        classNames={transitionName}
        timeout={300}
        unmountOnExit
      >
        {() => (
          <DashboardViewContainer style={{ background: "#EEEEEE" }}>
            <DashboardTabs></DashboardTabs>
          </DashboardViewContainer>
        )}
      </CSSTransition>
    );
  }
}

export default withRouter(DashboardView);
