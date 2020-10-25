import * as ml5 from "ml5";
import SenseHat from "./sensehat";

// initiate new sensehat object
const Sense = new SenseHat("192.168.0.24");

// ----------- collect data -----------

const paragraphs: NodeListOf<
  HTMLParagraphElement
> | null = document.querySelectorAll("p");

let bin: string = "";

if (paragraphs && paragraphs.length > 0) {
  paragraphs.forEach((paragraph) => {
    bin += paragraph.textContent;
  });
}

console.log(bin);

// ----------- run model -----------

// fetch ml5 model
const sentiment = ml5.sentiment("movieReviews", modelReady);

function modelReady() {
  console.log("model ready");

  const prediction = createPrediction(bin);
  let { score } = prediction;
  score = Math.round(score * 100) / 100; // round to 2 decimal places

  // set storage for popup
  chrome.storage.local.set({ key: score }, () =>
    console.log(`storage has been set to ${score}`)
  );

  // set sense hat
  Sense.setColor(255, 0, 0);
  Sense.clear();
  Sense.test();
  Sense.setColor(255, 0, 0);
}

function createPrediction(data: string): { score: number } {
  const prediction = sentiment.predict(data);
  return prediction;
}
