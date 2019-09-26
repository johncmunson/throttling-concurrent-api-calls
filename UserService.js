const pMap = require('p-map')
const Chance = require('chance')

const chance = new Chance()

class UserService {
  async getUser(id) {
    // Simulate a network call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return chance.name()
  }

  async getUsers(ids) {
    const users = await pMap(ids, this.getUser)
    // Using pMap without concurrency is equivalent to...
    // const users = await Promise.all(userIds.map(id => getUser(id)))
    return users
  }

  async getUsersThrottled(ids) {
    const users = await pMap(ids, this.getUser, { concurrency: 2 })
    return users
  }
}

const userService = new UserService()

module.exports = { userService }
