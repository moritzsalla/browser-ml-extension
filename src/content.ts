console.log("browser extension is active");

const headings: HTMLCollectionOf<
  HTMLHeadingElement
> | null = document.getElementsByTagName("h1");

const subheadings = document.getElementsByTagName("h2");

for (let item of headings) {
  console.log(item);
}

for (let item of subheadings) {
  console.log(item);
}
