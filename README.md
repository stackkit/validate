# Validate

```js
const { validate, email, length } = require('validate')

const rules = {
  fields: {
    email: {
      validator: () => {
        return length(value, { max: 75 }) && email(value)
      },
      message: 'The given email address is invalid',
    },
    password: {
      validator: () => {
        return length(value, { min: 18, max: 45 })
      },
    }
  }
}

const { valid } = validate(fields, {
  rules,
})
```
