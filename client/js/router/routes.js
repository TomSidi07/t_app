import container_home_component from "../componnents/container_home.js";

export const routes = {
  home: {
    href: "/home",
    name: "home",
    component: container_home_component,
  },
  account: {
    href: "/account",
    name: "account",
  },
  blem: {
    href: "/blem",
    name: "blem",
  },
  discusions: {
    href: "/discusions",
    name: "discusions",
  },
};
class Router {
  constructor(routes) {
    this.routes = routes;
  }
  navigate_to(pathname) {
    const routes = this.routes[pathname] || this.routes["404"];
  }
}
export const routes_keys = Object.keys(routes);
export const routes_vals = Object.values(routes);
export const routes_hrefs = routes_vals.map((r) => r.href);
export const routes_names = routes_vals.map((r) => r.name);

/* 
  <nav class="nav nav--main">
            <a href="/home" class="link link--nav">home</a>
            <a href="/account" class="link link--nav">account</a>
            <a href="/blem" class="link link--nav">blems</a>
            <a href="/discusions" class="link link--nav">discusions</a>
          </nav>

*/
