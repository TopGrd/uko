var handler;
class Router {
  constructor(router) {
    this.router = router;
    handler = this.handler.bind(this);
    this.currentCtr = null;
    this.nextCtr = null;
  }

  // 获取hash
  getRoute(route) {
    return route.split('#/')[1] || 'index';
  }

  getController(path) {
    let router = this.getRouter(this.getRoute(path));
    return router.controller;
  }

  to(path, replace) {
    if (replace) {
      window.history.replaceState(null, document.title, path);
    } else {
      window.history.pushState(null, document.title, path);
    }

    this.initView(this.getView(path), this.nextCtr);
  }

  //获取URL对应的Router
  getRouter(path) {
    return this.router.find(ele => ele.url === path);
  }
  getView(path) {
    path = this.getRoute(path);
    let route = this.getRouter(path);
    return route['view'] + '.uko';
  }

  listen() {
    window.addEventListener('popstate', handler, false);
  }

  handler(e) {
    this.nextCtr = this.getController(e.target.location.href);
    this.to(e.target.location.hash, true);
  }

  destory() {
    window.removeEventListener('popstate', handler, false);
  }

  initView(url) {
    this.currentCtr = this.nextCtr || this.currentCtr;
    ajax({ type: 'GET', url: url })
      .then(result => {
        this.currentCtr.view.containerHTML = result;
        this.currentCtr.view.renderContainer();
        //document.getElementById('app').innerHTML = result;
        console.log(this.nextCtr);
      })
      .catch(err => console.log(err));
  }

  start() {
    this.listen();
    this.currentCtr = this.getController(location.href);
    this.to(location.href);
  }
}

// example code
/*let router = new Router({
  router: [
    { url: 'index', view: './index2', controller: 'IndexController' },
    { url: 'user', view: './user', controller: 'UserController' }
  ]
});

router.start();*/
