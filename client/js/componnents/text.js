export default function text(text, classNames = ["text"]) {
  return `<span  class="${classNames.join(" ")}">${text}</span>`;
}
