const { email } = require('../index')

it('returns true when a valid email is given', () => {
  const result = email('info@example.com')

  expect(result).toEqual(true)
})

it('returns false when a invalid email is given', () => {
  expect(email('info.example.com')).toEqual(false)
  expect(email('info@@example.com')).toEqual(false)
  expect(email('info...example.com')).toEqual(false)
  expect(email('info@example.com.nl.nl@asdf')).toEqual(false)
})
