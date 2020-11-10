import * as React from "react";
import Card from "react-bootstrap/Card";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import Footer from "./Footer";
import Result from "./Result";

const Wrapper = styled(animated.div)`
  transform-origin: 50% 100%;
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

export default function App() {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    chrome.storage.local.get(["score"], (result) => {
      if (result.score.constructor === Array) {
        const x = result.score[result.score.length - 1];
        setScore(x);
      }
    });
  });

  return (
    <Card style={{ width: "18rem" }} className="border-0 rounded-0 py-5 px-4">
      <Card.Body>
        <Result score={score} />
        <Footer />
      </Card.Body>
    </Card>
  );
}
