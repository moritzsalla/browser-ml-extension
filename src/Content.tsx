import * as ml5 from "ml5";
import * as React from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import "reset-css";

// collect data -----------------------------

const paragraphs: NodeListOf<
  HTMLParagraphElement
> | null = document.querySelectorAll("p");

let bin: string = "";

if (paragraphs && paragraphs.length > 0) {
  paragraphs.forEach((paragraph) => {
    bin += paragraph.textContent;
  });
}

// interface -----------------------------

const Popup = () => {
  const [active, setActive] = React.useState(true);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const sentiment = ml5.sentiment("movieReviews", modelReady);

    function modelReady() {
      const prediction = sentiment.predict(bin);
      setScore(() => prediction.score);
    }
  });

  let emotion;
  if (score > 0.8) {
    emotion = "very positive";
  } else if (score > 0.6) {
    emotion = "positive";
  } else if (score > 0.4) {
    emotion = "neutral";
  } else if (score > 0.2) {
    emotion = "negative";
  } else {
    emotion = "very negative";
  }

  const anim = useSpring({
    from: { transform: `translateY(100px)` },
    to: { transform: `translateY(0px)` },
  });

  const cardStyles = {
    background: "white",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1000,
    width: "18rem",
    margin: "1rem",
    padding: "1rem",
    color: "black",
    boxShadow: "10px 10px 58px -6px rgba(0,0,0,0.25)",
    borderRadius: "5px",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  };

  if (active && score) {
    return (
      <animated.div style={{ ...cardStyles, ...anim }}>
        <div>
          <h1
            style={{
              fontSize: "2rem",
              lineHeight: "1",
              marginBottom: "1rem",
            }}
          >
            Sentiment Analysis
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.25",
              marginBottom: "1rem",
            }}
          >
            This webpage has a sentiment score of{" "}
            <span style={{ fontWeight: "bold" }}>
              {Math.round(score * 10) / 10}
            </span>{" "}
            and this seems to be{" "}
            <span style={{ fontWeight: "bold" }}>{emotion}</span>.
          </p>
          <button
            onClick={() => setActive(false)}
            style={{ fontSize: "1rem", borderRadius: "5px", padding: "1rem" }}
          >
            Exit
          </button>
        </div>
      </animated.div>
    );
  }
  return null;
};

ReactDOM.render(
  <Popup />,
  document.body.appendChild(document.createElement("DIV"))
);
