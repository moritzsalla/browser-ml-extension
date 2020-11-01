class SenseHat {
  address: string;
  protocol: string;

  constructor(address: string, secure: boolean) {
    this.address = address;
    this.protocol = secure ? "https" : "http";
  }

  setColor(r: number, g: number, b: number) {
    let http = new XMLHttpRequest();
    http.open(
      "GET",
      `${this.protocol}://${this.address}/color?r=${Math.round(
        r
      )}&g=${Math.round(g)}&b=${Math.round(b)}`
    );
    http.send();
  }

  clear() {
    let http = new XMLHttpRequest();
    http.open("GET", `${this.protocol}://${this.address}/clear`);
    http.send();
  }

  test() {
    let http = new XMLHttpRequest();
    http.open("GET", `${this.protocol}://${this.address}/test`);
    http.send();
  }
}

export default SenseHat;
