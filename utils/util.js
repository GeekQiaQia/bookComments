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
const formatTime = (timestamp,split) => {
  let date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(split) 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}







module.exports = {
  toFixed: toFixed,
  formatTime: formatTime,
  splice: splice
};