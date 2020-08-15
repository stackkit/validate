function validate(fields, { rules }) {
  const checked = []

  if (!fields || !rules || !rules.fields) {
    return { valid: false, results: [] }
  }

  Object.keys(rules.fields).forEach(field => {
    const value = fields[field]
    const rule = rules.fields[field]

    if (rule.validator(value)) {
      checked.push({ field, value: fields[field], valid: true, message: '' })
    } else {
      const value = fields[field]

      const message = compileTheMessage({
        message: rules.fields[field].message,
        value,
        field,
      })

      checked.push({
        field,
        value,
        valid: false,
        message,
      })
    }
  })

  return {
    valid: checked.every(current => current.valid === true),
    results: checked,
  }
}

function compileTheMessage({ message, value, field }) {
  const defaultOutputString = `Validation failed for field '${field}'`

  if (!message) return defaultOutputString
  if (typeof message === 'function') {
    const output = message({ field, value })

    if (!output) return defaultOutputString
    return output
  }

  return message
}

module.exports = {
  validate,
  ...require('./validation/index.js'),
}
