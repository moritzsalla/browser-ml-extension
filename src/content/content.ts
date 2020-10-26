import * as ml5 from "ml5";
import { scrapeHTML } from "./htmlScraper";

const result = scrapeHTML();

const sentiment = ml5.sentiment("movieReviews", () => {
  console.log("model ready");

  const prediction = createPrediction(result);
  let { score } = prediction;
  score = Math.round(score * 100) / 100; // round to 2 decimal places

  // init anim loop and do smth with sensehat
  setInterval(function () {
    console.log("test");
  }, 400);

  // set storage for popup
  chrome.storage.local.set({ key: score }, () =>
    console.log(`storage has been set to ${score}`)
  );
});

function createPrediction(data: string): { score: number } {
  const prediction = sentiment.predict(data);
  return prediction;
}
