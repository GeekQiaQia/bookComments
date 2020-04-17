function toFixed(num, bit = 0, isNum = false) {
  if (isNaN(num)) {
    return ''
  } else if (isNum) {
    return (num.toFixed(bit) - 0)
  } else {
    return num.toFixed(bit)
  }
}

function splice(str = '', start, end) {
  return str.slice(start, end)
}

module.exports = {
  toFixed: toFixed,
  splice: splice
};