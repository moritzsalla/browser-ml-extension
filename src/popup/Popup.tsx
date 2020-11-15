import * as React from "react";
import Card from "react-bootstrap/Card";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import Result from "./Result";

const Wrapper = styled(animated.div)`
  transform-origin: 50% 100%;
  font-weight: 100;
`;

const StyledCard = styled(Card)`
  border: 3px solid #033579;
  border-radius: 2.5rem;
  border-style: double;
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
    <StyledCard style={{ width: "18rem" }} className="px-2 py-5 m-2">
      <Card.Body>
        <Result score={score} />
      </Card.Body>
    </StyledCard>
  );
}
