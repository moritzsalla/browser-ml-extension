import * as ml5 from "ml5";

// collect data -----------------------------
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

// run model -----------------------------
const sentiment = ml5.sentiment("movieReviews", modelReady);

function modelReady() {
  console.log("model ready");
  const prediction = createPrediction(bin);

  let { score } = prediction;
  score = Math.round(score * 100) / 100;

  // set storage
  chrome.storage.local.set({ key: score }, () =>
    console.log(`storage has been set to ${score}`)
  );
}

function createPrediction(data: string): { score: number } {
  const prediction = sentiment.predict(data);
  return prediction;
}

// send to sense hat -----------------------------
let color = {
  r: 120,
  g: 100,
  b: 200,
};

const http = new XMLHttpRequest();
http.open(
  "GET",
  `http://192.168.0.22/color?r=${color.r}&g=${color.g}&b=${color.b}`
);
http.send();
