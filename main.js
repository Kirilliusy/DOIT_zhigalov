// тень у шапки когда листаем вниз
window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// бургер меню
const burger = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

burger.addEventListener("click", function () {
  nav.classList.toggle("open");
  burger.classList.toggle("open");
  burger.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// закрываем меню после клика по ссылке
var links = nav.querySelectorAll("a");
for (var i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    nav.classList.remove("open");
    burger.classList.remove("open");
  };
}

// колесо
var phone = document.querySelector(".phone");
var wheel = document.querySelector(".phone__wheel");
let angle = 0;
let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;
  phone.classList.add("is-spinning");
  let turns = 5 + Math.floor(Math.random() * 4);
  angle = angle + turns * 360 + Math.floor(Math.random() * 360);
  wheel.style.transition = "transform 4.4s cubic-bezier(.16, .74, .2, 1)";
  wheel.style.transform = "rotate(" + angle + "deg)";
}

wheel.addEventListener("transitionend", function () {
  spinning = false;
  phone.classList.remove("is-spinning");
});

document.querySelector(".phone__spin").onclick = spin;

// большая кнопка в герое тоже крутит колесо
document.querySelector(".hero__text .btn").addEventListener("click", function (e) {
  e.preventDefault();
  spin();
});

// появление блоков при прокрутке
var blocks = document.querySelectorAll(".hero__text, .hero__art, .section__title, .feed-panel, .mission__card, .counter, .cta, .pcard, .fcard, .step");
for (var b = 0; b < blocks.length; b++) {
  blocks[b].classList.add("reveal");
}

var observer = new IntersectionObserver(function (entries) {
  for (var k = 0; k < entries.length; k++) {
    if (entries[k].isIntersecting) {
      entries[k].target.classList.add("is-visible");
      observer.unobserve(entries[k].target);
    }
  }
}, { threshold: 0.15 });

for (var n = 0; n < blocks.length; n++) {
  observer.observe(blocks[n]);
}

// счётчик завершённых вызовов
var counter = document.querySelector(".counter__num");
var target = parseInt(counter.textContent.replace(/\D/g, ""));
var started = false;

function runCounter() {
  var startTime = null;
  function step(now) {
    if (startTime == null) startTime = now;
    var p = (now - startTime) / 1600;
    if (p > 1) p = 1;
    var value = Math.round(target * (1 - Math.pow(1 - p, 3)));
    counter.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      counter.classList.add("counted");
    }
  }
  requestAnimationFrame(step);
}

var counterObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && started == false) {
    started = true;
    runCounter();
  }
}, { threshold: 0.6 });
counterObserver.observe(counter);
