class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
    this.all = {};
    this.model.emit = this.emit.bind(this);
    this.init(model);
  }

  list(type) {
    let t = type.toLowerCase();
    return this.all[t] || (this.all[t] = []);
  }

  on(type, handler) {
    this.list(type).push(handler);
  }

  off(type, handler) {
    let e = this.list(type), i = e.indexOf(handler);
    if (~i)
      e.splice(i, 1);
  }

  emit(type, event) {
    var _this = this;
    this.list('*').concat(_this.list(type)).forEach(f => {
      f(event);
    });
  }

  init(model) {
    this.on('change', e => {
      console.info('model has changed');
    });
    this.on('delete', e => {
      console.warn(e.name + ' has remove');
    });
    this.on('*', e => {
      console.log(this.model);
      console.log('view changed');
      this.view.renderContainer();
    });

    this.view.setModel(model);
    this.view.renderContainer();
  }
}
