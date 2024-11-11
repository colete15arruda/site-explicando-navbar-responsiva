// Seleção dos elementos principais
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list a");
const submenuParent = document.querySelector(".has-submenu");
let lastScrollY = window.scrollY;

// Alterna o menu ao clicar no botão hambúrguer
hamburger.addEventListener("click", () => {
  navList.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Acessibilidade: atualiza o aria-expanded
  const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
  hamburger.setAttribute("aria-expanded", !expanded);

  // Evita o scroll quando o menu está ativo
  document.body.style.overflow = navList.classList.contains("active") ? "hidden" : "auto";

  // Animação para os itens da navbar
  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.toggle("slide-in");
    }, index * 100); // Delay para o efeito
  });
});

// Alterna o submenu ao clicar em "Exemplos de Comandos" (somente em dispositivos móveis)
submenuParent.addEventListener("click", (e) => {
  if (window.innerWidth <= 750) {
    e.preventDefault(); // Impede o redirecionamento no mobile
    submenuParent.classList.toggle("active");
  }
});

document.querySelector('.hamburger').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.nav').classList.toggle('active');
});

// Fecha o menu ao clicar em um link (somente em dispositivos móveis)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      navList.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Remove a classe ativa de todos os links e adiciona ao clicado
    navLinks.forEach(link => link.classList.remove("active-link"));
    link.classList.add("active-link");
  });
});

// Muda a cor da navbar e exibe/esconde com scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Oculta a navbar ao rolar para baixo e exibe ao rolar para cima no mobile
  const isScrollingDown = window.scrollY > lastScrollY;
  if (window.innerWidth <= 750) {
    nav.classList.toggle("hidden", isScrollingDown);
  }
  lastScrollY = window.scrollY;

  // Mostra o botão "Voltar ao Topo" ao rolar para baixo
  if (window.scrollY > 200) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Criação do botão "Voltar ao Topo"
const backToTopButton = document.createElement("button");
backToTopButton.classList.add("back-to-top");
backToTopButton.innerText = "↑";
document.body.appendChild(backToTopButton);
backToTopButton.style.position = "fixed";
backToTopButton.style.bottom = "20px";
backToTopButton.style.right = "20px";
backToTopButton.style.zIndex = "1000";

// Rola suavemente ao topo
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animações e efeitos nos links ao passar o mouse
navLinks.forEach(link => {
  link.addEventListener("mouseover", () => link.classList.add("hovered"));
  link.addEventListener("mouseleave", () => link.classList.remove("hovered"));
});

// Função de responsividade para ajustar o layout
function responsiveNavbar() {
  const isMobile = window.innerWidth <= 750;

  if (isMobile) {
    hamburger.style.display = "block";
    nav.classList.add("mobile");
    nav.classList.remove("desktop");

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        navList.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  } else {
    hamburger.style.display = "none";
    nav.classList.remove("mobile");
    nav.classList.add("desktop");
    navList.classList.remove("active");
    document.body.style.overflow = "auto";

    // Remove as animações de entrada no desktop
    navLinks.forEach(link => link.classList.remove("slide-in"));
  }
}

// Ajusta o layout ao carregar e redimensionar a janela
window.addEventListener("resize", responsiveNavbar);
window.addEventListener("load", responsiveNavbar);

// script do menu hamburguer
document.querySelector('.hamburger').addEventListener('click', function () {
  const navList = document.querySelector('.nav-list');
  navList.classList.toggle('active');
  // Alterna o estado do botão hamburguer
  const expanded = this.getAttribute('aria-expanded') === 'true' || false;
  this.setAttribute('aria-expanded', !expanded);
});

// script do acordeão
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(accordion => {
  accordion.addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

// Função para scroll animado para os links internos
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({ behavior: "smooth" });
}
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.hash) {
      e.preventDefault();
      smoothScroll(link.hash);
    }
  });
});
