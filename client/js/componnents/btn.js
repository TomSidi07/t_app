
export  function button(content, classNames = ["btn"]) {
  return `<button class="${classNames.join(" ")}">${content}</button>`;
}
