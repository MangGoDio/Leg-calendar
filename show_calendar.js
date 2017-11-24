const showCalendar = dateArr => {

    // 初始化头部
    textHeader(dateArr)

    const arr = dateArr.arr

    const calendarBox = getDom('#calendar > section')

    let dayCard = '', calHtml = ''

    for (let i = 0, dio = arr.length; i < dio; i++) {
        dayCard = `<div class='card ${dayColor(dateArr, i)}'>${arr[i].day}</div>`
        //const oDivNode = document.createElement('div')
        calHtml += dayCard
    }

    calendarBox.innerHTML = calHtml
}

// 当前日期颜色
const dayColor = (date, index) => {
    const { status, week } = date.arr[index]
    if (today(date, index)) {
        return 'today'
    } else if (status === 'other') {
        return 'gray'
    } else if (week === 0 || week === 6) {
        return 'red'
    } else {
        return ''
    }

}

// 判定是否今天
const today = (date, index) => {

    const { year: ty, month: tm, day } = date.today
    const { year: cy, month: cm } = date.current
    return ty === cy && tm === cm && day === index
}