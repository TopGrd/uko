class Model {
  constructor(datasource) {
    this.store = datasource;
  }

  loadData(datasource) {
    this.store = datasource;
    this.emit('change');
  }

  fill(data) {
    if (_.isObject(data)) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.store[key] = data[key];
          this.emit('change', {
            key,
            value: data[key]
          });
        }
      }
      console.log(this);
    } else {
      _.handleError('fill data must be Object');
    }
  }

  remove(name) {

    if (this.has(name)) {
      let value = this.store[name];
      delete this.store[name];
      this.emit('delete', {
        name,
        value: value
      });
      return value;
    } else {
      return;
    }

  }

  has(name) {
    return this.store.hasOwnProperty(name);
  }

  get(name) {
    return this.store[name];
  }

  set(name, value) {
    this.store[name] = value;
    this.emit('change', {
      name,
      value: value
    });
    return value;
  }

  fetch(options) {
    return ajax(options)
      .then(data => {
        this.fill({
          result: JSON.parse(data)
        });
        return data;
      })
      .catch(err => console.log(err));
  }

  hasValue(name) {
    return  this.has(name) && this.store[name] !== null;
  }

  // 导出model为普通对象
  export() {
    return _.clone(this.store);
  }

}
