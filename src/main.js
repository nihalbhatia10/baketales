import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// 2. Hero 3D Tilt Effect
const heroImage = document.querySelector('.cake-3d');
const heroVisual = document.querySelector('.hero-visual');

if (heroImage && heroVisual) {
  heroVisual.addEventListener('mousemove', (e) => {
    // Get dimensions
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-15 to 15 degrees)
    const xRot = ((y / rect.height) - 0.5) * -15;
    const yRot = ((x / rect.width) - 0.5) * 15;
    
    gsap.to(heroImage, {
      rotationX: xRot,
      rotationY: yRot,
      duration: 0.8,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    gsap.to(heroImage, {
      rotationX: 0,
      rotationY: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  });
}

// 3. Scroll Reveal Animations (Calm & Luxury)
// Fade Ins
gsap.utils.toArray('.fade-in').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power2.out',
    delay: i * 0.1
  });
});

// Slide Ups for larger blocks
gsap.utils.toArray('.slide-up').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 60,
    duration: 1.5,
    ease: 'power3.out'
  });
});

// 4. Parallax Background effect for Hero
gsap.to('.hero-bg-glow', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  scale: 1.2,
  opacity: 0.5
});

// 5. FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    
    if (header.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = 0;
    }
    
    // Close others
    accordionHeaders.forEach(otherHeader => {
      if (otherHeader !== header && otherHeader.classList.contains('active')) {
        otherHeader.classList.remove('active');
        otherHeader.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});
