import React from 'react';

// Images
import chartIcon from './assets/icon-analytics.svg';
import iconTicket from './assets/icon-ticket.svg';
import iconDollar from './assets/icon-dollar.svg';
import iconDice from './assets/icon-dice.svg';
import iconBlackjack from './assets/icon-blackjack.svg';
import iconBingo from './assets/icon-bingo.svg';

import ReactSVG from 'react-svg';

//Styles
import { SideNavLinks } from './styles';

const toggleLinkClickColor = index => {
  const rawDomLinks = document.getElementsByClassName('dashboardViewSelect');
  const links = [...rawDomLinks];

  links.forEach((link, i) => {
    if (i === index) {
      console.log('hello');
      link.style.color = '#003862!important';
    } else {
      link.style.color = 'inherit';
    }
  });
};

const NavLinks = ({ setViewSelected }) => {
  return (
    <SideNavLinks>
      <li
        className="dashboardViewSelect"
        id="overview"
        onClick={() => {
          setViewSelected('overview');
          toggleLinkClickColor(0);
        }}
      >
        <ReactSVG src={chartIcon} />
        <p>Overview</p>
      </li>
      <li
        className="dashboardViewSelect"
        id="sales"
        onClick={() => {
          setViewSelected('sales');
          toggleLinkClickColor(1);
        }}
      >
        <ReactSVG src={iconDollar} />
        <p>Sales</p>
      </li>
      <li
        className="dashboardViewSelect"
        id="tickets"
        onClick={() => {
          setViewSelected('tickets');
          toggleLinkClickColor(2);
        }}
      >
        <ReactSVG src={iconTicket} />
        <p>Tickets</p>
      </li>
      {/* <li
        className="dashboardViewSelect"
        id="games"
        onClick={() => {
          setViewSelected('games');
          toggleLinkClickColor(3);
        }}
      >
        <ReactSVG src={iconBingo} />
        <p>Games</p>
      </li>
      <li
        className="dashboardViewSelect"
        id="playStyles"
        onClick={() => {
          setViewSelected('playStyles');
          toggleLinkClickColor(4);
        }}
      >
        <ReactSVG src={iconDice} />
        <p>Play Styles</p>
      </li> */}
      <li
        className="dashboardViewSelect"
        id="themes"
        onClick={() => {
          setViewSelected('themes');
          toggleLinkClickColor(5);
        }}
      >
        <ReactSVG src={iconBlackjack} />
        <p>Themes</p>
      </li>
    </SideNavLinks>
  );
};

export default NavLinks;
