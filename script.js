// ===== TYPEWRITER =====
const frases = [
  'Técnico em Informática // COTEMIG',
  'Estudante de Tecnologia',
  'Futuro Desenvolvedor'
];
const typedEl = document.getElementById('typed');
let fraseIdx = 0, charIdx = 0, apagando = false;

function typewriter() {
  const frase = frases[fraseIdx];
  if (!apagando) {
    typedEl.textContent = frase.slice(0, ++charIdx);
    if (charIdx === frase.length) {
      apagando = true;
      return setTimeout(typewriter, 1800);
    }
  } else {
    typedEl.textContent = frase.slice(0, --charIdx);
    if (charIdx === 0) {
      apagando = false;
      fraseIdx = (fraseIdx + 1) % frases.length;
    }
  }
  setTimeout(typewriter, apagando ? 40 : 90);
}
typewriter();

// ===== NAVBAR AO ROLAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MENU MOBILE =====
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ===== SCROLL SUAVE COM OFFSET DA NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const alvo = document.querySelector(link.getAttribute('href'));
    if (alvo) {
      e.preventDefault();
      window.scrollTo({
        top: alvo.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ANIMAÇÃO DE ENTRADA (REVEAL) =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== FORMULÁRIO -> MAILTO + TOAST =====
const form = document.getElementById('form');
const toast = document.getElementById('toast');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg').value.trim();

  const assunto = encodeURIComponent(`Contato via portfólio — ${nome}`);
  const corpo = encodeURIComponent(`${msg}\n\n— ${nome} (${email})`);
  window.location.href = `mailto:davisvcampos@gmail.com?subject=${assunto}&body=${corpo}`;

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
  form.reset();
});