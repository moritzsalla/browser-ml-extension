import * as React from "react";

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
    <button onClick={() => resetChromeStorage()} className="btn btn-secondary">
      Reset
    </button>
  );
};

export default ResetButton;
