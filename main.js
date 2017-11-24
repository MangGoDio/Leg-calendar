; (() => {

    // 初始化当前日期
    const initDate = () => {

        // 获取当前日期
        const __TODAY = new Date(),
            __YEAR = __TODAY.getFullYear(),
            __MONTH = __TODAY.getMonth(),
            __DAY = __TODAY.getDate(),
            __WEEK = __TODAY.getDay()

        // 定义日历结构对象
        const dateArr = {
            current: {
                year: __YEAR,
                month: __MONTH,
            },
            today: {
                year: __YEAR,
                month: __MONTH,
                day: __DAY,
            },
            arr: []
        }

        return dateArr
    }

    const dateInfo = initDate()

    // 初始化头部
    initHeader(dateInfo)
    // 初始化当前日期
    const curDate = initTable(dateInfo)

    showCalendar(curDate)

})()