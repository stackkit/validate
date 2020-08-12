const { validate, email, length, required } = require('../validate')

const defaultRules = {
  fields: {
    email: {
      validator: (value) => {
        return length(value, { max: 75 }) && email(value)
      },
      message: 'The given email address is invalid',
    },
    password: {
      validator: (value) => {
        return length(value, { min: 4, max: 18 })
      },
    },
    subscription: {
      validator: (value) => {
        return required(value)
      }
    }
  }
}

it('initializes', () => {
  const fields = {}
  const rules = {}
  validate( fields, { rules, } )
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
    subscription: true
  }

  const rules = defaultRules
  const { valid } = validate( fields, { rules, } )
  expect(valid).toEqual(true)
})
