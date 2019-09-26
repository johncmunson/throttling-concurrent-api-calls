const pMap = require('p-map')
const Chance = require('chance')

const chance = new Chance()

const userIds = [ 52, 84, 71, 66, 12, 39, 18, 99, 7, 48 ]

// Simulate a network call
const getUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return chance.name()
}

const getUsers = async (userIds) => {
  const users = await pMap(userIds, getUser)
  // Using pMap without concurrency is equivalent to...
  // const users = await Promise.all(userIds.map(id => getUser(id)))
  return users
}

const getUsersThrottled = async (userIds) => {
  const users = await pMap(userIds, getUser, { concurrency: 2 })
  return users
}

(async () => {
  console.time('getUsers')
  await getUsers(userIds)
  console.timeEnd('getUsers') // => Roughly 1s

  console.time('getUsersThrottled')
  await getUsersThrottled(userIds)
  console.timeEnd('getUsersThrottled') // Roughly 5s
})()
