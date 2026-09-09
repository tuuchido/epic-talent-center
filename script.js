import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase-config.js?v=4";

/* =========================================================
   EPIC TALENT CENTER — MAIN SCRIPT
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const links = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('main section[id]');
  const items = document.querySelectorAll('.reveal');

  const registrationForm =
    document.getElementById("registrationForm");

  const formMessage =
    document.getElementById("formMessage");

  const year =
    document.getElementById("year");


  /* =========================================================
     NĂM HIỆN TẠI
  ========================================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  toggle?.addEventListener('click', () => {

    const open =
      nav.classList.toggle('open');

    toggle.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );

  });


  links.forEach(link => {

    link.addEventListener('click', () => {

      nav.classList.remove('open');

      toggle?.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });


  /* =========================================================
     REVEAL ANIMATION
  ========================================================= */

  const revealObserver =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    }, {
      threshold: 0.12
    });


  items.forEach(item => {
    revealObserver.observe(item);
  });


  /* =========================================================
     ACTIVE MENU KHI CUỘN TRANG
  ========================================================= */

  const sectionObserver =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          links.forEach(link => {
            link.classList.remove('active');
          });

          document
            .querySelector(
              `.main-nav a[href="#${entry.target.id}"]`
            )
            ?.classList.add('active');

        }

      });

    }, {
      rootMargin: '-35% 0px -55% 0px'
    });


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================================================
     3D TILT CHO CARD
  ========================================================= */

  document
    .querySelectorAll('.program-card')
    .forEach(card => {

      card.addEventListener('mousemove', e => {

        if (window.innerWidth <= 800) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
          rect.width - 0.5;

        const y =
          (e.clientY - rect.top) /
          rect.height - 0.5;

        card.style.transform =
          `perspective(900px)
           translateY(-14px)
           rotateX(${y * -3}deg)
           rotateY(${x * 3}deg)`;

      });


      card.addEventListener(
        'mouseleave',
        () => {
          card.style.transform = '';
        }
      );

    });


  /* =========================================================
     HIỆU ỨNG NHÚN TIÊU ĐỀ
  ========================================================= */

  document
    .querySelectorAll(
      '.section-head h2,.center-head h2,.about-copy h2'
    )
    .forEach(title => {

      title.addEventListener(
        'mouseenter',
        () => {
          title.classList.add('title-wiggle');
        }
      );

      title.addEventListener(
        'animationend',
        () => {
          title.classList.remove('title-wiggle');
        }
      );

    });


  /* =========================================================
     PARALLAX DOODLE
  ========================================================= */

  const doodles =
    document.querySelectorAll('.doodle');


  window.addEventListener('mousemove', e => {

    if (window.innerWidth <= 800) {
      return;
    }

    const x =
      (e.clientX / window.innerWidth - 0.5) * 12;

    const y =
      (e.clientY / window.innerHeight - 0.5) * 12;


    doodles.forEach((d, i) => {

      d.style.marginLeft =
        `${x * (i % 2 ? -0.45 : 0.45)}px`;

      d.style.marginTop =
        `${y * (i % 2 ? 0.35 : -0.35)}px`;

    });

  });


  /* =========================================================
     DỮ LIỆU 9 LỚP EPIC
  ========================================================= */

  const CLASS_DATA = {

    "art-01": {
      program: "Mỹ thuật",
      className: "Mỹ thuật Mầm non",
      age: "4–6 tuổi",
      day: "Thứ 7",
      time: "09:00 – 10:30",
      capacity: 10
    },

    "art-02": {
      program: "Mỹ thuật",
      className: "Mỹ thuật Thiếu nhi",
      age: "7–10 tuổi",
      day: "Chủ nhật",
      time: "09:00 – 10:30",
      capacity: 10
    },

    "art-03": {
      program: "Mỹ thuật",
      className: "Mỹ thuật Sáng tạo",
      age: "11–15 tuổi",
      day: "Chủ nhật",
      time: "14:00 – 15:30",
      capacity: 10
    },


    "piano-01": {
      program: "Piano",
      className: "Piano Khởi đầu",
      age: "4–6 tuổi",
      day: "Thứ 7",
      time: "09:00 – 10:00",
      capacity: 8
    },

    "piano-02": {
      program: "Piano",
      className: "Piano Cơ bản",
      age: "7–10 tuổi",
      day: "Chủ nhật",
      time: "09:00 – 10:00",
      capacity: 8
    },

    "piano-03": {
      program: "Piano",
      className: "Piano Nâng cao",
      age: "11–18 tuổi",
      day: "Chủ nhật",
      time: "14:00 – 15:00",
      capacity: 8
    },


    "dance-01": {
      program: "Dance",
      className: "Dance Kids",
      age: "4–6 tuổi",
      day: "Thứ 7",
      time: "15:00 – 16:00",
      capacity: 10
    },

    "dance-02": {
      program: "Dance",
      className: "Dance Teen",
      age: "7–12 tuổi",
      day: "Chủ nhật",
      time: "15:00 – 16:00",
      capacity: 10
    },

    "dance-03": {
      program: "Dance",
      className: "Dance Performance",
      age: "13–18 tuổi",
      day: "Chủ nhật",
      time: "17:00 – 18:00",
      capacity: 10
    }

  };


  /* =========================================================
     LẤY LỚP ĐƯỢC CHỌN TỪ URL
  ========================================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const selectedClassId =
    params.get("classId");


  if (
    selectedClassId &&
    CLASS_DATA[selectedClassId]
  ) {

    const selectedClass =
      CLASS_DATA[selectedClassId];


    const programSelect =
      document.querySelector(
        '[name="program"]'
      );


    const ageSelect =
      document.querySelector(
        '[name="age"]'
      );


    const selectedClassInput =
      document.getElementById(
        "selectedClass"
      );


    const classIdInput =
      document.getElementById(
        "classId"
      );


    if (programSelect) {

      programSelect.value =
        selectedClass.program;

    }


    if (ageSelect) {

      ageSelect.value =
        selectedClass.age;

    }


    if (selectedClassInput) {

      selectedClassInput.value =
        `${selectedClass.className} — ${selectedClass.day}, ${selectedClass.time}`;

    }


    if (classIdInput) {

      classIdInput.value =
        selectedClassId;

    }

  }


  /* =========================================================
     GỬI FORM ĐĂNG KÝ VÀO FIREBASE
  ========================================================= */

  if (registrationForm) {

    registrationForm.addEventListener(
      "submit",
      async function(event) {

        event.preventDefault();


        const submitButton =
          registrationForm.querySelector(
            "button[type='submit']"
          );


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.innerHTML =
            "Đang gửi...";

        }


        if (formMessage) {

          formMessage.textContent = "";

          formMessage.className =
            "form-message";

        }


        const formData =
          new FormData(
            registrationForm
          );


        const classInfo =
          CLASS_DATA[selectedClassId] || null;


        const data = {

          parentName:
            formData.get("parentName")?.trim() || "",

          phone:
            formData.get("phone")?.trim() || "",

          studentName:
            formData.get("studentName")?.trim() || "",

          age:
            formData.get("age") || "",

          program:
            formData.get("program") || "",

          time:
            classInfo?.time || "",

          note:
            formData.get("note")?.trim() || "",

          classId:
            selectedClassId || "",

          className:
            classInfo?.className || "",

          classDay:
            classInfo?.day || "",

          classTime:
            classInfo?.time || "",

          status:
            "pending",

          createdAt:
            serverTimestamp()

        };


        try {

          await addDoc(
            collection(
              db,
              "registrations"
            ),
            data
          );


          if (formMessage) {

            formMessage.textContent =
              "🎉 Đã nhận đăng ký! EPIC sẽ kiểm tra và liên hệ với bạn để xác nhận lớp.";

            formMessage.classList.add(
              "success"
            );

          }


          registrationForm.reset();


          /*
             Sau khi reset form,
             xóa luôn lớp đã chọn.
          */

          const selectedClassInput =
            document.getElementById(
              "selectedClass"
            );

          const classIdInput =
            document.getElementById(
              "classId"
            );


          if (selectedClassInput) {

            selectedClassInput.value = "";

          }


          if (classIdInput) {

            classIdInput.value = "";

          }


        } catch (error) {

          console.error(
            "FIREBASE REGISTRATION ERROR:",
            error
          );


          if (formMessage) {

            formMessage.textContent =
              "❌ Không thể gửi đăng ký. Vui lòng thử lại.";

            formMessage.classList.add(
              "error"
            );

          }

        } finally {

          if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
              'Gửi đăng ký học <span>↗</span>';

          }

        }

      }
    );

  }

});
