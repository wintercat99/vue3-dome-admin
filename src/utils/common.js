//日期格式化  new Date().format("yyyy-MM-dd-hh-mm-ss--q季度--E")
Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  let datelist = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    ) //年
  if (/(E+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, datelist[this.getDay()]) //周
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

//数组均分为等长二维数组，最后的一组可能会缺
Array.prototype.group = function (subGroupLength) {
  let index = 0
  let newArray = []
  while (index < this.length) {
    newArray.push(this.slice(index, (index += subGroupLength)))
  }
  return newArray
}

Array.prototype.has = function (attr, value = true) {
  let result = false
  if (attr) {
    this.forEach((ele, ind) => {
      if (ele[attr] == value) {
        result = true
      }
    })
  }
  return result
}
