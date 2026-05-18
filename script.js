gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

  const counter = document.querySelector(".loader-counter span");
  const loaderBar = document.querySelector(".loader-bar");

  gsap.set(".hero-title span", {
    y: 300,
    rotate: 6
  });

  gsap.set(".hero-title", {
    y: 120,
    scale: 1.2
  });

  gsap.set(".hero-img", {
    y: 120,
    scale: .7,
    rotate: -8
  });

  gsap.set(".mini", {
    y: 50
  });

  /* =========================
     FAKE LOADING SYSTEM
  ========================= */

  let load = {
    value: 0
  };

  const loadingTL = gsap.timeline({

    onUpdate: () => {

      counter.innerHTML = Math.floor(load.value);

      gsap.set(loaderBar,{
        width: load.value + "%"
      });

    },

    onComplete: startIntro
  });

  loadingTL.to(load,{
    value:100,
    duration:2.8,
    ease:"power2.inOut"
  });

  /* =========================
     MAIN INTRO
  ========================= */

  function startIntro(){

    const intro = gsap.timeline({
      defaults:{
        ease:"expo.out"
      }
    });

    /* =====================
       TITLE APPEAR
    ===================== */

    intro.to(".loader-title span",{
      y:"0%",
      duration:1.2
    });

    /* =====================
       COUNTER EXIT
    ===================== */

    intro.to(".loader-counter",{
      y:80,
      opacity:0,
      duration:.8
    },"-=.6");

    intro.to(".loader-progress",{
      scaleX:0,
      transformOrigin:"right",
      duration:1
    },"-=1");

    /* =====================
       LOADER WIPE
    ===================== */

    intro.to(".loader-reveal",{
      scaleY:1,
      transformOrigin:"bottom",
      duration:1.2,
      ease:"expo.inOut"
    },"-=.2");

    intro.to(".loader",{
      clipPath:"inset(0 0 100% 0)",
      duration:1.4,
      ease:"expo.inOut"
    },"-=1");

    /* =====================
       HERO REVEAL
    ===================== */

    intro.to("nav",{
      opacity:1,
      stagger:.08,
      duration:1.4
    },"-=.5");

    intro.to(".screen-marqueecontainer",{
      opacity:1,
      clipPath:"inset(0% 0 0 0)",
      duration:1.6
    },"-=1.2");

    intro.to(".hero-img",{
      opacity:1,
      y:0,
      scale:1,
      rotate:0,
      filter:"blur(0px)",
      duration:2,
      ease:"power4.out"
    },"-=1.3");

    intro.to(".hero-title",{
      opacity:1,
      y:0,
      scale:1,
      filter:"blur(0px)",
      duration:2.2
    },"-=2");

    intro.to(".hero-title span",{
      y:0,
      rotate:0,
      duration:2,
      stagger:.06,
      ease:"expo.out"
    },"-=2");

    intro.to(".mini",{
      opacity:1,
      y:0,
      duration:1.4,
      stagger:.1
    },"-=1.5");

    intro.call(() => {
      document.body.classList.remove("loading");
      document.querySelector(".loader").remove();
    });

  }

  /* =====================
     PARALLAX
  ===================== */

  gsap.to(".hero-img",{
    yPercent:-4,
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:1.5
    }
  });

  gsap.to(".hero-title",{
    yPercent:8,
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:2
    }
  });

  gsap.to(".hero-title span",{
    yPercent:-8,
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:2
    }
  });

});

/* =========================================================
   LIVE MOUSE DEPTH
========================================================= */

window.addEventListener("mousemove",(e)=>{

  const x = (e.clientX / window.innerWidth - .5);
  const y = (e.clientY / window.innerHeight - .5);

  gsap.to(".hero-img",{
    x:x * 40,
    y:y * 25,
    rotate:y * 6,
    duration:2,
    ease:"power3.out"
  });

  gsap.to(".hero-title",{
    x:x * 20,
    y:y * 10,
    duration:2.5,
    ease:"power3.out"
  });

});

//========================================== CONTENT ===========================================//

gsap.from(".hero-sub p",{
  y:50,
  opacity:0,
  stagger:.15,
  delay:.5,
  duration:1,
  ease:"power3.out"
});

gsap.utils.toArray(".big-text").forEach((el)=>{

  gsap.from(el,{
    scrollTrigger:{
      trigger:el,
      start:"top 85%"
    },
    y:120,
    opacity:0,
    duration:1.4,
    ease:"power4.out"
  });

});

gsap.from(".services-section .section-label",{
  scrollTrigger:{
    trigger:".services-section",
    start:"top 80%"
  },
  y:50,
  opacity:0,
  duration:1
});

gsap.from(".services-section .big-title",{
  scrollTrigger:{
    trigger:".services-section",
    start:"top 80%"
  },
  y:100,
  opacity:0,
  duration:1.2,
  ease:"power4.out"
});

gsap.from(".services-section .block",{
  scrollTrigger:{
    trigger:".services-section",
    start:"top 75%"
  },
  y:80,
  opacity:0,
  stagger:0.15,
  duration:1,
  ease:"power3.out"
});
/*
gsap.to(".track",{
  xPercent:30,
  ease:"none",
  scrollTrigger:{
    trigger:".references",
    start:"top bottom",
    end:"bottom top",
    scrub:1
  }
});
*/

