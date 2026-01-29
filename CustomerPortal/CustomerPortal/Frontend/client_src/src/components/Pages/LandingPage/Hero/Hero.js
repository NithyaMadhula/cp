import React, { Component } from "react";
import Slider from "react-slick";

//Styles
import { HeroContainer1 } from "./styles";

class Hero extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3750
    };
    return (
      <Slider {...settings}>
        <HeroContainer1></HeroContainer1>
      </Slider>
    );
  }
}

export default Hero;
