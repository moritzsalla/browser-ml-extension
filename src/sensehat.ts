class SenseHat {
  address: string;

  constructor(address: string) {
    this.address = address;
  }

  setColor(r: number, g: number, b: number) {
    const http = new XMLHttpRequest();
    http.open("GET", `http://${this.address}/color?r=${r}&g=${g}&b=${b}`);
    http.send();
  }

  clear() {
    const http = new XMLHttpRequest();
    http.open("GET", `http://${this.address}/clear`);
    http.send();
  }

  test() {
    const http = new XMLHttpRequest();
    http.open("GET", `http://${this.address}/test`);
    http.send();
  }
}

export default SenseHat;