// Marquee Initialization
const initMarquee = (selector, duration = 240) => {
  const wrapper = document.querySelector(selector);
  if (!wrapper) return;

  // Clone the items to ensure the screen is full
  const items = wrapper.innerHTML;
  wrapper.innerHTML = items + items + items; 

  // Calculate the width of ONE set of items
  const scrollWidth = wrapper.scrollWidth / 3;

  gsap.to(wrapper, {
    x: -scrollWidth,
    duration: duration,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % scrollWidth)
    }
  });
};

// Initialize both marquees
initMarquee(".screen-marqueecontent");


const track = document.querySelector(".track");

// duplicate for seamless loop
track.innerHTML += track.innerHTML;

const distance = track.scrollWidth / 2;

// main animation
const tween = gsap.to(track, {
  x: -distance,
  duration: 60,
  ease: "none",
  repeat: -1
});

// smooth hover pause/resume (no snapping)
const speed = { value: 1 };

gsap.ticker.add(() => {
  tween.timeScale(speed.value);
});

// hover interactions
track.addEventListener("mouseenter", () => {
  gsap.to(speed, {
    value: 0,
    duration: 0.8,
    ease: "power3.out"
  });
});

track.addEventListener("mouseleave", () => {
  gsap.to(speed, {
    value: 1,
    duration: 1.2,
    ease: "power3.out"
  });
});

// ============================== MENU ============================== //

const menuTrigger = document.getElementById('menu-trigger');
const navMenu = document.getElementById('nav-menu');
let menuIsOpen = false;

menuTrigger.addEventListener('click', () => {
  if (!menuIsOpen) {
    // OPENING
    gsap.to(navMenu, { y: "0%", duration: 0.8, ease: "expo.out" });

    gsap.fromTo(".menu-item", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", delay: 0.3 }
    );
    
    // Switch to X element and hide text
    menuTrigger.innerHTML = '<div class="X"></div>'; 
    menuTrigger.style.backgroundColor = "#000";
    menuTrigger.style.border = "1px solid #fff";
    menuTrigger.style.borderBottom = "0px";
    
    menuIsOpen = true;
  } else {
    // CLOSING
    gsap.to(navMenu, { y: "100%", duration: 0.5, ease: "power2.in" });
    
    // Switch back to text
    menuTrigger.innerHTML = 'INDEX <div class="menu-hov-bg"></div>';
    menuTrigger.style.backgroundColor = "#fff";
    menuTrigger.style.color = "#000";
    menuTrigger.style.border = "none";
    //menuTrigger.style.textShadow = "0 0 2px #000, 0 0 5px #000, 0 0 50px #000";
    
    menuIsOpen = false;
  }
});

const btn = document.getElementById('menu-trigger');

// Create "quickTo" setters for maximum performance and smoothness
const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

btn.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } = btn.getBoundingClientRect();
  
  // Calculate relative position from center
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  
  // Define pull strength (0.3 to 0.5 is usually the sweet spot)
  const moveX = (clientX - centerX) * 0.4;
  const moveY = (clientY - centerY) * 0.4;

  // Apply smooth movement
  xTo(moveX);
  yTo(moveY);
});

btn.addEventListener('mouseleave', () => {
  // Smoothly snap back with a slight bounce
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.7,
    ease: "elastic.out(1, 0.3)"
  });
});

// BG points -----------------------------------------------------------------
const gridCanvas = document.getElementById("grid-bg");
const ctx = gridCanvas.getContext("2d");

// --- 1. Create a hidden noise buffer ---
const noiseCanvas = document.createElement('canvas');
const noiseCtx = noiseCanvas.getContext('2d');
noiseCanvas.width = 100;
noiseCanvas.height = 100;

function createNoise() {
    const imageData = noiseCtx.createImageData(100, 100);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = data[i+1] = data[i+2] = val; // RGB
        data[i+3] = 25; // Opacity of the grain (keep it low!)
    }
    noiseCtx.putImageData(imageData, 0, 0);
}
createNoise();

let time = 0;

function resize() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function draw() {
    time += 0.005;
    
    // Clear canvas
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    // 2. Draw the Gradient
    const baseRadius = gridCanvas.width /** 0.75*/;
    // Horizontal movement
    const centerX = gridCanvas.width / 2 + Math.cos(time * 0.5) * (gridCanvas.width * 0.08);
    // Push the circle down so its TOP reaches screen center
    const centerY = gridCanvas.height * 0.5 + baseRadius + Math.sin(time * 0.4) * 40;
    const pulseRadius = baseRadius + Math.sin(time * 0.5) * 100;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
    gradient.addColorStop(0, "#ff1744");
    gradient.addColorStop(0.4, "#d10f35");
    gradient.addColorStop(0.8, "#7a061c");
    gradient.addColorStop(0.9, "#1a0005");
    gradient.addColorStop(1, "#000000");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

    // 3. Layer the Noise on top
    // We use 'source-over' or 'overlay' to blend the grain
    ctx.globalCompositeOperation = "source-over"; 
    
    // To animate the noise, we draw the small noise tile at random offsets
    const noiseOffsetX = Math.random() * noiseCanvas.width;
    const noiseOffsetY = Math.random() * noiseCanvas.height;

    // Create a pattern from the noise tile
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    ctx.save();
    ctx.translate(noiseOffsetX, noiseOffsetY); // Shifts noise every frame
    ctx.fillStyle = pattern;
    ctx.fillRect(-noiseOffsetX, -noiseOffsetY, gridCanvas.width, gridCanvas.height);
    ctx.restore();

    requestAnimationFrame(draw);
}

draw();