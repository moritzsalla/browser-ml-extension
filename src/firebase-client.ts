/*
Periodically sends data to firebase real time server.
To-do: send on page change, not fixed interval
*/

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyD5jY_aH8tw6aeZws45BPxcBRRTjyZ6yhU",
  authDomain: "sentiment-ml.firebaseapp.com",
  databaseURL: "https://sentiment-ml.firebaseio.com/",
};
firebase.initializeApp(config);

const database = firebase.database();

function fetchNewestData() {
  chrome.storage.local.get(["key"], (result: any) => {
    console.log(`${result.key} was received by popup`);
    return (data = {
      value: result.key,
    });
  });
}

function writeUserData() {
  const data = fetchNewestData();
  database.ref("sentiment/").push(data);
}

window.setInterval(() => writeUserData(), 10000);
