// ================================================================
// Event Listeners
// ================================================================

// AudioKeys has a very simple event handling system. Internally
// we'll call self._trigger('down', argument) when we want to fire
// an event for the user.

module.exports = {
  down: function(fn) {
    var self = this;

    // add the function to our list of listeners
    self._listeners.down = (self._listeners.down || []).concat(fn);
  },

  up: function(fn) {
    var self = this;

    // add the function to our list of listeners
    self._listeners.up = (self._listeners.up || []).concat(fn);
  },

  _trigger: function(action /* args */) {
    var self = this;

    // if we have any listeners by this name ...
    if(self._listeners[action] && self._listeners[action].length) {
      // grab the arguments to pass to the listeners ...
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 1);
      // and call them!
      self._listeners[action].forEach( function(fn) {
        fn.apply(self, args);
      });
    }
  },

  // ================================================================
  // DOM Bindings
  // ================================================================

  _bind: function() {
    var self = this;

    if(typeof window !== 'undefined' && window.document) {
      self._handleDown = (e) => {
        self._addKey(e);
      };
    
      self._handleUp = (e) =>{
        self._removeKey(e);
      };
      window.document.addEventListener('keydown', self._handleDown);
      window.document.addEventListener('keyup', self._handleUp);

      var lastFocus = true;
      self._interval = setInterval( function() {
        if(window.document.hasFocus() === lastFocus) {
          return;
        }
        lastFocus = !lastFocus;
        if(!lastFocus) {
          self.clear();
        }
      }, 100);
    }
  },
  _unbind: function() {
    var self = this;

    if(typeof window !== 'undefined' && window.document) {
      window.document.removeEventListener('keydown', self._handleDown);
      window.document.addEventListener('keyup', self._handleUp);
      clearInterval(self._interval);
    }
  }
};
