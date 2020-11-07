import * as React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import Fallback from "./Fallback";
import ResetButton from "./ResetButton";

const Wrapper = styled(animated.div)`
  transform-origin: 50% 100%;
  display: inline-flex;
  font-weight: 100;
`;

const origin: number = -90;

const Needle = ({ value }: any) => {
  const anim = useSpring({
    from: { transform: `rotate(${origin}deg)` },
    to: { transform: `rotate(${origin + 90 * value * 2}deg)` },
    reset: true,
    config: config.stiff,
  });

  return <Wrapper style={anim}>|</Wrapper>;
};

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

export default function App() {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    chrome.storage.local.get(["score"], (result) => {
      if (result.score.constructor === Array) {
        const x = result.score[result.score.length - 1];
        console.log(`${x} was received by popup`);
        setScore(x);
      } else {
        console.log("no data received by popup");
      }
    });
  });

  if (score > 0) {
    return (
      <Card style={{ width: "18rem" }} className="m-1 shadow border-0 rounded">
        <div className="display-1 mx-auto">
          <Needle value={score} />
        </div>
        <Card.Body>
          <Card.Title>Sentiment Analysis</Card.Title>
          <Card.Text>
            This website has a score of{" "}
            <Badge pill variant="primary">
              {score}
            </Badge>{" "}
            and seems to be{" "}
            <Badge pill variant="primary">
              <Emotion value={score} />
            </Badge>
            .
          </Card.Text>
          <hr />
          <ColorPicker />
          <hr />
          <ResetButton />
        </Card.Body>
      </Card>
    );
  } else {
    return <Fallback />;
  }
}
