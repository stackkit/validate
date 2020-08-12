const { required } = require('../index')

it('validates that the value is not undefined or null', () => {
  expect(required(null)).toEqual(false)
  expect(required(undefined)).toEqual(false)
})

it('validates to true when a string, number boolean or object is given', () => {
  expect(required({ test: true })).toEqual(true)
  expect(required('test')).toEqual(true)
  expect(required(10)).toEqual(true)
  expect(required(false)).toEqual(true)
})
