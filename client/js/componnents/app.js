import { component_render } from "../render/render.js";
import container_home_component from "./container_home.js";


export default function app_component() {
  let tagname = "app-root";
  return component_render(
    tagname,
    `${container_home_component(tagname)}`,
    () => {
      console.log("I am app");
    },
    document.getElementById("root"),
    true
    // [header_component(tagname)]
  );
}
