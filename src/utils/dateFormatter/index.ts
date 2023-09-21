/* eslint-disable no-useless-escape */
/**
 * @copyright Copyright © 2018-2019 Corretto, Inc. All rights reserved.
 */

function leftPad(value:number) {
  if (value >= 10) {
    return value.toString();
  }
  return `0${value}`;
}

function transDateType(val : string | Date | number) {
  if (!(val instanceof Date)) {
    return new Date(val);
  }
  return val;
}
//
export function formattedTimer(remainSeconds:number) {
  const minutes = Math.floor(remainSeconds / 60);
  const seconds = remainSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formattedTime(data: string | Date | number) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${hour}:${minute}`;
}

export function formattedMealTime(data: string | Date | number) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());

  return `${Number(hour) < 12 ? '오전' : '오후'} ${Number(hour) > 12 ? Number(hour) - 12 : hour}:${minute}`;
}

export function formattedDate(data: string | Date | number, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === '년월일') {
    return `${year}년 ${month}월 ${day}일`;
  }
  if (delimiter === '/') {
    return `${year}/${month}/${day}`;
  }
  return [year, month, day].join(delimiter);
}

export function formattedDateAndTime(data: string | Date | number, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}`;
}

export function formattedFullDate(data: string | Date | number, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  const second = leftPad(dateTime.getSeconds());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}:${second}`;
}

export function formattedDateAndDay(data: string | Date | number, delimiter = '. ') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} (${dayOfWeek})`;
}

// 식사구매 날짜 버튼
export function formattedDateBtn(data: string | Date | number) {
  const dateTime = transDateType(data);
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return month + '월' + day + '일';
}

// 취소 날짜
export function formattedDateWeekBtn(data: string | Date | number, delimiter = '.') {
  const dateTime = transDateType(data);
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${[month, day].join(delimiter)}(${dayOfWeek})`;
}
export function formattedWeekDate(data: string | Date | number, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}

export function formattedMonthDay(data: string | Date | number) {
  const dateTime = transDateType(data);

  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

export function formattedApplicationDate(data: string | Date | number) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day]}`?.replace(/[^0-9 ^\-]/g, '');
}
