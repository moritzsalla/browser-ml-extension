export function scrapeHTML(): string {
  const paragraphs: NodeListOf<
    HTMLParagraphElement
  > | null = document.querySelectorAll("p");

  let bin: string = "";

  if (paragraphs && paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => {
      bin += paragraph.textContent;
    });
  }

  return bin;
}
