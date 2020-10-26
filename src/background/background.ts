import "./firebase-client.ts";
import SenseHat from "../background/sensehat";

const Sense = new SenseHat("192.168.0.24", true);

// init anim loop and do smth with sensehat
setInterval(function () {
  console.log("test");
  Sense.clear();
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
