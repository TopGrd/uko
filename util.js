((root, factory) => {
  root["_"] = factory();
})(this, () => {

  return {
    handleError(msg) {
      console.error(msg);
    },
    clone(objectToBeCloned) {
      // Basis.
      if (!(objectToBeCloned instanceof Object)) {
        return objectToBeCloned;
      }

      var objectClone;

      var Constructor = objectToBeCloned.constructor;
      switch (Constructor) {
        case RegExp:
          objectClone = new Constructor(objectToBeCloned);
          break;
        case Date:
          objectClone = new Constructor(objectToBeCloned.getTime());
          break;
        default:
          objectClone = new Constructor();
      }

      for (var prop in objectToBeCloned) {
        objectClone[prop] = clone(objectToBeCloned[prop]);
      }
      return objectClone;
    },
    isObject(data) {
      return Object.prototype.toString.call(data) === '[object Object]';
    },
    show(target) {
      target.style.display = 'block';
    },
    hide(target) {
      target.style.display = 'none';
    }
  }
});
