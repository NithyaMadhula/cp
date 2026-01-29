import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

//Components
import Error from "../../Errors/ErrorDisplay";

//Styles
import { FeaturedGamesContainer, FeaturedGamesHeader } from "./styles";

//Images (TEMPORARY for DEMO PURPOSES)

// Images
import featured1 from "./assets/AZ 1168 LUCKY DEAL FRONT R2_1440x400.jpg";
import featured2 from "./assets/DC 1364 Red Hot Rubies FRONT R1_1440x400.jpg";
import featured3 from "./assets/DC 1431 Dia Des Los Muertos FRONT V5_1440x400.jpg";
import featured4 from "./assets/IES 22002 Ruleta FRONT_1440x400.jpg";
import featured5 from "./assets/IN 2306 25K JACKPOT FRONT R6_1440x400.jpg";
import featured6 from "./assets/IN 2325 Double Match FRONT R1_1440x400.jpg";

//Carousel Config
import { responsive } from "./carousel_config/carousel_config";

//API Data Fetch
import { fetch_data } from "../../../utils/fetch_data/fetch_data";
const { gamesFeatured } = fetch_data;

const FeaturedGames = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchFeaturedGames = () => {
    gamesFeatured().then((response) => {
      setData(response);
    });
  };

  const carouselSlider = () => {
    return (
      <AliceCarousel
        autoPlay={true}
        responsive={responsive}
        autoPlayInterval={5000}
        autoPlayDirection="rtl"
        id="featuredSlider"
      >
        <Link to="/featured-games">
          <img src={featured1} alt="featured game"></img>
        </Link>
        <img src={featured2} alt="featured game 1"></img>
        <img src={featured3} alt="featured game 2"></img>
        <img src={featured4} alt="featured game 3"></img>
        <img src={featured5} alt="featured game 4"></img>
        <img src={featured6} alt="featured game 4"></img>
        {/* {data.map(game => {
          const { gameID, imagePath } = game;
          return (
            <ImageSlide key={gameID} bgImage={imagePath}>
              <Link
                to={{
                  pathname: `/viewgame/${gameID}`,
                  state: gameID
                }}
              />
            </ImageSlide>            
          );
        })} */}
      </AliceCarousel>
    );
  };

  const errorMessage =
    "There was an issue loading the featured games. Please refresh to try again.";

  useEffect(() => {
    fetchFeaturedGames();
  }, []);

  return (
    <FeaturedGamesContainer>
      <FeaturedGamesHeader>
        <h2>Featured Games</h2>
        <p></p>
      </FeaturedGamesHeader>
      {data ? carouselSlider() : null}
      {error ? <Error message={errorMessage} closeAction={setError} /> : null}
    </FeaturedGamesContainer>
  );
};

export default FeaturedGames;
