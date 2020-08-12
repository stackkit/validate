# Validate

```js
const { validate, email, length, required } = require('validate')

const rules = {
  fields: {
    email: {
      validator: (value) => {
        return length(value, { max: 75 }) && email(value)
      },
      message: 'The given email address is invalid',
    },
    password: {
      validator: (value) => {
        return length(value, { min: 18, max: 45 })
      },
    },
    subscription: {
      validator: (value) => {
        return required(value)
      }
    }
  }
}

const { valid } = validate(fields, {
  rules,
})
```