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

let c = 1;
let easing = 0.1;

setInterval(function () {
  chrome.storage.local.get(["score"], (result) => {
    if (result.score.constructor === Array) {
      let val = result.score[result.score.length - 1];

      let dist = val - c;
      c += dist * easing;

      const color = {
        r: Math.round(map(c, 0, 1, 0, 255)),
        g: 0,
        b: 255,
      };

      console.log({
        incoming: val,
        current: c,
        output: color,
      });

      try {
        Sense.setColor(color.r, color.g, color.b);
      } catch (err) {
        console.error(err);
        console.error(
          "Make sure you are sending integers not floats, in a range between 0 and 255"
        );
      }
    }
  });
}, 400);

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
