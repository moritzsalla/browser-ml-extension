// send to firebase -----------------------------

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyD5jY_aH8tw6aeZws45BPxcBRRTjyZ6yhU",
  authDomain: "sentiment-ml.firebaseapp.com",
  databaseURL: "https://sentiment-ml.firebaseio.com/",
};
firebase.initializeApp(config);

const database = firebase.database();

let data;

function writeUserData() {
  chrome.storage.local.get(["key"], (result: any) => {
    console.log(`${result.key} was received by popup`);
    data = {
      value: result.key,
    };
  });

  database.ref("sentiment/").push(data);
}

window.setInterval(() => writeUserData(), 10000);