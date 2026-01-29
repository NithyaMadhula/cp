import React, { Component } from "react";

//Components
import RequestAccess from "../../../RequestAccess/RequestAccess";
import SignIn from "../../../SignIn/SignIn";

//Styles
import { HeroContainer } from "./styles";

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
    };
  }

  localStorageUpdated = () => {
    this.storageUpdateTimer = setInterval(() => {
      const signInFormRequested = JSON.parse(
        localStorage.getItem("signin_formToggle")
      );
      const { status } = this.state;

      if (signInFormRequested === status) {
        return;
      } else {
        this.updateState(signInFormRequested);
      }
    }, 10);
  };

  updateState(value) {
    this.setState({ status: value });
  }

  componentDidMount() {
    localStorage.setItem("signin_formToggle", JSON.stringify(false));
    if (typeof window !== "undefined") {
      this.localStorageUpdated();
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      clearInterval(this.storageUpdateTimer);
    } else {
      return; //If local storage was never set, the form defaults to Request Access
    }
  }

  render() {
    const { status } = this.state;

    return (
      <HeroContainer>{!status ? <SignIn /> : <RequestAccess />}</HeroContainer>
    );
  }
}

export default Hero;
