const { validate, email, length, required } = require('../index')

const defaultRules = {
  fields: {
    email: {
      validator: value => {
        return length(value, { max: 75 }) && email(value)
      },
      message: 'The given email address is invalid',
    },
    password: {
      validator: value => {
        return length(value, { min: 4, max: 18 })
      },
    },
    subscription: {
      validator: value => {
        return required(value)
      },
    },
  },
}

it('initializes', () => {
  const fields = {}
  const rules = {}
  validate(fields, { rules })
})

it('returns invalid when there are no rules', () => {
  const fields = {
    password: 'homepage',
  }
  const rules = {}

  const { valid } = validate(fields, { rules })
  expect(valid).toEqual(false)
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

it('uses the given rules to validate against the fields', () => {
  const fields = {
    email: 'info@stackkit.io',
    password: 'password',
    subscription: true,
  }

  const rules = defaultRules
  const { valid } = validate(fields, { rules })
  expect(valid).toEqual(true)
})

it('validates to false when one one of the validation rules returns false', () => {
  const fields = {
    email: 'info@stackkit.io',
    password: 'password',
  }

  const rules = defaultRules
  const { valid, results } = validate(fields, { rules })
  expect(valid).toEqual(false)
  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "field": "email",
        "message": "",
        "valid": true,
        "value": "info@stackkit.io",
      },
      Object {
        "field": "password",
        "message": "",
        "valid": true,
        "value": "password",
      },
      Object {
        "field": "subscription",
        "message": "Validation failed for field 'subscription'",
        "valid": false,
        "value": undefined,
      },
    ]
  `)
})

it('supports the message object to be a function and then calls it with the field and the value', () => {
  const email = 'email@email.com'
  const validator = jest.fn(() => false)
  const message = jest.fn(
    ({ field, value }) => `The field ${field} is incorrect with value ${value}`,
  )
  const passwordMessage = 'it works with a string to'

  const fields = { email, password: 'password', subscription: true }
  const rules = {
    fields: {
      email: { validator, message },
      password: { validator, message: passwordMessage },
      subscription: { validator, message: () => undefined },
    },
  }

  const { valid, results } = validate(fields, { rules })

  expect(message).toBeCalledTimes(1)
  expect(message).toBeCalledWith({ field: 'email', value: email })
  expect(valid).toEqual(false)

  expect(results.find(item => item.field === 'email').message).toEqual(
    `The field email is incorrect with value ${email}`,
  )
  expect(results.find(item => item.field === 'password').message).toEqual(
    passwordMessage,
  )
  expect(results.find(item => item.field === 'subscription').message).toEqual(
    "Validation failed for field 'subscription'",
  )
})
