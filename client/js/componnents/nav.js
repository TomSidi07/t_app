export default function nav(links = [], classNames = ["nav"]) {
  return `<nav class="${classNames.join(" ")}">
  ${links.join("")}
</nav>`;
}
