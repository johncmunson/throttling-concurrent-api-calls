const { userService } = require('./UserService')
const { userIds } = require('./UserData')

test('Concurrent requests take longer to resolve when they are throttled using p-map', async () => {
  jest.setTimeout(30000) // increase allowable time per test

  const startFetchingUsersTimestamp = Date.now()
  const users = await userService.getUsers(userIds)
  const receivedUsersTimestamp = Date.now()
  const timeToGetUsers = receivedUsersTimestamp - startFetchingUsersTimestamp

  const startFetchingThrottledUsersTimestamp = Date.now()
  const throttledUsers = await userService.getUsersThrottled(userIds)
  const receivedThrottledUsersTimestamp = Date.now()
  const timeToGetThrottledUsers = receivedThrottledUsersTimestamp - startFetchingThrottledUsersTimestamp

  // Use a multiplier to ensure CPU fluctuations aren't influencing the outcome of the test
  return expect(timeToGetUsers * 1.2).toBeLessThan(timeToGetThrottledUsers)
})
