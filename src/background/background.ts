import SenseHat from "../background/sensehat";

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              // hostEquals:
              schemes: ["http", "https"],
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

const Sense = new SenseHat("192.168.0.24", true);

// init animation loop and do smth with sensehat
setInterval(function () {
  chrome.storage.local.get(["score"], (result) => {
    if (result.score.constructor === Array) {
      const x = result.score[result.score.length - 1];

      const color = {
        r: Math.round(x * 255),
        g: 0,
        b: Math.round(x * 255),
      };
      const { r, g, b } = color;

      try {
        Sense.setColor(r, g, b);
        console.log(`Sending ${r} ${g} ${b} to sensehat.`);
      } catch (err) {
        console.error(err);
        console.error(
          "Make sure you are sending integers not floats, in a range between 0 and 255"
        );
      }
    }
  });
}, 400);
