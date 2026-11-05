(function () {
  var bar = document.querySelector('.bar');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  // header: transparent over the hero, solid once the page scrolls
  function paint() {
    bar.classList.toggle('solid', window.scrollY > 40 || menu.classList.contains('open'));
  }
  window.addEventListener('scroll', paint, { passive: true });
  paint();

  burger.addEventListener('click', function () {
    burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
    paint();
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      paint();
    }
  });

  // hero video: only for visitors who have not asked for less motion or less data
  var v = document.querySelector('.hero-bg');
  var ctl = document.querySelector('.vctl');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {};
  if (v && !reduce && !conn.saveData) {
    var small = window.matchMedia('(max-width: 760px)').matches;
    v.src = 'assets/hero-' + (small ? '360' : '720') + '.mp4';
    var p = v.play();
    if (p && p.catch) { p.catch(function () {}); }
    if (ctl) {
      ctl.hidden = false;
      ctl.addEventListener('click', function () {
        if (v.paused) { v.play(); ctl.textContent = 'Pause'; ctl.setAttribute('aria-label', 'Pause background video'); }
        else { v.pause(); ctl.textContent = 'Play'; ctl.setAttribute('aria-label', 'Play background video'); }
      });
    }
  }
})();
