import { component_render } from "../../render/render.js";
import container_home_component from "./../container_home.js";


export default function content_component(container) {
 
  return component_render(
    "app-content",
    `
    ${container_home_component()}
    
    `,
    () => {
      // connected callback
      console.log("I am content component");
    },
    container,
    false,
    { id: "Content" }
  );
}
