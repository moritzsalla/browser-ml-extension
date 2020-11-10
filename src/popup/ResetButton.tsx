import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 0 auto;
  width: 100%;
  background: none;
  color: #033579;
  border: none;

  &:hover {
    background: 0;
    color: #033579;
  }
`;

const ResetButton = () => {
  function resetChromeStorage() {
    let newScore;

    chrome.storage.local.get(["score"], (result) => {
      if (newScore.length > 1) newScore = result.splice(1);
    });

    chrome.storage.local.set({
      score: newScore,
    });

    console.info("Reset sentiment storage");
  }

  return (
    <div>
      <p className="text-center">
        All data is stored on device. You can reset it below.
      </p>
      <Button
        onClick={() => resetChromeStorage()}
        className="btn btn-secondary"
      >
        Reset Data
      </Button>
    </div>
  );
};

export default ResetButton;
