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
import IGTLogo from "./assets/igt_logo_rev.png";
import Malta from "./assets/mga_logo.png";

//Styles
import {
  FooterContainer,
  LogoContainer,
  DisclaimerContainer,
  ContentContainer,
  LinkContainer,
  CopywriteLogoContainer,
  SocialLinks,
} from "./styles";

const Footer = (props) => {
  return (
    <FooterContainer>
      <footer>
        <div class="row">
          <div class="col-12">
            <div class="footer_top clearfix">
              <div class="footer_res">
                <h3>
                  <a
                    href="https://www.igt.com/explore-igt/about-igt/global-responsibility"
                    title="Global Responsibility"
                  >
                    Global Responsibility
                  </a>
                </h3>
                <p>
                  IGT is committed to operating its business with the goal of
                  creating value for all our stakeholders. Our sustainability
                  strategy focuses on social, environmental, and economic
                  responsibility.
                </p>

                <div class="row">
                  <div class="twelve columns">
                    <a
                      href="https://www.authorisation.mga.org.mt/verification.aspx?lang=EN&amp;company=e5188f40-f9ac-46d3-9cf8-4708c80bc535&amp;details=1"
                      target="_blank"
                    >
                      <img
                        style={{ width: "60px", margin: "20px 0 4px" }}
                        alt="Malta"
                        src={Malta}
                      />
                    </a>
                    <small
                      className="malta_small"
                      style={{
                        color: "#fff",
                        margin: "0",
                        fontSize: "10px",
                        lineHeight: "12px",
                      }}
                    >
                      International Game Technology PLC, a public limited
                      company organized under the laws of England and Wales, has
                      its corporate headquarters at 66 Seymour Street, 2nd
                      floor, London, W1H 5BT, United Kingdom. International Game
                      Technology PLC, together with its consolidated
                      subsidiaries, has principal operating facilities in
                      Providence, Rhode Island; Las Vegas, Nevada; and Rome,
                      Italy. IGT Malta Casino Limited is licensed by the Malta
                      Gaming Authority under a B2B Critical Supply Licence to
                      provide games to B2C operators in the European Union or
                      European Economic Area. IGT Malta Casino Limited is
                      licensed and regulated by the Malta Gaming Authority,
                      holding the license number MGA/B2B/168/2007 issued on 1st
                      August 2018. Its registration number is C 40930. The
                      registered office is located at IGT Malta Casino Limited,
                      2 Belvedere Court, Triq il-Qaliet, St. Julians STJ 3255,
                      tel: +356 21388366.
                    </small>
                  </div>
                </div>
              </div>
              <div class="footer_logo">
                <img src={IGTLogo} alt="IGT Brand" />
              </div>
            </div>
            <div class="footer_mid clearfix">
              <ul class="text_links">
                <li style={{ display: "inline", float: "left" }}>
                  <a
                    href="https://www.igt.com/-/media/7d13e6a0f5c14eb992ad305660e46e29.ashx"
                    title="Modern Slavery Act"
                    target=""
                  >
                    Modern Slavery Act
                  </a>
                </li>
                <li style={{ display: "inline", float: "left" }}>
                  <a
                    href="https://www.igt.com/en/privacy-notice"
                    title="Privacy Notice"
                    target=""
                  >
                    Privacy Notice
                  </a>
                </li>
                <li style={{ display: "inline", float: "left" }}>
                  <a
                    href="https://www.igt.com/en/terms-of-use"
                    title=""
                    target=""
                  >
                    Terms of Use
                  </a>
                </li>
                <li style={{ display: "inline", float: "left" }}>
                  <a
                    href="https://www.igt.com/en/trademarks"
                    title="Trademarks"
                    target=""
                  >
                    Trademarks
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            <div class="footer_bot clearfix">
              <p class="igt_copyright">
                &copy; <span id="FooterYear">{new Date().getFullYear()}</span> Brightstar. All rights
                reserved.
              </p>

              <ul class="icon_links">
                <li>
                  <a
                    href="http://www.facebook.com/igt"
                    title="Facebook"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.linkedin.com/company/igt"
                    title="Linkedin"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.twitter.com/igtnews"
                    title="Twitter"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.youtube.com/igt"
                    title="YouTube"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </FooterContainer>
  );
};

export default Footer;
