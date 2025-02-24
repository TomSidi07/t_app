import app_component from "./componnents/app.js";
class App {
  constructor(container) {
    this.container = container;
    app_component(container);
  }
}

new App(document.body);
