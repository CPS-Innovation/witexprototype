/* eslint-env jest */
jest.mock('notifications-node-client', () => ({
  NotifyClient: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn()
  }))
}))

const request = require('supertest')
const app = require('../server')

describe('CPS casework homepage', () => {
  it('shows the variation 2 style homepage content for the dashboard route', async () => {
    const response = await request(app)
      .get('/FCT-v1/2-cps-user-journey/A-dashboard')
      .expect(200)

    expect(response.text).toContain('Complete your casework tasks')
    expect(response.text).toContain('Use the Casework app to manage your tasks, view your assigned cases and find a case when you need it.')
    expect(response.text).toContain('View your tasks')
    expect(response.text).toContain('View your cases')
    expect(response.text).toContain('Find a case')
    expect(response.text).toContain('What this service does')
  })
})
