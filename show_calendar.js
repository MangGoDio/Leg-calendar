const showCalendar = () => {

    // 初始化头部
    textHeader()

    const arr = DateInfo.arr

    const calendarBox = getDom('#calendar > section')

    let dayCard = '', calHtml = ''

    for (let i = 0, dio = arr.length; i < dio; i++) {
        dayCard = `<div class='card ${dayColor(i)}' index='${i}'>
        ${arr[i].day}
        <p>${arr[i].leg[0].place}</p>
        <p>${arr[i].leg[0].time} ~ ${arr[i].leg[0].time + 6.5}</p>
        <p>${arr[i].leg[1] ? arr[i].leg[1].place : ''}</p>
        
        </div>`
        //const oDivNode = document.createElement('div')
        calHtml += dayCard
    }

    calendarBox.innerHTML = calHtml
    // 绑定事件
    addEvent()
}

const addEvent = () => {
    const btns = document.querySelectorAll('#calendar > section > .card')
    for (let i = 0, dio = btns.length; i < dio; i++) {
        btns[i].addEventListener('click', e => {
            for (let i of btns) i.classList.remove('active')
            const index = e.target.getAttribute('index')
            e.target.classList.add('active')
            log(DateInfo.arr[index])
        })
    }
}

// 当前日期颜色
const dayColor = index => {

    const { status, week } = DateInfo.arr[index]
    if (today(index)) {
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
const today = index => {

    const { year: ty, month: tm, day } = DateInfo.today
    const { year: cy, month: cm } = DateInfo.current
    return ty === cy && tm === cm && day === index
}