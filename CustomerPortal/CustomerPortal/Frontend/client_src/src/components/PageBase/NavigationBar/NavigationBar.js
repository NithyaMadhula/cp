import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

//Assets
import IGTLogo from "./assets/igt_logo.png";

//Components
import HamburgerMenu from "./mobile/HamburgerMenu";

//Styles
import {
  NavigationWrapper,
  NavLink,
  NavLinksContainer,
  NavLogo
} from "./styles";

//Auth
import { userAuth } from "../../../authentication/authentication";
const { isAuthenticated } = userAuth;

//NEED TO ADD IN MONITORING SESSION STORAGE UPDATES TO HANDLE AN AUTHENTICATED USER VS UNAUTHED USER AND TO TOGGLE THE HERO SIGNUP / SIGNIN FORMS.

//Return Links Shown IN An Authorized state
const authorized_links = () => {
  const authorized_links = [
    {
      link: "Home",
      route: "/",
      icon: null,
      offsite: false
    },
    {
      link: "Analytics",
      route: "/dashboard",
      icon: null,
      offsite: false
    },
    {
      link: "Games",
      route: "/games",
      icon: null,
      offsite: false
    },
    {
      link: "Concepts",
      route: "/concepts",
      icon: null,
      offsite: false
    },
    // {
    //   link: 'News',
    //   route: 'http://jetfuelcreative.com/clients/igt/news',
    //   icon: null,
    //   offsite: true
    // },
    {
      link: "Favorites",
      route: "/favorites",
      icon: null,
      offsite: false
    },
    // {
    //   link: 'Contact',
    //   route: 'http://jetfuelcreative.com/clients/igt/contact',
    //   icon: null,
    //   offsite: true
    // },
    {
      link: "Logout",
      route: "/logout",
      icon: null,
      offsite: false
    }
  ];

  let links = [];

  authorized_links.forEach((link, i) => {
    if (link.offsite) {
      links.push(
        <a key={i} href={link.route} target="_blank" rel="noopener noreferrer">
          <NavLink>{link.link}</NavLink>
        </a>
      );
    } else {
      links.push(
        <Link key={i} to={link.route}>
          <NavLink>{link.link}</NavLink>
        </Link>
      );
    }
  });

  return links;
};

const noAuthLinkRender = isFormOpen => {
  const login = "Login";
  const requestAccess = "Request Access";

  if (isFormOpen || window.location.href === `${window.location.origin}/`) {
    return login;
  } else {
    return requestAccess;
  }
};

const NavigationBar = props => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sessionSet, setSession] = useState(false);
  const [interval, initiateInterval] = useState(false);

  const toggleForm = () => {
    if (window.location.href === `${window.location.origin}/Home`) {
      !isFormOpen ? setIsFormOpen(true) : setIsFormOpen(false);
      if (!isFormOpen) {
        setIsFormOpen(true);
        localStorage.setItem("signin_formToggle", JSON.stringify(true));
      } else {
        setIsFormOpen(false);
        localStorage.setItem("signin_formToggle", JSON.stringify(false));
      }
    }
  };

  const setToggleToLocalStorage = () => {
    //Sets interval to check for user auth when navbar is loaded.
    let authInterval = setInterval(() => {
      if (isAuthenticated() === sessionSet) {
        return;
      } else {
        setSession(isAuthenticated());
      }
    }, 50);
    initiateInterval(authInterval);
  };

  useEffect(() => {
    setToggleToLocalStorage();

    return () => clearInterval(interval);
  });

  return (
    <NavigationWrapper>
      <NavLogo src={IGTLogo} alt="IGT Logo" />
      <NavLinksContainer>
        {sessionSet ? (
          authorized_links()
        ) : (
          <Link to="/Home">
            <NavLink onClick={toggleForm}>
              {noAuthLinkRender(isFormOpen)}
            </NavLink>
          </Link>
        )}
      </NavLinksContainer>
      <HamburgerMenu toggleform={toggleForm} />
    </NavigationWrapper>
  );
};

NavigationBar.propTypes = {
  links: PropTypes.array,
  toggleForm: PropTypes.func
};

export default NavigationBar;
