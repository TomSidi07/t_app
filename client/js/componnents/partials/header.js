import { component_render } from "../../render/render.js";
import { routes, routes_vals } from "../../router/routes.js";
import { button } from "../btn.js";

import { link } from "../link.js";
import { logo } from "../logo.js";
import { nav } from "../nav.js";
export default function header_component(container) {
  const links = routes_vals.map(
    (r) => link(r.href, r.name),
    ["link", "link--nav"]
  );
  return component_render(
    "app-header",
    `${logo()}
     ${nav(links, ["nav", "nav--main"])}
     ${link("/logout", "logout", ["btn", "btn--logout"])}`,
    function () {
      console.log(this, this);
      // console.log("I am header");
    },
    container,
    false,
    {
      id: "Header",
    }
  );
}
/* 
  <nav class="nav nav--main">
            <a href="/home" class="link link--nav">home</a>
            <a href="/account" class="link link--nav">account</a>
            <a href="/blem" class="link link--nav">blems</a>
            <a href="/discusions" class="link link--nav">discusions</a>
          </nav>

*/

/* 
<a href="/" class="link logo">
            <span class="text text--white">t</span>
            a<span class="text text--green">p</span>p
          </a>

*/
