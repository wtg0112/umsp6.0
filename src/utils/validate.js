function getNowTime(isHour) {
  var now = new Date()
  var year = now.getFullYear() // 得到年份
  var month = now.getMonth() // 得到月份
  var date = now.getDate() // 得到日期
  var hour = now.getHours() // 得到小时
  var minute = now.getMinutes() // 得到分钟
  var second = now.getSeconds() // 得到秒
  month = month + 1
  month = month.toString().padStart(2, '0')
  date = date.toString().padStart(2, '0')
  hour = hour.toString().padStart(2, '0')
  minute = minute.toString().padStart(2, '0')
  second = second.toString().padStart(2, '0')
  var defaultDate = `${year}-${month}-${date}`
  if (isHour) {
    defaultDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  }
  return defaultDate
}

function phoneValidate(data) {
  var validate = data
  if (/^1[3456789]d{9}$/.test(validate)) {
    return true
  } else {
    return false
  }
}

export { getNowTime, phoneValidate }
