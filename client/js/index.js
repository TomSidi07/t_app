import app_component from "./componnents/app.js";

const root = document.getElementById("root");
class App {
  constructor(container) {
    this.container = container;
    app_component(container);
  }
}

new App(root);
