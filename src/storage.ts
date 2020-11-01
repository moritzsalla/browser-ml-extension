class DataBase {
  score: string;
  localStorage: Storage;
  storage: number[];

  constructor(score: string) {
    this.score = score;
    this.localStorage = window.localStorage;
  }

  set(val: number[]): void {
    const score = this.score;
    chrome.storage.local.set({ score: val }, function () {
      console.log("Value is set to " + val);
    });
  }

  get() {
    chrome.storage.local.get(["score"], function (result) {
      console.log("Value currently is " + result.score);
    });
  }

  clear(): void {
    this.storage = [];
    this.localStorage.clear();
  }

  log(): void {
    console.log(this.localStorage.getItem(this.id));
  }
}
