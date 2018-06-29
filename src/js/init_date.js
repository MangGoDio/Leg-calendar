import { getWeek, getDayInfo, diffDays } from "./utils";
import { __BENCH, __PLACE } from "./config";
import { showCalendar } from "./show_calendar";
// 保存上一天超出的日期
let prevDay = {};

// 初始化当前月份表格
export const initTable = () => {
  //  重置上个月的余留时间
  prevDay = {};

  // 获取当前年份和月份
  const dayArr = [],
    { year, month } = window.DateInfo.current;

  // 定义到当前月份1号的星期数
  const curWeek = getWeek(year, month, 1);

  // 遍历，确保第一个数组是星期日
  // 将上月数组添加到arr
  if (curWeek !== 0) {
    for (let i = 0; ; i--) {
      let date = getDayInfo(year, month, i, "other");
      dayArr.unshift(date);
      if (date.week === 0) break;
    }
  }

  // 遍历本月数组，添加到arr
  for (let i = 1; ; i++) {
    let date = getDayInfo(year, month, i);
    if (date.month !== month) break;
    dayArr.push(date);
  }

  // 判定本月结尾星期数
  // 遍历，直到最后一个数组是星期六
  // 将下月数组添加到arr
  const lastWeek = dayArr[dayArr.length - 1].week,
    lastDay = dayArr[dayArr.length - 1].day;
  if (lastWeek !== 6) {
    for (let i = lastDay + 1; ; i++) {
      let date = getDayInfo(year, month, i, "other");
      dayArr.push(date);
      if (date.week === 6) break;
    }
  }

  window.DateInfo.arr = dayArr;

  addLegInfo();
};

// 插入独有的军团信息
const addLegInfo = () => {
  // 7月份以前的不插入
  const { year, month } = window.DateInfo.current;

  if (year > 2017 || (year === 2017 && month > 6)) {
    for (let i = 0, dio = window.DateInfo.arr.length; i < dio; i++) {
      window.DateInfo.arr[i] = legDay(window.DateInfo.arr[i]);
    }
  }

  showCalendar();
};

// 计算某一天的军团信息
const legDay = info => {
  // 初始化当前数组第一天
  const diffObj = diffDays(
    __BENCH.date,
    `${window.DateInfo.current.year}/${info.month + 1}/${info.day}`
  );
  // 循环填装数组
  let time = __BENCH.time;
  for (let i = 0; i < diffObj.days; i++) {
    time += 18.5;
    if (time > 24) {
      time -= 24;
    } else {
      diffObj.days++;
    }
  }

  let arr = [],
    end = "";
  // 如果有上一天遗留下来的数据，加入
  if (prevDay.place) {
    arr.push(prevDay);
    prevDay = {};
  }
  // 计算第一天是否有超出时间
  if (time + 6 > 24) {
    end = 24;
    prevDay = {
      place: __PLACE[diffObj.days % 12],
      time: 0,
      end: time + 6 - 24
    };
  } else {
    end = time + 6;
  }
  arr.push({ place: __PLACE[diffObj.days % 12], time, end });
  time += 18.5;
  if (time < 24) {
    // 计算第一天第二段超出时间
    prevDay = {
      place: __PLACE[(diffObj.days % 12) + 1],
      time: 0,
      end: time + 6 - 24
    };
    arr.push({ place: __PLACE[(diffObj.days % 12) + 1], time, end: 24 });
  }

  info.leg = arr;

  return info;
};
