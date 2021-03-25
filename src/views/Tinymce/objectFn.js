/*
替换对象属性函数
obj：
typeArr
 
将arr对象中的name键改为text、userName键改为text、userList键改为chilren
*/

import { createReturn } from "_typescript@3.5.3@typescript";


// 第一种替换方法，  从新赋值属性名
export function copyTransFunc(oldAry, typeArr) {
  let result;
  if (Object.prototype.toString.call(oldAry) === '[object Array]') { //判断是不是数组
    result = [];
    for (var i = 0; i < oldAry.length; i++) {
      result[i] = copyTransFunc(oldAry[i], arguments[1]) //arguments[1], 代表copyTransFunc的第二个参数
    }
  } else if (Object.prototype.toString.call(oldAry) === '[object Object]') { //判断是不是对象
    result = {};
    for (let _key in oldAry) {
      if (oldAry.hasOwnProperty(_key)) { //
        let flag = 0, _value = null
        for (let j = 0; j < arguments[1].length; j++) {
          if (arguments[1][j].key === _key) { // 判断两个数组的key是否相等
            flag = 1;
            _value = arguments[1][j].value
          }
        }
        if (flag) //没有相等的，
          result[_value] = copyTransFunc(oldAry[_key], arguments[1]);
        else //有相等的
          result[_key] = copyTransFunc(oldAry[_key], arguments[1]);
      }
    }
  } else {
    return oldAry
  }
  return result
}

