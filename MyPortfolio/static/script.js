/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Data Analyst","Power Bi Developer","Automation Engineer", "Consultant"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

// window.addEventListener('scroll', scrollActive)

const milestones = document.querySelectorAll('.milestone');
const svg = document.querySelector('svg.timeline-svg');
const path = svg.querySelector('path');
const container = document.querySelector('.timeline-container');

function revealMilestones() {
  const triggerBottom = window.innerHeight * 0.85;
  milestones.forEach(milestone => {
    const milestoneTop = milestone.getBoundingClientRect().top;
    if (milestoneTop < triggerBottom) {
      milestone.classList.add('visible');
    }
  });
}

function cubicBezierPath(points) {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i-1];
    const p1 = points[i];
    const cpX = 20;
    const cpY1 = p0.y + (p1.y - p0.y) / 3;
    const cpY2 = p0.y + 2 * (p1.y - p0.y) / 3;
    d += ` C${cpX},${cpY1} ${cpX},${cpY2} ${p1.x},${p1.y}`;
  }
  return d;
}

function updatePath() {
  if (!milestones.length) return;

  const containerRect = container.getBoundingClientRect();
  const dots = [];

  milestones.forEach(milestone => {
    const dot = milestone.querySelector('.milestone-dot');
    const dotRect = dot.getBoundingClientRect();
    const centerX = 20;
    const centerY = dotRect.top + dotRect.height / 2 - containerRect.top;
    dots.push({ x: centerX, y: centerY });
  });
  const reversedDots = [...dots].reverse();

  // Determine the vertical range of the SVG path
  const padding = 40;
  const topY = Math.min(...reversedDots.map(p => p.y));
  const bottomY = Math.max(...reversedDots.map(p => p.y));
  const height = bottomY - topY + padding * 2;

  svg.style.top = (topY - padding) + 'px';
  svg.setAttribute('height', height);

  // Adjust dot positions relative to SVG top
  const adjustedDots = reversedDots.map(p => ({
    x: p.x,
    y: p.y - (topY - padding)
  }));

  // Create path
  const d = cubicBezierPath(adjustedDots);
  path.setAttribute('d', d);
}

window.addEventListener('scroll', revealMilestones);
window.addEventListener('load', () => {
  revealMilestones();
  updatePath();
});
window.addEventListener('resize', updatePath);

document.getElementById("year").textContent = new Date().getFullYear();
