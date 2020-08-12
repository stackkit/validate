function validate(fields, { rules }) {
  const checked = []

  if (!fields || !rules || !rules.fields ) {
    return { valid: false, results: [] }
  }

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

module.exports = {
  validate,
  ...require('./validation/index.js'),
}
