const log = console.log.bind(console)

const getDom = str => document.querySelector(str)

// 获取当前星期数
const getWeek = (year, month, num) => new Date(year, month, num).getDay()

// 获取当前日期信息
const getDayInfo = (year, month, num, status) => {
    const date = new Date(year, month, num)
    return {
        day: date.getDate(),
        week: date.getDay(),
        month: date.getMonth(),
        status: status || 'current'
    }
}