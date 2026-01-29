import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

//Styles
import { HamburgerMenuContainer, HamburgerTray, MobileLinkContainer } from './styles';
import { NavLink } from '../styles';

//Auth
import { userAuth } from '../../../../authentication/authentication';

const HamburgerMenu = ({ toggleform }) => {
  const [openTray, setOpenTray] = useState(false);
  const [trayStyles, setTrayStyles] = useState(null);
  const [authenticated, setAuthentication] = useState(false);

  const { isAuthenticated } = userAuth;

  const toggleMenu = () => {
    setAuthentication(isAuthenticated());

    if (!openTray) {
      const openTray = {
        right: '0px',
      };

      setTrayStyles(openTray);
      setOpenTray(true);
      localStorage.setItem('signin_formToggle', JSON.stringify(true));
    } else {
      const closeTray = {
        right: '-2000px',
      };

      setTrayStyles(closeTray);
      setOpenTray(false);
      localStorage.setItem('signin_formToggle', JSON.stringify(false));
    }
  };

  //NEED TO ADD IN MONITORING SESSION STORAGE UPDATES TO HANDLE AN AUTHENTICATED USER VS UNAUTHED USER AND TO TOGGLE THE HERO SIGNUP / SIGNIN FORMS.

  //Return Links Shown IN An Authorized state
  const authorized_links = () => {
    const authorized_links = [
      {
        link: 'Home',
        route: '/',
        icon: null,
        offsite: true,
      },
      {
        link: 'Analytics',
        route: '/dashboard',
        icon: null,
        offsite: false,
      },
      {
        link: 'Games',
        route: '/games',
        icon: null,
        offsite: false,
      },
      {
        link: 'Concepts',
        route: '/concepts',
        icon: null,
        offsite: false,
      },
      // {
      //   link: 'News',
      //   route: 'http://jetfuelcreative.com/clients/igt/news',
      //   icon: null,
      //   offsite: true
      // },
      // {
      //   link: 'Contact',
      //   route: 'http://jetfuelcreative.com/clients/igt/contact',
      //   icon: null,
      //   offsite: true
      // },
      {
        link: 'Logout',
        route: '/logout',
        icon: null,
        offsite: false,
      },
    ];

    let links = [];

    authorized_links.forEach((link, i) => {
      if (link.offsite) {
        links.push(
          <a key={i} href={link.route} target="_blank" rel="noopener noreferrer">
            <NavLink onClick={toggleMenu}>{link.link}</NavLink>
          </a>
        );
      } else {
        links.push(
          <Link key={i} to={link.route} onClick={toggleMenu}>
            <NavLink>{link.link}</NavLink>
          </Link>
        );
      }
    });

    return links;
  };

  const noAuthLinkRender = () => {
    const login = 'Login';
    const requestAccess = 'Request Access';

    if (!authenticated) {
      return login;
    }

    if (!openTray) {
      return login;
    } else {
      return requestAccess;
    }
  };

  useEffect(() => {
    setAuthentication(isAuthenticated());
  }, [isAuthenticated]);

  return (
    <HamburgerMenuContainer>
      <span>
        <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
      </span>
      <HamburgerTray style={trayStyles ? trayStyles : null} id="hamburgerTray">
        {authenticated ? (
          <MobileLinkContainer>{authorized_links()}</MobileLinkContainer>
        ) : (
          <NavLink
            onClick={() => {
              toggleMenu();
              toggleform();
            }}
          >
            {noAuthLinkRender()}
          </NavLink>
        )}
      </HamburgerTray>
    </HamburgerMenuContainer>
  );
};

export default HamburgerMenu;
