import * as ml5 from "ml5";
import { scrapeHTML } from "./htmlScraper";

const result = scrapeHTML();

function createPrediction(data: string): { score: number } {
  const prediction = sentiment.predict(data);
  return prediction;
}

const sentiment = ml5.sentiment("movieReviews", () => {
  // create ml prediction
  const prediction = createPrediction(result);
  let { score } = prediction;
  score = Math.round(score * 100) / 100; // round to 2 decimal places

  // add to chrome storage
  chrome.storage.local.get(["key"], function (result) {
    let storage;

    if (Array.isArray(result.key)) {
      storage = result.key;
      storage.push(score);
      chrome.storage.local.set({ key: storage });
    } else {
      chrome.storage.local.set({ key: [score] });
    }
  });

  // check storage for debugging
  chrome.storage.local.get(["key"], function (result) {
    console.log(result.key);
  });
});
