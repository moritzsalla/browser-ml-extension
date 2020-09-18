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

// run model -----------------------------

const sentiment = ml5.sentiment("movieReviews", modelReady);

function modelReady(): void {
  const prediction: { score: number } = sentiment.predict(bin);

  console.log(prediction.score);

  if (prediction.score > 0.8) {
    alert("Sentiment analysis: very positive");
  } else if (prediction.score > 0.6) {
    alert("Sentiment analysis: positive");
  } else if (prediction.score > 0.4) {
    alert("Sentiment analysis: neutral");
  } else if (prediction.score > 0.2) {
    alert("Sentiment analysis: negative");
  } else {
    alert("Sentiment analysis: Very negative");
  }
}
