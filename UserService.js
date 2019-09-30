const Promise = require('bluebird')
const Chance = require('chance')

const chance = new Chance()

class UserService {
  async getUser(id) {
    // Simulate a network call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return chance.name()
  }

  async getUsers(ids) {
    const users = await Promise.all(ids.map(id => this.getUser(id)))
    return users
  }

  async getUsersThrottled(ids) {
    const users = await Promise.map(ids, this.getUser, { concurrency: 2 })
    return users
  }
}

const userService = new UserService()

module.exports = { userService }
