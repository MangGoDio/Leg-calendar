import { textHeader } from './header'
import { getDom, numToTime } from './utils'

export const showCalendar = () => {

    // 初始化头部
    textHeader()

    const arr = window.DateInfo.arr

    const calendarBox = getDom('#calendar > section')

    let dayCard = '', calHtml = ''

    for (let i = 0, dio = arr.length; i < dio; i++) {
        dayCard = `<div class='card ${dayColor(i)}' index='${i}'>
        <h1>${arr[i].day}</h1>${arr[i].leg ? legInfo(arr[i].leg) : ''}
        </div>`
        calHtml += dayCard
    }

    calendarBox.innerHTML = calHtml

    getDom('#container').classList.remove('hide')

    // 绑定事件
    addEvent()
}

const addEvent = () => {
    const btns = document.querySelectorAll('#calendar > section > .card')
    for (let i = 0, dio = btns.length; i < dio; i++) {
        btns[i].addEventListener('click', e => {
            for (let j = 0, mango = btns.length; j < mango; j++) {
                btns[j].classList.remove('active')
            }
            const index = e.target.getAttribute('index')
            e.target.classList.add('active')
        })
    }
}

// 当前日期颜色
const dayColor = index => {

    const { status, week, day, month } = window.DateInfo.arr[index]
    if (today(day, month)) {
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
const today = (index, month) => {

    const { year: ty, month: tm, day } = window.DateInfo.today
    const { year: cy, month: cm } = window.DateInfo.current
    return ty === cy && tm === month && day === index
}

// 解析军团信息数组
const legInfo = arr => {

    let dom = ''

    for (let i = 0, dio = arr.length; i < dio; i++) {
        dom += `<p class='${arr.length === 1 && 'middle'}'>${arr[i].place}</p><p>${numToTime(arr[i].time)} ~ ${numToTime(arr[i].end)}</p>`
    }

    return dom
}