import * as React from "react";
import ColorPicker from "./ColorPicker";
import ResetButton from "./ResetButton";

const Emotion = ({ value }: any) => {
  if (value >= 0.8) {
    return <>very positive</>;
  } else if (value >= 0.6) {
    return <>positive</>;
  } else if (value >= 0.4) {
    return <>negative</>;
  } else {
    return <>very negative</>;
  }
};

const Result = ({ score }: { score: number }) => (
  <>
    <h2 className="text-center">
      This website has a score of {score} and seems to be{" "}
      <Emotion value={score} />.
    </h2>

    <h1 className="text-center py-2">
      Sentiment-
      <br />
      Analysis
    </h1>

    <hr />
    <ColorPicker />
    <hr />

    <ResetButton />
  </>
);

export default Result;
