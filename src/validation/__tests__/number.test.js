const { number } = require('../index')

it('validates that a given value is a number', () => {
  expect(number(10)).toEqual(true)
  expect(number('10')).toEqual(false)
})

it('validates that a given number is a lower then the max value', () => {
  const value = 10

  expect(number(value, { max: 11 })).toEqual(true)
  expect(number(value, { max: 9 })).toEqual(false)
})

it('validates that a given number is higher then the min value', () => {
  const value = 10

  expect(number(value, { min: 9 })).toEqual(true)
  expect(number(value, { min: 11 })).toEqual(false)
})

it('validates tht a given number is between the given range', () => {
  const value = 10

  expect(number(value, { min: 9, max: 11 })).toEqual(true)
  expect(number(value, { min: 8, max: 9 })).toEqual(false)
})
