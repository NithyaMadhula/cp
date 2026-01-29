import * as React from "react";

import { fetch_data } from "../../shared/utils/fetch_data";

import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const { fetchLotteries, getUser } = fetch_data;

const Featured = (props: any) => {
  return (
    <Container>
      <Row className="py-5">
        <Col md="12" className="d-flex">
          <div className="my-auto w-100">
            <h2 className="header-text">Featured Games</h2>
            <hr />
          </div>
        </Col>
      </Row>
      <Row className="py-5">
        <Col md="12" className="d-flex" style={{ minHeight: "35vh" }}>
          <div className="my-auto  w-100">
            No Data.
            {/* <CarouselProvider
            naturalSlideHeight={125}
            naturalSlideWidth={100}
            totalSlides={3}
          >
            <Slider>
              <Slide index={0}>No data.</Slide>
              <Slide index={1}>No data.</Slide>
              <Slide index={2}>No data.</Slide>
            </Slider>
            <ButtonBack>Previous</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider> */}
          </div>
        </Col>
      </Row>
      <Row className="py-5">
        <Col md="12" className="d-flex">
          <div className="my-auto w-100">
            <Link to="/showroom" className="float-right">
              <Button color="primary">View Game Library</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Featured;
