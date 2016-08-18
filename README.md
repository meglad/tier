简体中文

tier
=====================

一个针对移动端的弹框

## #参数 option
```js
var option = {
  width: "",              // 宽度自动  
  title: "",              // 标题
  content: "",            // 内容
  shadeClose: false,      // 点击遮蔽是否关闭 可以是回调 回调名称
  btnClose: true,         // 点击按钮是否关闭
  btn:[],                 // 按钮数组
  style: {                // 自定义样式
    main: "",
    title: "",
    content: "",
    shade: "",
    btn: []
  },
  class: {                // 自定义css类
    main: "",
    title: "",
    content: "",
    shade: "",
    btn: []
  },
  render: funciton(data) {},  // 自定义渲染函数 (扩展功能, 可自定义复杂的弹框效果)
  mode: 'dark',           // 模式: dark 黑暗, one 单一
  delay: 2000,            // 延迟关闭
  
  // 按钮回调
  "0": function(index) {},     // 第一个按钮的回调函数
  "1": function(index) {},     // 第二个按钮的回调函数

  start: function(index) {},   // 弹出开始的回调
  end: function(index) {},     // 弹出被销毁的回调
}
```



## #接口 api
> #### 版本号
```js
var version = tier.v;
```
> #### 打开弹框
```js
var tierId = tier.open(option);
```
> #### 打开加载框
```js
var tierId = tier.load();
```
> #### 单一模式 (同时存在一个)
```js
var tierId = tier.one(option);
```
> #### 暗黑模式
```js
var tierId = tier.dark(option);
```
> #### 关闭指定弹框
```js
tier.close(tierId);
```
> #### 关闭所有弹框
```js
tier.close();
```

## #主要功能

* 移动端防点击穿透
* 弹框按钮事件防止多次调用
* 使用 rem 布局 可开启自动
* 防止 ios 弹出输入法时弹框也移动问题
* 扩展功能, 可自定义复杂的弹框效果


## #License

The MIT License (http://opensource.org/licenses/MIT)