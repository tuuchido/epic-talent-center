document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  const links=document.querySelectorAll('.main-nav a');
  const sections=document.querySelectorAll('main section[id]');
  const items=document.querySelectorAll('.reveal');
  const form=document.getElementById('registrationForm');
  const msg=document.getElementById('formMessage');
  const year=document.getElementById('year');

  if(year) year.textContent=new Date().getFullYear();

  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });

  links.forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  }));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach(item=>revealObserver.observe(item));

  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(link=>link.classList.remove('active'));
        document.querySelector(`.main-nav a[href="#${entry.target.id}"]`)?.classList.add('active');
      }
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section=>sectionObserver.observe(section));

  // 3D tilt nhẹ cho card lớp học trên desktop
  document.querySelectorAll('.program-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(window.innerWidth<=800)return;
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(900px) translateY(-14px) rotateX(${y*-3}deg) rotateY(${x*3}deg)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });

  // Hiệu ứng nhún nhẹ cho tiêu đề khi xuất hiện
  document.querySelectorAll('.section-head h2,.center-head h2,.about-copy h2').forEach(title=>{
    title.addEventListener('mouseenter',()=>title.classList.add('title-wiggle'));
    title.addEventListener('animationend',()=>title.classList.remove('title-wiggle'));
  });

  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    data.createdAt=new Date().toISOString();
    try{
      localStorage.setItem('epic_latest_registration',JSON.stringify(data));
      msg.textContent='🎉 Đã nhận thông tin! Đây là bản demo, dữ liệu đang được lưu trên trình duyệt.';
      form.reset();
    }catch{
      msg.textContent='Form đang ở chế độ demo. Hãy kết nối Google Forms hoặc dịch vụ nhận dữ liệu để dùng thật.';
    }
  });

  // Parallax rất nhẹ cho doodle khi di chuyển chuột
  const doodles=document.querySelectorAll('.doodle');
  window.addEventListener('mousemove',e=>{
    if(window.innerWidth<=800)return;
    const x=(e.clientX/window.innerWidth-.5)*12;
    const y=(e.clientY/window.innerHeight-.5)*12;
    doodles.forEach((d,i)=>{
      d.style.marginLeft=`${x*(i%2?-.45:.45)}px`;
      d.style.marginTop=`${y*(i%2?.35:-.35)}px`;
    });
  });
});
const registrationForm =
    document.getElementById("registrationForm");

const formMessage =
    document.getElementById("formMessage");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby_FhDDcOSKW5lJ5F7Yu1fZMAuD_FC-pODeL9EPTRxk2L9i4hsVg9bQoQPKuS-UUgM/exec";


if (registrationForm) {

    registrationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            registrationForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.innerHTML = "Đang gửi...";

        formMessage.textContent = "";
        formMessage.className = "form-message";

        const formData =
            new FormData(registrationForm);

        const data = {
            parentName: formData.get("parentName"),
            phone: formData.get("phone"),
            studentName: formData.get("studentName"),
            age: formData.get("age"),
            program: formData.get("program"),
            time: formData.get("time"),
            note: formData.get("note")
        };

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            formMessage.textContent =
                "🎉 Đăng ký thành công! EPIC sẽ liên hệ với bạn sớm nhất.";

            formMessage.classList.add("success");

            registrationForm.reset();

        } catch (error) {

            formMessage.textContent =
                "❌ Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ EPIC.";

            formMessage.classList.add("error");

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Gửi đăng ký học thử <span>↗</span>';
        }

    });
}
