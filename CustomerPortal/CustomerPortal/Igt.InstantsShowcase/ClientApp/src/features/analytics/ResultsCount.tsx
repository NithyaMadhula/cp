import * as React from "react";

const ResultsCount = (props: any) => {
  return (
    <p
      style={{
        textAlign: "right",
        color: "#002EE5",
        fontWeight: 700,
        ...props.pStyle,
      }}
    >
      {props.count} Results
    </p>
  );
};

export default ResultsCount;
