class SenseHat {
  address: string;
  protocol: string;

  constructor(address: string, secure: boolean) {
    this.address = address;
    this.protocol = secure ? "https" : "http";
  }

  setColor(r: number, g: number, b: number) {
    console.log("setting sensehat color");
    let http = new XMLHttpRequest();
    http.open(
      "GET",
      `${this.protocol}://${this.address}/color?r=${r}&g=${g}&b=${b}`
    );
    http.send();
  }

  clear() {
    console.log("clearing sensehat");
    let http = new XMLHttpRequest();
    http.open("GET", `${this.protocol}://${this.address}/clear`);
    http.send();
  }

  test() {
    console.log("running sensehat tests");
    let http = new XMLHttpRequest();
    http.open("GET", `${this.protocol}://${this.address}/test`);
    http.send();
  }
}

export default SenseHat;
