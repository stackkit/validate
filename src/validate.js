function validate (fields, { rules }) {
  if (isEmpty(fields)) {
    return false
  }

  const checked = []

  Object.keys(fields).forEach((field) => {
    const rule = rules.fields[field]

    if (!rule) {
      checked.push({ field, valid: false, message: `No validation rules for field ${field}`})
      return
    }

    if (rule.validator(fields[field])) {
      checked.push({ field, valid: true, message: '' })
    } else {
      checked.push({ field, valid: false, message: rules.fields[field].message || 'Validation failed for field' })
    }
  })

  return {
    valid: checked.every((current) => current.valid === true),
    results: checked
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = {
  validate,
  ...require('./validation/index.js')
}
