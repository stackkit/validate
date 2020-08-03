# Validate

```js
const { validate, email, length } = require('validate')

const rules = {
  fields: {
    email: {
      validator: () => {
        return email(value) && length(value, { max: 75 })
      },
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
