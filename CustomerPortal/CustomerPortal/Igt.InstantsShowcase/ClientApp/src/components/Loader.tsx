import React from "react";
import { LoaderText } from "./Loader.styles";

interface IProps {
  text?: string;
}

const Loader = (props: IProps) => {
  return (
    <>
      <div className="loader">
        {/*<div className="inner one">*/}
        {/*    <div className="ring orange">*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="inner two">*/}
        {/*    <div className="ring blue">*/}
        {/*    </div>*/}
              {/*</div>*/}
        <div className="circleLoader"></div>
      </div>
          <LoaderText>{props.text}</LoaderText>
    </>
  );
};

export default Loader;
