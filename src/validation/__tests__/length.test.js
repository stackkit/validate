const { length } = require('../index')

const string = 'string'

it('checks for the length of a min value', () => {
  const result = length(string, {
    min: 4
  })

  expect(result).toEqual(true)
})

it('checks for the length of a max value', () => {
  const result = length(string, {
    max: 7
  })

  expect(result).toEqual(true)
})

it('returns false when the min length is not reached', () => {
  const result = length(string, {
    min: 100,
  })

  expect(result).toEqual(false)
})

it('returns false when the max length is not reached', () => {
  const result = length(string, {
    max: 1,
  })

  expect(result).toEqual(false)
})

it('works with a min and a max value', () => {
  const result = length('strings', {
    min: 4,
    max: 5
  })

  expect(result).toEqual(false)
})
