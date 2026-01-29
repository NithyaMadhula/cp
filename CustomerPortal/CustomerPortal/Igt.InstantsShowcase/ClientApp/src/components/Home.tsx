import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home_stylesheet.css"
import SplashLogo  from "../assets/landing_hero2.jpg";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { userCanAnalytics } from "../shared/utils/functions";
import { Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
var fetch_data_1 = require("../shared/utils/fetch_data");

const Home = (props: any) => {
  const { user } = useSelector((state: any) => state.user);
    //const canAnalytics = userCanAnalytics(user?.profile?.name);
    const [organizationCode, setOrganizationCode] = useState(null);

    useEffect(() => {
        fetch_data_1.fetch_data.getUser().then(function (currentUser: any) {
            var orgCode = currentUser.organizationCode;
            sessionStorage.setItem("customerCode", orgCode);
            setOrganizationCode(orgCode);
        });
    }, []);

    const canAnalytics = userCanAnalytics(user?.profile?.name) && organizationCode;

  return (
      <>
        <div className="HeroContainer">
            <img src={SplashLogo} alt="Splash Landing Page"/>
        </div>

        <div className="FlavorContainer">
            <h3>
                Brightstar Printed Games
            </h3>
            <p>
                Extensive library of Brightstar exclusive game visuals. Searchable database based on theme, playstyles, options and more.
            </p>
              {user ? (
                  <>
                    <Link to="/showroom">
                        <button>Showroom</button>
                    </Link>   
                  </>
                ) : (
                <></>
            )}
            {(user && canAnalytics) ? (
                  <>
                      <br />
                      <br />
                      <br />
                        <h3>
                            Instant Games Reports and Dashboard Environment
                        </h3>
                        <p>
                            <strong>Client Exclusive:</strong> Your "always on" reports
                            center for information on game performance, historical
                            sales, game penetration, prize structure profiles and peer
                            lottery metrics.
                        </p>
                        <Link to="/analytics">
                          <Button>Access Brightstar Analytics</Button>
                        </Link>
                        </>
                        ) : (
                        <></>
              )}
              {/*<br />*/}
              {/*<br />*/}
              {/*<br />*/}
              {/*<h3>*/}
              {/*    Brightstar Instant Ticket Digital Catalog*/}
              {/*</h3>*/}
              {/*<p>*/}
              {/*    Log in to see our newest games featuring exclusive play mechanics and trending design styles.*/}
              {/*</p>*/}
              {/*{user ? (*/}
              {/*    <>*/}
              {/*        <a href="https://www.igtinstanttickets.com" >*/}
              {/*            <button>Catalog</button>*/}
              {/*        </a>*/}

              {/*    </>*/}
              {/*) : (*/}
              {/*    <></>*/}
              {/*)}*/}
                </div>
      </>
    );
};

export default Home;
