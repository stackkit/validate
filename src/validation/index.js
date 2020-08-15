function number(x, { max, min } = {}) {
  if ((min || max) && Number(x) === x) {
    if (x >= min && x <= max) return true
    if (x >= min && max === undefined) return true
    if (x <= max && min === undefined) return true
  }

  if (Number(x) === x && min === undefined && max === undefined) {
    return true
  }

  return false
}

function email(x) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(x)
}

function length(x, { min, max }) {
  const length = x.length

  if (length >= min && length <= max) return true
  if (length >= min && max === undefined) return true
  if (length <= max && min === undefined) return true

  return false
}

function required(x) {
  return x !== undefined && x !== null
}

module.exports = {
  email,
  length,
  number,
  required,
}
