(function (document, exportName) {
  'use strict';
  var util = require('./lib/util.js');
  var render;
  var inited;
  var startIndex = 1;
  var tierList = {};
  var tierEndFn = {};
  var option = {
    class: {
      btn: []
    },
    style: {
      btn: []
    }
  };

  function init() {
    if (inited) {
      return;
    }
    inited = true;
    // 样式
    util.create('head', 'style', require('./lib/tier.less'));
    // 是否自定义渲染函数
    if (typeof render !== 'function') {
      render = require('./lib/tier.html');
    }
  }
  /**
   * 打开窗口
   * @param  {Object} opts 配置对象
   * @return {Number}      当前窗口索引
   */
  function _open(opts) {
    // 显示弹出input失去焦点
    var $element = document.activeElement;
    if ($element && $element.tagName.toLowerCase() === 'input') {
      $element.blur();
    }
    // 初始化变量
    init();
    var index = startIndex++;
    opts = util.extend(option, opts);

    typeof opts.start === 'function' && opts.start(index);
    typeof opts.end === 'function' && (tierEndFn[index] = opts.end);
    var shadeClose = opts.shadeClose || false;
    var btnClose = opts.btnClose || true;
    var currentRender = opts.render || render;



    var $div = tierList[index] = util.create('body', 'div', currentRender(opts), true);
    $div.id = exportName + index;
    switch (opts.mode) {
      case 'dark':
        $div.className += ' tier_dark';
        break;
      case 'one':
        Object.keys(tierList).forEach(_close);
        break;
    }

    var $main = util.query('.tier_m', $div);
    setTimeout(function () {
      $main && ($main.style.opacity = 1);
    });

    // 绑定事件
    var flag; // 防止重复执行回调标识
    $div.addEventListener('touchend', function (e) {
      var self = e.target;
      var key;
      if (shadeClose !== false && self.className.split(' ').indexOf('tier_s') > -1) {
        key = shadeClose;
      } else {
        key = self.getAttribute('tier-index');
      }
      e.preventDefault();   // 防止点击穿透

      if (key && !flag) {
        flag = true;
        btnClose && _close(index);
        typeof key === 'function' && key(index);
        typeof opts[key] === 'function' && opts[key](index);
      }
    });
    // 延迟自动关闭
    if (opts.delay) {
      setTimeout(function () { _close(index); }, opts.delay);
    }
    return index;
  }

  /**
   * 关闭
   * @param  {Number} index 当前窗口索引
   */
  function _close(index) {
    if (tierList[index]) {
      typeof tierEndFn[index] === 'function' && tierEndFn[index](index);
      delete tierEndFn[index];
      document.body.removeChild(tierList[index]);
      delete tierList[index];
    }
  }

  /**
   * 弹出层对象
   */
  var exports = exports || {};
  // 版本
  exports.v = '1.0.0';
  // 关闭
  exports.close = function (index) {
    index = index && [index];
    (index || Object.keys(tierList)).forEach(_close);
  };
  // 弹框模式
  exports.open = function (opts) {
    return _open(opts);
  };
  // 加载模式
  exports.load = function (opts) {
    opts = opts || {};
    opts.type = 1;
    return _open(opts);
  };
  // 单一模式
  exports.one = function (opts) {
    this.close();
    return _open(opts);
  };
  // 黑暗模式
  exports.dark = function (opts) {
    if (opts.mode == "one") this.close();
    opts.mode = "dark";
    return _open(opts);
  };

  window[exportName] = exports;
})(document, 'tier');