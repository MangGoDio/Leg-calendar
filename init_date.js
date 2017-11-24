// 初始化当前月份表格
const initTable = data => {

    // 定义月份表格数组
    let dateInfo = data
    // 获取当前年份和月份
    const dayArr = [], { year, month } = dateInfo.current

    // 定义到当前月份1号的星期数
    const curWeek = getWeek(year, month, 1)

    // 遍历，确保第一个数组是星期日
    // 将上月数组添加到arr
    if (curWeek !== 0) {
        for (let i = 0; ; i--) {
            let date = getDayInfo(year, month, i, 'other')
            dayArr.unshift(date)
            if (date.week === 0) break
        }
    }

    // 遍历本月数组，添加到arr
    for (let i = 1; ; i++) {
        let date = getDayInfo(year, month, i)
        if (date.month !== month) break
        dayArr.push(date)
    }

    // 判定本月结尾星期数
    // 遍历，直到最后一个数组是星期六
    // 将下月数组添加到arr
    const lastWeek = dayArr[dayArr.length - 1].week,
        lastDay = dayArr[dayArr.length - 1].day
    if (lastWeek !== 6) {
        for (let i = lastDay + 1; ; i++) {
            let date = getDayInfo(year, month, i, 'other')
            dayArr.push(date)
            if (date.week === 6) break
        }
    }

    dateInfo.arr = dayArr

    return addLegInfo(dateInfo)

}

// 插入独有的军团信息
const addLegInfo = date => {
    return date
}
