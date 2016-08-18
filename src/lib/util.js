var util = {};

/**
 * 合并俩对象
 * @param  {Object} oldObj 原对象
 * @param  {Object} newObj 新对象
 * @return {Object} 合并后对象
 */ 
util.extend = function (oldObj, newObj) {
  newObj = newObj || {};
  for (var key in oldObj) {
    if (typeof newObj[key] === 'undefined') {
      newObj[key] = oldObj[key];
    } else if(oldObj[key] && typeof oldObj[key] === 'object') {
      for(var k in oldObj[key]) {
        if (typeof newObj[key][k] === 'undefined') {
          newObj[key][k] = oldObj[key][k];
        }
      }
    }
  }
  return newObj;
};

/** 
 * 获取元素对象
 * @param  {String} str css选择器字符串
 * @param  {Object} obj 父级元素对象
 */
util.query = function (str, obj) {
  return (obj || document).querySelector(str);
};

/** 
 * 获取元素对象
 * @param  {String} elementStr css选择器字符串
 * @param  {Object} elementName 创建的元素名 
 * @param  {String} html html字符串
 * @param  {Boolean} isChild 是否取子元素
 */
util.create = function (elementStr, elementName, html, isChild) {
  var element = document.createElement(elementName);
  element.innerHTML = html;
  if (isChild) {
    element = element.children[0];
  }
  util.query(elementStr).appendChild(element);
  return element;
};

module.exports = util; 