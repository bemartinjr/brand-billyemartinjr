document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');

  // Mobile menu open/close. CSS shows the menu on `.main-nav.open`.
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const dropdowns = Array.from(document.querySelectorAll('.nav-has-dropdown'));

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d === except) return;
      d.classList.remove('open');
      const b = d.querySelector('.nav-dropdown-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach((d) => {
    const btn = d.querySelector('.nav-dropdown-toggle');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    // Picking an item closes the menu.
    d.querySelectorAll('.nav-dropdown a').forEach((a) => {
      a.addEventListener('click', () => {
        d.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (nav) nav.classList.remove('open');
      });
    });
  });

  // Click anywhere outside an open dropdown closes it.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-has-dropdown')) closeAll(null);
  });

  // Escape closes any open dropdown and the mobile menu.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAll(null);
      if (nav) nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
