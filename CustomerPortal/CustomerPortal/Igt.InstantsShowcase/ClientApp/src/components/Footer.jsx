import React from "react";

//Social Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

//Assets
import IGTLogo from "../assets/remainco_logo_rev.png";
import Malta from "../assets/mga_logo.png";
import "./Footer_Stylesheet.css"

//Styles
import { FooterContainer } from "./Footer.styles";
import { Container } from "reactstrap";

const Footer = (props) => {
    return (
        <footer className="FooterContainer">
            <img src={IGTLogo} alt="Brightstar Brand" className="FooterLogo" />
            {/*<hr className ="FooterLine" />*/}
            <p className="igt_copyright">
                &copy; <span id="FooterYear">2025</span> . All rights
                reserved.
            </p>
        </footer>
  );
};

export default Footer;