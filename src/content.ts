console.log("browser extension is active");

const headings: any = document.getElementsByTagName("h1");
const subheadings: any = document.getElementsByTagName("h2");

document.querySelector("body").style.background = "red";
document.querySelector("html").style.background = "red";

document.querySelectorAll("div").forEach((elem) => {
  elem.style.background = "red";
});
