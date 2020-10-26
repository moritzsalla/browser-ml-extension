class SenseHat {
  address: string;

  constructor(address: string) {
    this.address = address;
  }

  setColor(r: number, g: number, b: number) {
    console.log("setting sensehat color")
    let http = new XMLHttpRequest();
    http.open("GET", `https://${this.address}/color?r=${r}&g=${g}&b=${b}`);
    http.send();
  }

  clear() {
    console.log("clearing sensehat")
    let http = new XMLHttpRequest();
    http.open("GET", `https://${this.address}/clear`);
    http.send();
  }

  test() {
    console.log("running sensehat tests")
    let http = new XMLHttpRequest();
    http.open("GET", `https://${this.address}/test`);
    http.send();
  }
}

export default SenseHat;
