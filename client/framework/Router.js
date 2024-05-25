export class Router {
    constructor(routes) {
        this.routes = routes;
        window.onpopstate = () => this.route(window.location.pathname);
    }

    route(path) {
        const action = this.routes[path];
        if (action) action();
    }

    navigate(path) {
        history.pushState({}, "", path);
        this.route(path);
    }
}
