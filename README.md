# Validate

> A simple validation util for react or vue. It works in nodejs to.

```js example
const { validate, email, length, required } = require('validate')

const rules = {
  fields: {
    email: {
      validator: value => {
        return length(value, { max: 75 }) && email(value)
      },
      message: ({ value }) => {
        return `${value} is not valid email address or the length is to high.`
      },
    },
    password: {
      validator: value => {
        return length(value, { min: 4, max: 18 })
      },
      message: ({ value, field }) => {
        return `The length of your password is tho short it must be between 4 and 18 charters long.`
      },
    },
    subscription: {
      validator: value => {
        return required(value)
      },
      message: `Please choose a subscription type`,
    },
  },
}

const { valid } = validate(fields, {
  rules,
})
```

## Good the now.

No sanitizing has been done on the return value in the message function. It is your job
to use a library to achieve this.

[dompurify](https://www.npmjs.com/package/dompurify)

### Nodejs

While working on this. I found this package [express-validator](https://github.com/express-validator/express-validator) it looks like a good option for validation inside nodejs express projects.
