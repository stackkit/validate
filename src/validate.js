function validate(fields, { rules }) {
  if (isEmpty(fields)) {
    return { valid: false, results: [] }
  }

  if (isEmpty(rules.fields)) {
    return { valid: false, results: [] }
  }

  const checked = []

  Object.keys(rules.fields).forEach((field) => {
    const value = fields[field]
    const rule = rules.fields[field]

    if (rule.validator(value)) {
      checked.push({ field, value: fields[field], valid: true, message: '' })
    } else {
      checked.push({
        field,
        value: fields[field],
        valid: false,
        message:
          rules.fields[field].message ||
          `Validation failed for field '${field}'`,
      })
    }
  })

  return {
    valid: checked.every(current => current.valid === true),
    results: checked,
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

module.exports = {
  validate,
  ...require('./validation/index.js'),
}
