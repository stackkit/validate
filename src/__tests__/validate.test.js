const { validate } = require('../validate')

it('initializes', () => {
  const callback = jest.fn()

  const fields = {}
  const rules = {}

  validate(
    fields,
    {
      rules,
    },
    callback,
  )
})

it('calls the correct validation checks and calls them with the current value', () => {
  const email = 'email@email.com'
  const password = 'password'

  const fields = {
    email,
    password,
  }

  const emailValidator = jest.fn(() => true)
  const passwordValidator = jest.fn(() => true)

  const rules = {
    fields: {
      email: {
        validator: emailValidator,
      },
      password: {
        validator: passwordValidator,
      },
    },
  }

  const { valid } = validate(fields, {
    rules,
  })

  expect(valid).toEqual(true)
  expect(emailValidator).toBeCalledTimes(1)
  expect(emailValidator).toBeCalledWith(email)
  expect(passwordValidator).toBeCalledTimes(1)
  expect(passwordValidator).toBeCalledWith(password)
})

it('shows a message when a field is entered but there are no rules for it', () => {
  const fields = {
    email: 'email@email.com',
  }

  const { valid, results } = validate(fields, {
    rules: {
      fields: {},
    },
  })

  expect(valid).toEqual(false)
  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "field": "email",
        "message": "No validation rules for field 'email'",
        "valid": false,
        "value": "email@email.com",
      },
    ]
  `)
})
