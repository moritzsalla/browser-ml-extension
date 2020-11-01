class DataBase {
  key: string;
  localStorage: Storage;
  storage: number[];

  constructor(key: string) {
    this.key = key;
    this.localStorage = window.localStorage;
  }

  set(val: number[]): void {
    const key = this.key;
    chrome.storage.local.set({ key: val }, function () {
      console.log("Value is set to " + val);
    });
  }

  get() {
    chrome.storage.local.get(["key"], function (result) {
      console.log("Value currently is " + result.key);
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
