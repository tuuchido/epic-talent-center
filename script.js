document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav"),links=document.querySelectorAll(".main-nav a"),sections=document.querySelectorAll("main section[id]"),items=document.querySelectorAll(".reveal"),form=document.getElementById("registrationForm"),msg=document.getElementById("formMessage"),year=document.getElementById("year");
 if(year)year.textContent=new Date().getFullYear();
 toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open?"true":"false")});
 links.forEach(l=>l.addEventListener("click",()=>{nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false")}));
 const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ro.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>ro.observe(x));
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove("active"));document.querySelector(`.main-nav a[href="#${e.target.id}"]`)?.classList.add("active")}}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>so.observe(s));
 form?.addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());data.createdAt=new Date().toISOString();try{localStorage.setItem("epic_latest_registration",JSON.stringify(data));msg.textContent="Đã nhận thông tin! Đây là bản demo, dữ liệu đang được lưu trên trình duyệt.";form.reset()}catch{msg.textContent="Form đang ở chế độ demo. Hãy kết nối Google Forms hoặc dịch vụ nhận dữ liệu để dùng thật."}});
});
