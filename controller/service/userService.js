const Service = require('./service')


class userService extends Service {
  constructor(model) {
    super(model);
  }
}

module.exports = { userService }