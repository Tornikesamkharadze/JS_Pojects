'use strict';
/* სელექტორები */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const header = document.querySelector(".header")
const scrollUp = document.querySelector(".scroll__up")
// Modal window

/* მოდალის გახსნა */
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  //მოდალის გახსნის დრსო რო ბექრგრაუნდი დაიბლაროს
  overlay.classList.remove('hidden');
};

/* მოდალის დახურვა */
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* ერთი და იგივე კლასით რო მივწვდეთ ორ ელემენტს და ისე გავხსნათ მოდალი */
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
//overlay ბლარავს ბექგრაუნდს როცა აქტიურია
overlay.addEventListener('click', closeModal);

/* ესქეიფით რო დავხუროთ ჩვენი მოდალი */
document.addEventListener('keydown', (e)=> {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* ივენთს ვეუბნებით ქლიქის დროს სადამდე დასქროლოს სმუზი გვინდა რო უცბათ არ გადახტეს და ნელა დაისქროლოს */
btnScrollTo.addEventListener('click',()=>{
  section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
})

/* ქლიქმა რო დაგვაბრუნოს საიტის თავში */
scrollUp.addEventListener("click", ()=>{
  header.getBoundingClientRect();
  header.scrollIntoView({behavior: "smooth"})
})

/* ნავზე ვაკეთებთ ივენთს რადგან მის შიგნით რაც არის ლინკები ეგენიც დავიჭიროთ. ანუ ნავის შვილ ელემენტებსაც ექნებათ ქლიქზე ივენთი ბაბლინგის დახმარებით */
document.querySelector(".nav__links").addEventListener("click", (e)=>{
  e.preventDefault();
  /* აქ ვებუნებით ამ კლასს თუ მოიცავს ჩვენი ნავის შვილი ელემენტები მაშინ რა მოხდეს. და თუ დაკმაყოფილდა ჩვენი იფ ბრძანება მაშინ ი თარგეთის href ებზე ვაკეთებთ სქროლს*/
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

tabsContainer.addEventListener("click", (e)=>{
  const clicked = e.target.closest(".operations__tab");
  //კონტეინერში გვაქვს სამი ღილაკი და ამ ღილაკის გარეთ თუ დავაწვებით იმავე კონტეინერში გამოგვიტანს ერორს ამიტომ ვეუბნებით თუ ბათონზე არმოხდება ქლიქი დაარეთარნოს ფუნქცია
  if(!clicked) return;
  //ფორიჩით ვამოწმებთ ელემენტებს და კონტენტს და ვუშლით ექთივ კლასს 
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(cont => cont.classList.remove("operations__content--active"));
  //ბათონზე თუ დავაკლიკეთ რო დაგვიმატოს კლასი რომელიც ზევით აგვიწევს კონტენტს
  clicked.classList.add("operations__tab--active");
  //აქაც ვამატებთ ექთივის კლას უკვე შესამაბის ქლიქზე დაჭერისას რო მისივე კონტენტი გამოგვიტანოს
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add("operations__content--active")
});

/* ნავ მენიუს ანიმაცია */
//ფუნქცია რომელიც ელემენტზე მაუსის მიტანის დროს სხვა ელემენტებს უწევს ოფასითის
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//აქ უკვე გადავცემთ ივენთს ჩვენ ფუნქციას ბაინდი დაგვჭირდა იქიდან გამომდინარე რო თუ ივენთის დროს ჩვენ ფუქნციას გადავცემთ პარამეტრებს ჩვენი ივენთი
// ვერ მიიღებს და ანდეფაინდს გამოიტანს ამიტომ გვჭირდება ბაინდი და ჩვენი ზის ქივორდი რომელიც ფუნქციაში გვაქვს უკვე უყურებს ჩვენ პარამეტრებს
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/* სექციების გამოჩენა სქროლის დროს  */

const navHeight = nav.getBoundingClientRect().height;
/* ყველა სექციას ვიღებთ. ფორიჩისთვის დაგვჭრიდრება */
const allSections = document.querySelectorAll(".section")

const revealSection = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return; 
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

//რა პროცენტზე გამოჩნდეს ჩვენი სექციები სქროლის დროს
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

//ვამატებთ ჰიდენ კლას ყველა სექციას
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden")
})

/* ლეიზი ლოადინგი */

//ვათარგეთემბთ ყველა იმ ელემენტს რომელიც გვაქვს დათა ესერსით ჩასმული
const imgTargets = document.querySelectorAll("img[data-src]")

const loadImg = function (entries, observe) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: `200px`
});

imgTargets.forEach(img => imgObserver.observe(img));

/* სლაიდერი*/

const slider = function () {
  //სელექტორები
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
 
  const createDots = function () {
//წერტილებიანი სლაიდერისთვის ვაკეთებთ ფორიჩს
    slides.forEach(function (_, i) {
// და ვქმნით და ვამატებთ ელემენტებს ეიჩთიემელში
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //ყველა დოტს ვუშლით ექთივ კლასს
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //ვამატებთ იმ კლასზე რომელიც აქტიურია 
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  //სლაიდერის ფუნქცია 
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // შემდეგ სლაიდზე გადასასვლელი ფუნქცია
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/* window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""
}) */


/* 
prepend() ფრეფენდი ამატებგს ელემენტს თავში 
append()  ეფენდი ბოლოში 
header.append(message.cloneNode(true)) თუ გვინდა რო ჰედერის თავშიც და ბოლოშიც 
გვქონდეს ჩვენი მესიჯი მაშინ უნდა გავაკეთოთ კლონი 
*/