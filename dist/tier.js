/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function (document, exportName) {
	  'use strict';
	  var util = __webpack_require__(1);
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
	    util.create('head', 'style', __webpack_require__(2));
	    // 是否自定义渲染函数
	    if (typeof render !== 'function') {
	      render = __webpack_require__(4);
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
	    if(opts.mode == "one") this.close();
	    opts.mode = "dark";
	    return _open(opts);
	  };

	  window[exportName] = exports;
	})(document, 'tier');

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".tier,\n.tier_s {\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.tier {\n  position: fixed;\n  z-index: 19900708;\n  pointer-events: auto;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.tier_s {\n  position: absolute;\n  opacity: 0.5;\n  background: #000;\n}\n.tier_dark .tier_s {\n  opacity: 0;\n}\n.tier_dark .tier_m {\n  background: rgba(0, 0, 0, 0.8);\n  color: #fff;\n}\n.tier_m {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  min-width: 200px;\n  max-width: 85%;\n  opacity: 0;\n  -webkit-transition: opacity .5s;\n  transition: opacity .5s;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 0.5rem;\n  display: inline-table;\n  color: #333;\n  font-size: 1.3rem;\n  line-height: 3rem;\n  text-align: center;\n}\n.tier_h {\n  padding: 0 1rem;\n  font-weight: bold;\n  overflow: hidden;\n  line-height: 4rem;\n  max-height: 3.5rem;\n  min-height: 1.5rem;\n  margin-bottom: -1.5rem;\n}\n.tier_c {\n  padding: 1.5rem;\n  font-size: 1.25rem;\n  line-height: 2rem;\n}\n.tier_f {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.tier_f span {\n  display: block;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  box-shadow: -1px 0 0 #ddd, 0 -1px 0 #ddd;\n  cursor: pointer;\n}\n.tier_f span:first-child {\n  box-shadow: 0 -1px 0 #ddd;\n}\n.tier_f span:active {\n  background: rgba(0, 0, 0, 0.1);\n}\n.tier_l {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  width: 10rem;\n  height: 10rem;\n  background: rgba(0, 0, 0, 0.7);\n  border-radius: 0.5rem;\n}\n.tier_l ul {\n  height: 6rem;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.tier_l ul li {\n  position: absolute;\n  top: 35%;\n  left: 50%;\n  margin: 0;\n  padding: 0;\n  opacity: 0.25;\n}\n.tier_l ul li i {\n  position: absolute;\n  width: 1rem;\n  height: 0.25rem;\n  margin: 0;\n  padding: 0;\n  background: #d1d1d5;\n  box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;\n  border-radius: 1px;\n  -webkit-transform-origin: left 50% 0px;\n  transform-origin: left 50% 0px;\n}\n@-webkit-keyframes tier-loading {\n  0% {\n    opacity: 0.25;\n  }\n  1% {\n    opacity: 1;\n  }\n  60% {\n    opacity: 0.25;\n  }\n  100% {\n    opacity: 0.25;\n  }\n}\n@keyframes tier-loading {\n  0% {\n    opacity: 0.25;\n  }\n  1% {\n    opacity: 1;\n  }\n  60% {\n    opacity: 0.25;\n  }\n  100% {\n    opacity: 0.25;\n  }\n}\n.tier_l span {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  color: #fff;\n  display: block;\n  line-height: 3rem;\n  height: 3rem;\n  font-size: 1.2rem;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var exports = null;        var htmlEncodeDict = {            '"': 'quot',            '<': 'lt',            '>': 'gt',            '&': 'amp',            ' ': 'nbsp'        };    var build = function anonymous(_output_,_encode_,helper,jhtmls,require
	/**/) {

	_output_.push("<!-- tier -->");
	_output_.push("<div class=\"tier\">");
	_output_.push("  <div class=\"tier_s ",_encode_(this.class.shade),"\" style=\"",(this.style.shade),"\"></div>");
	  if(!this.type){
	_output_.push("  <div class=\"tier_m ",_encode_(this.class.main),"\" style=\"",(this.style.main),"\">");
	_output_.push("    <div class=\"tier_h ",_encode_(this.class.title),"\" style=\"",(this.style.title),"\">",_encode_(this.title),"</div>");
	_output_.push("    <div class=\"tier_c ",_encode_(this.class.content),"\" style=\"",(this.style.content),"\">",(this.content),"</div>");
	_output_.push("    <div class=\"tier_f\">");
	      for(var i in this.btn){
	_output_.push("      <span class=\"",_encode_(this.class.btn[i]||''),"\" style=\"",(this.style.btn[i]||''),"\" tier-index=\"",_encode_(i),"\">",_encode_(this.btn[i]),"</span>");
	      }
	_output_.push("    </div>");
	_output_.push("  </div>");
	  }else{
	_output_.push("  <div class=\"tier_l\">");
	_output_.push("    <ul>");
	      for(var i=12;i>0;i--){
	_output_.push("      <li style=\"-webkit-animation:tier-loading 1.1s linear ",_encode_(i*0.1),"s infinite;animation:tier-loading 1.1s linear ",_encode_(i*0.1),"s infinite\">");
	_output_.push("        <i style=\"-webkit-transform:rotate(",_encode_(i*30),"deg) translate(0.8rem,0px);transform: rotate(",_encode_(i*30),"deg) translate(0.8rem,0px)\"></i>");
	_output_.push("      </li>");
	      }
	_output_.push("    </ul>");
	_output_.push("    <span>",_encode_(this.content||'数据加载'),"</span>");
	_output_.push("  </div>");
	  }
	_output_.push("</div>");
	_output_.push("<!-- /tier -->");
	}
	;function encodeHTML(text) {
	    text = typeof text === 'undefined' ? '' : text;
	    return String(text).replace(/["<>& ]/g, function (all) {
	      return '&' + htmlEncodeDict[all] + ';';
	    });
	  }function render(data, helper) {
	    var format = function (d, h) {
	      var _require;
	      if (true) {
	        _require = require;
	      }
	      var output = [];
	      if (typeof h === 'undefined') {
	        h = function (d) {
	          build.call(d, output, encodeHTML, h, exports, __webpack_require__(5));
	        };
	      }
	      build.call(d, output, encodeHTML, h, exports, __webpack_require__(5));
	      return output.join('');
	    };
	    return format(data, helper);
	  }module.exports = render;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./tier.html": 4,
		"./tier.less": 2,
		"./util": 1,
		"./util.js": 1
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ }
/******/ ]);