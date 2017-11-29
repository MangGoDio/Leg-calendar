const log = console.log.bind(console)

export const getDom = str => document.querySelector(str)

// 获取当前星期数
export const getWeek = (year, month, num) => new Date(year, month, num).getDay()

// 获取当前日期信息
export const getDayInfo = (year, month, num, status) => {
    const date = new Date(year, month, num)
    return {
        day: date.getDate(),
        week: date.getDay(),
        month: date.getMonth(),
        status: status || 'current'
    }
}

// 计算两个日期相差天数
export const diffDays = (day1, day2) => {
    let obj = {
        days: 0,
        new: 0,
    }

    const diff = Date.parse(day2) - Date.parse(day1)
    if (diff === 0) {
        return obj
    } else {
        obj.new = diff > 0 ? 1 : -1
    }

    obj.days = Math.floor(Math.abs(diff) / (24 * 3600 * 1000))

    return obj
}

// 解析时间
export const numToTime = time => {
    const str = time.toString(),
        hours = str.split('.')[0],
        mins = str.split('.')[1]
    return mins ? `${hours}:30` : `${hours}:00`
}