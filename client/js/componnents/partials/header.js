import { component_render } from "../../render/render.js";

export default function header_component(container) {
  return component_render(
    "app-header",
    `<a href="/" class="link logo">
            <span class="text text--white">t</span>
            a<span class="text text--green">p</span>p
          </a>
          <nav class="nav nav--main">
            <a href="/home" class="link link--nav">home</a>
            <a href="/account" class="link link--nav">account</a>
            <a href="/blem" class="link link--nav">blems</a>
            <a href="/discusions" class="link link--nav">discusions</a>
          </nav>
          <button class="btn btn--logout">logout</button>`,
    function () {
      console.log(this, this);
      console.log("I am header");
    },
    container,
    false,
    {
      id: "Header",
    }
  );
}
