// /scripts/fluid-scroll-anim.js
hexo.extend.injector.register(
  'body_end',                                  // 注入到 </body> 前
  '<script src="/js/scroll-anim.js"></script>',// 引用我们放在 source/js 里的脚本
  'default'                                    // 所有页面都生效
);
