// /source/js/scroll-anim.js
document.addEventListener('DOMContentLoaded', function () {
  // 如果用户系统开启了“减少动态效果”，那就尊重用户，直接不做动画
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ===== 1. 选中需要做动画的元素 =====
  const cards      = document.querySelectorAll('.index-card-inner');           // 首页文章卡片
  const aboutHero  = document.querySelector('.about-info');                    // About 顶部椭圆档案卡
  const aboutBody  = document.querySelector('.about-content.page-content');    // About 正文大板
  const board      = document.querySelector('#board');                         // 普通文章页大板（非首页）

  // 没有任何目标就不用继续了
  if (!cards.length && !aboutHero && !aboutBody && !board) return;

  // 小工具：设置初始状态 & 存动画类型
  function setupFadeUp(el, delayMs) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition =
      'opacity 720ms cubic-bezier(0.22, 0.61, 0.36, 1), ' +
      'transform 720ms cubic-bezier(0.22, 0.61, 0.36, 1)';
    el.dataset.animType = 'fade-up';
    el.dataset.animDelay = String(delayMs || 0);
  }

  function setupScaleIn(el, delayMs) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px) scale(0.94)';
    el.style.transformOrigin = '50% 60%';
    el.style.transition =
      'opacity 780ms cubic-bezier(0.22, 0.61, 0.36, 1), ' +
      'transform 780ms cubic-bezier(0.22, 0.61, 0.36, 1)';
    el.dataset.animType = 'scale-in';
    el.dataset.animDelay = String(delayMs || 0);
  }

  function setupSoftFade(el, delayMs) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px) scale(0.98)';
    el.style.transition =
      'opacity 650ms cubic-bezier(0.25, 0.8, 0.25, 1), ' +
      'transform 650ms cubic-bezier(0.25, 0.8, 0.25, 1)';
    el.dataset.animType = 'soft-fade';
    el.dataset.animDelay = String(delayMs || 0);
  }

  const observed = [];

  // ===== 2. 初始化每一类元素的初始状态 + 错峰延迟 =====

  // 首页卡片：从下往上轻轻浮起，错峰 80ms
  cards.forEach((el, idx) => {
    const delay = idx * 80; // 0, 80, 160, ...
    setupFadeUp(el, delay);
    observed.push(el);
  });

  // About 顶部档案卡：略小略低 → 缓缓放大浮起（重点元素，延迟小一点）
  if (aboutHero) {
    setupScaleIn(aboutHero, 40);
    observed.push(aboutHero);
  }

  // About 正文：从下方柔和浮现
  if (aboutBody) {
    setupSoftFade(aboutBody, 140);
    observed.push(aboutBody);
  }

  // 普通文章页的大板：如果不是 About 页，就淡淡浮现一下
  if (board) {
    if (!board.closest('.container')?.querySelector('.about-info')) {
      setupSoftFade(board, 80);
      observed.push(board);
    }
  }

  if (!observed.length) return;

  // ===== 3. IntersectionObserver：进入视口时触发展示 =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const type = el.dataset.animType;
      const delay = parseInt(el.dataset.animDelay || '0', 10) || 0;

      // 用 setTimeout 做真正的错峰
      setTimeout(() => {
        if (type === 'fade-up') {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        } else if (type === 'scale-in') {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        } else if (type === 'soft-fade') {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }

        // ✅ 如果是 About 顶部档案卡，入场动画结束后开启“呼吸”循环
        if (el.classList.contains('about-info')) {
          el.classList.add('about-breathe');
        }
      }, delay);

      io.unobserve(el); // 触发一次就不再观察
    });
  }, {
    root: null,
    threshold: 0.16  // 元素露出大约 1/6 即开始动画
  });

  observed.forEach(el => io.observe(el));
});
