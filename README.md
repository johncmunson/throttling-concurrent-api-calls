Sometimes you need to fire off a few dozen concurrent requests to get some data. Great, Promise.all() was made for this.

However, sometimes you might need to fire off a few _thousand_ requests! Now you're at risk of getting blocked or rate-limited by the receiving server, since you're essentially unleashing a DOS attack, intentional or not.

What we need is a way to spread the load we're placing on the external service over a longer period of time... this is called throttling. This is a great use case for [p-map](https://github.com/sindresorhus/p-map) by the prolific library author [Sindre Sorhus](https://github.com/sindresorhus). It's a near drop in replacement for Promise.all(), but allows you to place a limit on the number of concurrent promises that are running at any given time.

Checkout [this page](https://github.com/sindresorhus/promise-fun) more related packages.

```js
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
```
