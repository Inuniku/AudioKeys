function AudioKeys(options) {
  var self = this;

  self._setState(options);

  // all listeners are stored in arrays in their respective properties.
  // e.g. self._listeners.down = [fn1, fn2, ... ]
  self._listeners = {};

  // bind events
  // self.bind();
}

// Play well with require so that we can run a test suite and use browserify.
if(module) {
  module.exports = AudioKeys;
}
