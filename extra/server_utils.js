var randomize = require('randomatic');
const serverUtils = {
  generateLoginCode() {
    return randomize('?', 6, {chars: '0123456789'})
  }
};

exports.serverUtils = serverUtils;
