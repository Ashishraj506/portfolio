const revealItems = document.querySelectorAll('.reveal');
const yearElement = document.getElementById('year');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
const tiltCards = document.querySelectorAll('.tilt-card');
const allowTilt = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 900;

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
  document.documentElement.style.setProperty('--my', `${event.clientY}px`);
});

if (allowTilt) {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 2;
      const rotateX = -((y - midY) / midY) * 2;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-1px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
