const { userService } = require('./UserService')
const { userIds } = require('./UserData')

;(async () => {
  let users

  console.time('getUsers')
  users = await userService.getUsers(userIds)
  console.log(users)
  console.timeEnd('getUsers') // => Roughly 1s

  console.time('getUsersThrottled')
  users = await userService.getUsersThrottled(userIds)
  console.log(users)
  console.timeEnd('getUsersThrottled') // Roughly 5s
})()
