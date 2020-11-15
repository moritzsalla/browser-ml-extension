import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 0 auto;
  width: 100%;
  background: none;
  color: #033579;
  border: none;
  padding: 0.2rem 0.5rem;

  &:hover {
    background: #033579;
    color: white;
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
      <div className="d-flex justify-content-center align-items-center w-100">
        <Button
          onClick={() => resetChromeStorage()}
          className="btn btn-secondary"
        >
          Reset Data
        </Button>
      </div>
    </div>
  );
};

export default ResetButton;
