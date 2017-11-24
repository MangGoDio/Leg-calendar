// 绑定头部事件
const initHeader = date => {
    const leftBtn = getDom('#container .left-btn'),
        rightBtn = getDom('#container .right-btn')

    bindBtn(leftBtn, -1, date)
    bindBtn(rightBtn, 1, date)
}

// 显示头部文字
const textHeader = date => {
    const title = getDom('#container .cur-date'),
        { year, month } = date.current
    title.textContent = `${year}年${month + 1}月`
}

// 绑定方法
const bindBtn = (dom, num, date) => {
    dom.addEventListener('click', () => {
        const current = nextYear(date.current, num)
        date.current = current
        showCalendar(initTable(date))
    })
}

// 计算时间变化
const nextYear = (current, num) => {
    let { year, month } = current
    month += num
    if (month === 0) {
        month = 11
        year -= 1
    }
    if (month === 12) {
        month = 0
        year += 1
    }
    return { year, month }
}