import app_component from "./componnents/app.js";

const root = document.getElementById("root");
class App {
  constructor(container) {
    this.container = container;
  }
}

new App(root);
console.log("connected");
console.log(app_component());
