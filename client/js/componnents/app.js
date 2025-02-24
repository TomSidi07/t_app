import { component_render } from "../render/render.js";

export default function app_component() {
  return component_render(
    "app-root",
    "<h1>Hello Tom</h1>",
    () => {
      console.log("I am render");
    },
    document.getElementById("root"),
    true,
    []
  );
}
