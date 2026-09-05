document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("open");

  });


  /* Đóng menu khi bấm link */

  document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

      navMenu.classList.remove("open");

    });

  });


  /* =========================
     SCROLL ANIMATION
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          revealObserver.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.15
    });


  revealElements.forEach(function (element) {

    revealObserver.observe(element);

  });


  /* =========================
     PROGRAM CARD 3D EFFECT
  ========================= */

  document.querySelectorAll(".program-card")
    .forEach(function (card) {

      card.addEventListener("mousemove", function (event) {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -6;

        const rotateY =
          ((x / rect.width) - 0.5) * 6;

        card.style.transform =
          `translateY(-10px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;

      });


      card.addEventListener("mouseleave", function () {

        card.style.transform = "";

      });

    });


  /* =========================
     FORM DEMO
  ========================= */

  const form =
    document.getElementById("registerForm");

  const message =
    document.getElementById("formMessage");


  form.addEventListener("submit", function (event) {

    event.preventDefault();

    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(formData.entries());

    localStorage.setItem(
      "EPIC_registration",
      JSON.stringify(data)
    );

    message.innerHTML =
      "✓ EPIC đã nhận thông tin đăng ký của bạn!";

    form.reset();

  });


  /* =========================
     PARALLAX DECORATION
  ========================= */

  window.addEventListener("scroll", function () {

    const scroll =
      window.scrollY;

    document.querySelector(".star")
      ?.style.setProperty(
        "transform",
        `translateY(${scroll * 0.08}px)`
      );

    document.querySelector(".music")
      ?.style.setProperty(
        "transform",
        `translateY(${scroll * -0.05}px)`
      );

  });

});
