import * as React from "react";

const ResetButton = () => {
  function resetChromeStorage() {
    const value = [];
    chrome.storage.local.set({ score: value }, function () {
      console.log("Popup reset storage to " + value);
    });
  }

  return (
    <button onClick={() => resetChromeStorage()} className="btn btn-secondary">
      Reset
    </button>
  );
};

export default ResetButton;
