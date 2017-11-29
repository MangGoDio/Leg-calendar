import { getDom } from './utils'
import { initTable } from './init_date'
import { showCalendar } from './show_calendar'

// 绑定头部事件
export const initHeader = () => {
    const leftBtn = getDom('#container .left-btn'),
        rightBtn = getDom('#container .right-btn')

    bindBtn(leftBtn, -1)
    bindBtn(rightBtn, 1)
}

// 显示头部文字
export const textHeader = () => {
    const title = getDom('#container .cur-date'),
        { year, month } = window.DateInfo.current
    title.textContent = `${year}年${month + 1}月`
}

// 绑定方法
const bindBtn = (dom, num) => {
    dom.addEventListener('click', () => {
        const current = nextYear(window.DateInfo.current, num)
        window.DateInfo.current = current
        showCalendar(initTable())
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
