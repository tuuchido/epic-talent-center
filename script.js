/* =====================================================
   EPIC TALENT CENTER
   INTERACTIONS & ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
            });

        });

    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =================================================
       PROGRAM CARD 3D TILT
    ================================================= */

    const cards = document.querySelectorAll(".program-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 800) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2.5;

            const rotateY =
                ((x - centerX) / centerX) * 2.5;

            card.style.transform =
                `translateY(-14px) scale(1.025)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =================================================
       TITLE WIGGLE
    ================================================= */

    const titles = document.querySelectorAll(
        ".section-heading h2, .why-content h2, .register-copy h2"
    );

    titles.forEach(title => {

        title.addEventListener("mouseenter", () => {

            title.classList.remove("title-wiggle");

            void title.offsetWidth;

            title.classList.add("title-wiggle");

        });

    });


    /* =================================================
       PARALLAX DOODLES
    ================================================= */

    const doodles = document.querySelectorAll(
        ".hero-doodle, .visual-decoration, .section-doodles span"
    );

    window.addEventListener("mousemove", event => {

        if (window.innerWidth <= 800) return;

        const x = (event.clientX / window.innerWidth - .5);
        const y = (event.clientY / window.innerHeight - .5);

        doodles.forEach((doodle, index) => {

            const strength = 4 + (index % 4);

            doodle.style.marginLeft =
                `${x * strength}px`;

            doodle.style.marginTop =
                `${y * strength}px`;

        });

    });


    /* =================================================
       REGISTER FORM
    ================================================= */

    const form = document.getElementById("registerForm");
    const message = document.getElementById("formMessage");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const formData = new FormData(form);

            const parent = formData.get("parent");
            const phone = formData.get("phone");
            const age = formData.get("age");
            const program = formData.get("program");

            if (!parent || !phone || !age || !program) {

                message.textContent =
                    "Vui lòng điền đầy đủ thông tin nhé ✨";

                return;

            }


            /*
                DEMO:
                Lưu thông tin tạm thời trên trình duyệt.

                Khi website chính thức có backend,
                có thể thay đoạn này bằng Google Forms,
                Formspree hoặc hệ thống quản lý đăng ký.
            */

            const registration = {

                parent,
                phone,
                age,
                program,

                message:
                    formData.get("message"),

                createdAt:
                    new Date().toISOString()

            };


            const oldData =
                JSON.parse(
                    localStorage.getItem("epicRegistrations") || "[]"
                );


            oldData.push(registration);


            localStorage.setItem(
                "epicRegistrations",
                JSON.stringify(oldData)
            );


            message.textContent =
                "Đăng ký thành công! EPIC sẽ liên hệ với bạn sớm nhé 💖";


            form.reset();

        });

    }


    /* =================================================
       BUTTON RIPPLE EFFECT
    ================================================= */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                this.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            const target =
                document.querySelector(targetId);

            const headerHeight = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


});
