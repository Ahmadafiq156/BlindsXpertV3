const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#mainNav');
const productsMenu=document.querySelector('.nav-products');
const productsToggle=document.querySelector('.products-toggle');

function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>18)}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();

function closeProductsMenu(){
 productsMenu?.classList.remove('dropdown-open');
 productsToggle?.setAttribute('aria-expanded','false');
}
toggle?.addEventListener('click',()=>{
 const open=toggle.getAttribute('aria-expanded')==='true';
 toggle.setAttribute('aria-expanded',String(!open));
 toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');
 nav?.classList.toggle('open',!open);
 if(open)closeProductsMenu();
});
productsToggle?.addEventListener('click',()=>{
 const desktop=window.matchMedia('(min-width: 761px)').matches;
 const open=desktop||productsToggle.getAttribute('aria-expanded')!=='true';
 productsToggle.setAttribute('aria-expanded',String(open));
 productsMenu?.classList.toggle('dropdown-open',open);
});
productsMenu?.addEventListener('pointerenter',()=>{
 if(window.matchMedia('(min-width: 761px)').matches){productsMenu.classList.add('dropdown-open');productsToggle?.setAttribute('aria-expanded','true')}
});
productsMenu?.addEventListener('focusin',()=>{
 if(window.matchMedia('(min-width: 761px)').matches){productsMenu.classList.add('dropdown-open');productsToggle?.setAttribute('aria-expanded','true')}
});
productsMenu?.addEventListener('mouseleave',()=>{
 if(window.matchMedia('(min-width: 761px)').matches)closeProductsMenu();
});
productsMenu?.addEventListener('focusout',event=>{
 if(!productsMenu.contains(event.relatedTarget)&&window.matchMedia('(min-width: 761px)').matches&&!productsMenu.matches(':hover'))closeProductsMenu();
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
 nav.classList.remove('open');
 toggle?.setAttribute('aria-expanded','false');
 toggle?.setAttribute('aria-label','Open navigation');
 closeProductsMenu();
}));
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 if(productsMenu?.classList.contains('dropdown-open'))closeProductsMenu();
 if(nav?.classList.contains('open')){
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
  toggle?.focus();
 }
});

const filterButtons=[...document.querySelectorAll('[data-filter]')];
function setProductFilter(value){
 filterButtons.forEach(button=>{
  const active=button.dataset.filter===value;
  button.classList.toggle('active',active);
  button.setAttribute('aria-pressed',String(active));
 });
 document.querySelectorAll('#catalogue [data-category]').forEach(card=>{
  card.classList.toggle('hidden',value!=='all'&&card.dataset.category!==value);
 });
}
filterButtons.forEach(button=>button.addEventListener('click',()=>setProductFilter(button.dataset.filter)));
function syncProductFilterToHash(){
 const match=window.location.hash.match(/^#category-(indoor|outdoor|motorized|other)$/);
 if(match)setProductFilter(match[1]);
}
syncProductFilterToHash();
window.addEventListener('hashchange',syncProductFilterToHash);

const projectFilterButtons=[...document.querySelectorAll('[data-project-filter]')];
const projectGrid=document.querySelector('#projectGrid');
projectFilterButtons.forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.projectFilter;
 projectFilterButtons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});
 projectGrid?.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('hidden',selected!=='all'&&card.dataset.category!==selected));
}));

const form=document.querySelector('#quoteForm');
form?.addEventListener('submit',event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const data=new FormData(form);
 const subject=encodeURIComponent('BlindsXpert quotation enquiry');
 const body=encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')||'Not provided'}\nInterested in: ${data.get('interest')}\n\nProject details:\n${data.get('message')||'Not provided'}`);
 document.querySelector('#formNote').textContent='Opening an email draft addressed to BlindsXpert.';
 window.location.href=`mailto:sales.blindsXpert@gmail.com?subject=${subject}&body=${body}`;
});

const hero=document.querySelector('[data-hero-slideshow]');
if(hero){
 const slides=[...hero.querySelectorAll('.hero-slide')];
 const dots=[...document.querySelectorAll('.hero-dot')];
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let activeIndex=0;
 let timer=null;
 function showSlide(index){
  slides[activeIndex]?.classList.remove('is-active');
  slides[activeIndex]?.setAttribute('aria-hidden','true');
  dots[activeIndex]?.classList.remove('is-active');
  dots[activeIndex]?.setAttribute('aria-pressed','false');
  activeIndex=(index+slides.length)%slides.length;
  slides[activeIndex]?.classList.add('is-active');
  slides[activeIndex]?.setAttribute('aria-hidden','false');
  dots[activeIndex]?.classList.add('is-active');
  dots[activeIndex]?.setAttribute('aria-pressed','true');
 }
 function stopSlideshow(){if(timer){window.clearInterval(timer);timer=null}}
 function startSlideshow(){
  stopSlideshow();
  if(slides.length<2||reducedMotion.matches||document.hidden||heroSection?.matches(':hover')||heroSection?.contains(document.activeElement))return;
  timer=window.setInterval(()=>showSlide(activeIndex+1),2800);
 }
 const heroSection=hero.closest('.home-hero');
 dots.forEach((dot,index)=>dot.addEventListener('click',()=>{showSlide(index);startSlideshow()}));
 heroSection?.querySelector('.hero-arrow-prev')?.addEventListener('click',()=>{showSlide(activeIndex-1);startSlideshow()});
 heroSection?.querySelector('.hero-arrow-next')?.addEventListener('click',()=>{showSlide(activeIndex+1);startSlideshow()});
 heroSection?.addEventListener('mouseenter',stopSlideshow);
 heroSection?.addEventListener('mouseleave',startSlideshow);
 heroSection?.addEventListener('focusin',stopSlideshow);
 heroSection?.addEventListener('focusout',event=>{if(!heroSection.contains(event.relatedTarget))startSlideshow()});
 document.addEventListener('visibilitychange',startSlideshow);
 reducedMotion.addEventListener?.('change',startSlideshow);
 startSlideshow();
}


const testimonialCarousel=document.querySelector('[data-testimonial-carousel]');
if(testimonialCarousel){
 const cards=[...testimonialCarousel.querySelectorAll('.testimonial-card')];
 const dots=[...testimonialCarousel.querySelectorAll('.testimonial-dot')];
 const previous=testimonialCarousel.querySelector('[data-testimonial-prev]');
 const next=testimonialCarousel.querySelector('[data-testimonial-next]');
 let active=0;
 function renderTestimonials(){
  const visibleCount=window.matchMedia('(max-width: 760px)').matches?1:3;
  cards.forEach((card,index)=>{card.hidden=!Array.from({length:visibleCount},(_,offset)=>(active+offset)%cards.length).includes(index)});
  dots.forEach((dot,index)=>{dot.classList.toggle('is-active',index===active);dot.setAttribute('aria-pressed',String(index===active))});
 }
 function moveTestimonials(step){active=(active+step+cards.length)%cards.length;renderTestimonials()}
 previous?.addEventListener('click',()=>moveTestimonials(-1));
 next?.addEventListener('click',()=>moveTestimonials(1));
 dots.forEach((dot,index)=>dot.addEventListener('click',()=>{active=index;renderTestimonials()}));
 window.addEventListener('resize',renderTestimonials,{passive:true});
 renderTestimonials();
}
