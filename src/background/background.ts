import "./firebase-client.ts";
import SenseHat from "../background/sensehat";

const Sense = new SenseHat("192.168.0.24", true);

// init animation loop and do smth with sensehat
setInterval(function () {
  chrome.storage.local.get(["key"], (result) => {
      if (result.key.constructor === Array) {
        const x = result.key[result.key.length - 1];

        Sense.setColor(x * 255, x * 255, x * 255);
        console.log(`${x} was received by background script`);
      } else {
        console.log("no data received by background script");
      }
  });
}, 400);

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
