var model, view, controller;
var main = {
  start({ data }) {
    model = new Model(data);
    view = new View();
    ctr = new Controller(model, view);
    ctr.init();
  }
};
