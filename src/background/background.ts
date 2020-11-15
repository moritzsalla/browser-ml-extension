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

/*
********
init animation loop
and do smth with sensehat
********
*/

let c = 1;
let easing = 0.005;

let oldOutR = 0;
let oldOutG = 0;
let oldOutB = 0;

let col = {
  min: { r: 255, g: 0, b: 0 },
  max: { r: 0, g: 255, b: 0 },
};

chrome.storage.local.set({ color: col });
chrome.storage.onChanged.addListener(function (namespace) {
  if (namespace.color) col = namespace.color.newValue;
});

// create animation loop to animate sensehat
setInterval(function () {
  chrome.storage.local.get(["score"], (result) => {
    let history = 10;

    if (result.score.constructor === Array && result.score.length > history) {
      // calculate avg from last 10 entries
      let val = 0;

      for (let i = 1; i <= history; i++) {
        val += result.score[result.score.length - i];
        console.log(
          "value " + i + ": " + result.score[result.score.length - i]
        );
      }
      val /= history;

      console.log("average: " + val);

      // easing
      let dist = val - c;
      c += dist * easing;

      // map normalized color vals to rgb range: 0-255
      const { min, max } = col;
      let outR = Math.round(map(c, 0, 1, min.r, max.r));
      let outG = Math.round(map(c, 0, 1, min.g, max.g));
      let outB = Math.round(map(c, 0, 1, min.b, max.b));

      // sensehat doesnt display colors under val of 8
      if (outR < 8) outR = 8;
      if (outG < 8) outG = 8;
      if (outB < 8) outB = 8;

      // send to sensehat only when vals update
      if (oldOutR !== outR && oldOutG !== outG && oldOutB !== outB) {
        // console.log(outR, outG, outB);
        Sense.setColor(outR, outG, outB);
      }

      oldOutR = outR;
      oldOutG = outR;
      oldOutB = outR;

      // tests
      colorTest(outR);
      colorTest(outG);
      colorTest(outB);
    }
  });
}, 500);

/*
********
helper functions
********
*/

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function colorTest(c: number): void {
  if (isNaN(c)) {
    console.error(c + " is not a number");
    return;
  }
  if (c < 0 || c > 255) {
    console.error(c + " not in range 0–255");
    return;
  }
}
