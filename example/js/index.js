(function() {
  var percentage = 24 / 720; // 页面 720px 宽度 REM 基准值为 24px
  var rootElement = document.documentElement;
  function resize() {
    rootElement.style.fontSize = (rootElement.clientWidth * percentage).toFixed(2) + "px";
  }
  resize();
  window.addEventListener("resize", resize)
})();
document.body.addEventListener('touchend', function (e) {
  var self = e.target;
  switch (self.className) {
    case 'btn-tip':

      tier.open({
        content: '这是一个提示',
        shadeClose: 1,
        1: function () {
          tier.open({
            content: '这是一个提示',
            delay: 1500,   // 1.5s 后自动关闭
            mode: 'dark'
          })
        }
      });

      break;
    case 'btn-tip-title':

      tier.open({
        title: '~ 提示 ~',
        content: '这是一个提示 点击空白处关闭',
        style: {
          title: 'color:#f99',
        },
        shadeClose: '0', // 指定点击屏蔽层关闭的回调函数
        '0': function () {
          tier.open({
            content: '提示: 关闭提示框 2s 后关闭',
            delay: 2000
          });
        }
      });

      break;
    case 'btn-confirm':

      tier.open({
        content: '是否确认信息吗？',
        mode: "dark",
        btn: ['确定', '取消'],
        style: {
          btn: ['color:#f99', null]
        },
        '0': function () {
          var index = tier.open({
            content: '选择了确定 2s 后关闭',
            delay: 2000
          });
          tier.close(index);
        },
        '1': function () {
          tier.open({
            content: '选择了取消 2s 后关闭',
            delay: 2000
          });
        }
      });

      break;
    case 'btn-confirm-title':

      tier.open({
        title: '~ 提示 ~',
        content: '是否确定?',
        btn: ['确定', '购买', '取消'],
        class: {
          main: 'style_main'
        },
        style: {
          btn: [null, 'color:#f99']
        },
        '1': function () {
          tier.load({
            content: '购买中',
            delay: 2000
          });
        }
      });

      break;
    case 'btn-loading':

      tier.load({
        style: {
          shade: "opacity:0"
        },
        shadeClose: true,
        end: function () {
          tier.dark({
            content: '弹框销毁, end事件触发',
            delay: 1000
          })
        }
      });

      break;
    case 'btn-open-one':
      tier.load();
      tier.one({
        content: '单一模式',
        shadeClose: true
      });
      tier.one({
        content: '单一模式',
        shadeClose: true
      });

      break;
    case 'btn-open-two':

      tier.load({
        style: {
          shade: "opacity: 0"
        },
        shadeClose: true
      });
      tier.open({
        content: '打开第一个',
        shadeClose: true
      });
      tier.open({
        content: '打开第二个',
        shadeClose: true
      });
      break;
  }
});
