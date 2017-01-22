class View {
  constructor() {
    this.template = '';
    this.model = {};
    this.uiEvents = {};
    this.container = $('app');
    this.containerHTML = this.container.innerHTML.trim();
    _.hide(this.container);
  }

  setModel(model) {
    this.model = model;
  }

  setTemplate(tpl) {
    this.template = tpl;
  }

  setContainer(container) {
    this.container = document.getElementById(container);
  }

  setEvents(events) {
    this.uiEvents = events;
  }

  getViewData() {
    return this.model.export();
  }

  replaceTpl(html) {
    var match = '';
    const re = /\{\{\s*([^}]+\S)\s*\}\}/g;
    let reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
      code = 'var r=[];\n',
      cursor = 0;
    var add = function(line, js) {
      js
        ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n'
        : code += line != ''
          ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n'
          : '';
      return add;
    };
    while (match = re.exec(html)) {
      add(html.slice(cursor, match.index))('this.' + match[1], true);
      cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(this.model.store);
  }

  checkContainer() {
    let tpl = this.containerHTML;
    tpl = this.replaceTpl(tpl);
    return tpl;
  }

  renderContainer() {
    let tpl = this.checkContainer();
    this.container.innerHTML = tpl;
    _.show(this.container);
    this.bindEvents();
  }

  renderTemplate(target) {
    target.innerHTML = replaceTpl(this.template);
  }

  renderBody() {
    let tpl = document.body.innerHTML;
    this.replaceTpl(tpl);
  }

  addEvent(target, event, handler) {
    target.addEventListener(event, handler, false);
  }

  removeEvent() {
    target.removeEventListener(event, handler, false);
  }

  bindEvents() {
    for (let key in this.events) {
      if (this.events.hasOwnProperty(key)) {
        let arr = key.split('|');
        addEvent($(arr[0]), arr[1], this.events[key]);
      }
    }
  }

  destory() {
    this.container && (this.container.innerHTML = '');
  }

}

function $(id) {
  return document.getElementById(id);
}
