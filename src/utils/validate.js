function getNowTime(isHour) {
  // 获取当前时间
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

function phoneValidate(rule, value, callback) {
  // 手机号验证
  if (!value) {
    return callback(new Error('手机号不能为空！'))
  } else {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(value.replace(/(^\s*)|(\s*$)/g, ''))) { // 去除空格
      callback()
    } else {
      return callback(new Error('请输入正确的手机号！'))
    }
  }
}

function phoneMulValidate(rule, value, callback) {
  // 多行手机号验证
  if (!value) {
    return callback(new Error('手机号不能为空！'))
  } else {
    const reg = /^1[3456789]\d{9}$/
    let data = value.split('\n')
    if (data.length > 1000) {
      return callback(new Error('手机号数量超过一千个！'))
    } else {
      data.forEach(item => {
        if (!reg.test(item.replace(/(^\s*)|(\s*$)/g, ''))) { // 去除空格
          return callback(new Error('请输入正确的手机号!'))
        }
      })
    }
  }
}

export { getNowTime, phoneValidate, phoneMulValidate }
