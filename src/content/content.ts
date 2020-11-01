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
  let sentiment = prediction.score;
  sentiment = Math.round(sentiment * 100) / 100; // round to 2 decimal places

  console.log("score: " + sentiment);

  // push to chrome storage
  chrome.storage.local.get(["score"], function (result) {
    if (Array.isArray(result.score)) {
      let val = result.score;
      val.push(sentiment);
      chrome.storage.local.set({ score: val });
    } else {
      let val = [result.score];
      chrome.storage.local.set({ score: val });
    }
  });

  // check storage for debugging
  chrome.storage.local.get(["score"], function (result) {
    console.log(result.score);
  });
});
