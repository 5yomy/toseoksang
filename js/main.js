/* ===========================================================
   공통 스크립트
   =========================================================== */
(function () {
  'use strict';

  /* ── 1. 사진 자리표시자 ───────────────────────────────────
     images/ 폴더에 사진이 없으면 자리표시자를 대신 보여줍니다.
     파일을 넣으면 자동으로 실제 사진이 나옵니다.               */
  function placeholder(img) {
    if (img.dataset.phDone) return;
    img.dataset.phDone = '1';
    img.classList.add('is-broken');

    var box = document.createElement('div');
    box.className = 'ph-fill' + (img.hasAttribute('data-ph-light') ? ' ph-light' : '');
    var label = document.createElement('span');
    label.textContent = img.getAttribute('data-ph') || img.alt || '';
    box.appendChild(label);
    img.insertAdjacentElement('beforebegin', box);
  }

  // 이미지 로드 실패는 버블링하지 않으므로 캡처 단계에서 받습니다.
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') placeholder(e.target);
  }, true);

  // 스크립트가 늦게 실행돼 error 이벤트를 놓친 경우 보정
  window.addEventListener('load', function () {
    document.querySelectorAll('img').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) placeholder(img);
    });
  });

  /* ── 2. 헤더 ─────────────────────────────────────────── */
  var header = document.querySelector('.header');
  if (header && !header.classList.contains('is-light')) {
    var onScroll = function () {
      header.classList.toggle('is-solid', window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 3. 모바일 메뉴 ──────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    var setOpen = function (open) {
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    };
    setOpen(false);
    burger.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('nav-open'));
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ── 4. 히어로 슬라이드 ──────────────────────────────── */
  var hero = document.querySelector('.hero__slides');
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero__slide'));
    var dotBox = document.querySelector('.hero__dots');
    var idx = 0, timer = null;
    var DURATION = 6000;

    if (slides.length > 1 && dotBox) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', (i + 1) + '번째 사진 보기');
        b.addEventListener('click', function () { go(i); play(); });
        dotBox.appendChild(b);
      });
    }
    var dots = dotBox ? Array.prototype.slice.call(dotBox.children) : [];

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-on', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-on', i === idx); });
    }
    function play() {
      clearInterval(timer);
      if (slides.length > 1) timer = setInterval(function () { go(idx + 1); }, DURATION);
    }
    go(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();

    // 탭이 백그라운드일 때는 멈춤
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else play();
    });
  }

  /* ── 5. 스크롤 등장 ─────────────────────────────────── */
  var targets = document.querySelectorAll('.rv');
  if (targets.length) {
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      targets.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── 6. 현재 페이지 메뉴 표시 ────────────────────────── */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav > li').forEach(function (li) {
    var hit = Array.prototype.some.call(li.querySelectorAll('a'), function (a) {
      return a.getAttribute('href') && a.getAttribute('href').split('/').pop() === here;
    });
    if (hit) li.setAttribute('aria-current', 'page');
  });
})();
