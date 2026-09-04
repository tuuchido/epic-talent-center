// ==============================
// EPIC TALENT CENTER
// Main JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backTop = document.getElementById("backTop");
  const registerForm = document.getElementById("registerForm");
  const formMessage = document.getElementById("formMessage");
  const year = document.getElementById("year");

  // Current year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  // Close mobile menu after clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  // Header shadow + back-to-top
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    backTop.classList.toggle("show", window.scrollY > 600);
  });

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active navigation based on visible section
  const sections = document.querySelectorAll("main section[id]");

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          active?.classList.add("active");
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // Reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Demo registration form
  // IMPORTANT:
  // This static version does not send data to a server.
  // It saves the latest submission in the browser's localStorage.
  // For a real center, connect this form to Google Forms, Formspree,
  // Netlify Forms, or your own backend.
  registerForm?.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    localStorage.setItem("epicLatestRegistration", JSON.stringify({
      ...data,
      createdAt: new Date().toISOString()
    }));

    formMessage.textContent =
      "Đã ghi nhận thông tin trên thiết bị này. Hãy kết nối Google Forms/Forms backend trước khi đưa website vào sử dụng chính thức.";

    registerForm.reset();
  });
});
