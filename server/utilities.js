module.exports = {
  extend: function () {
    var object = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        object[prop] = arguments[i][prop];
      }
    }
    return object;
  },

  sendResponse: function (res) {
    return function (data) {
      res.status(200).send(data);
    };
  }
};