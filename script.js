document.addEventListener('DOMContentLoaded', () => {
  initializeMobileNavigation();
  initializeTestimonialsSlider();
  initializeContactForm();
  initializeCarousel();
});

function initializeMobileNavigation() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
    });
  });
}

function initializeTestimonialsSlider() {
  const testimoniosSlider = document.getElementById('testimonios-slider');
  const testimonios = [
    { name: 'Juan Pérez -', text: 'Excelente servicio, muy profesionales.' },
    { name: 'María García -', text: 'Resolvieron mi problema eléctrico rápidamente.' },
    { name: 'Carlos Rodríguez -', text: 'Muy satisfecho con la instalación de mi aire acondicionado.' }
  ];

  let currentTestimonial = 0;

  function showTestimonial() {
    const testimonial = testimonios[currentTestimonial];
    testimoniosSlider.innerHTML = `
      <blockquote>
        <p>${testimonial.text}</p>
        <footer>- ${testimonial.name}</footer>
      </blockquote>
    `;
    currentTestimonial = (currentTestimonial + 1) % testimonios.length;
  }

  showTestimonial();
  setInterval(showTestimonial, 9000);
}

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Aquí se enviaría normalmente a un servidor
    console.log('Form submitted:', data);

    // Para demostración, solo mostramos un mensaje
    alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
    contactForm.reset();
  });
}

function initializeCarousel() {
  const carruselInner = document.querySelector('.carrusel-inner');
  const carruselItems = document.querySelectorAll('.carrusel-item');
  const prev = document.querySelector('.carrusel-control.prev');
  const next = document.querySelector('.carrusel-control.next');
  const indicators = document.querySelectorAll('.indicators span');
  
  let currentIndex = 0;
  let interval;

  function showItem(index) {
    carruselInner.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  prev.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carruselItems.length - 1;
    showItem(currentIndex);
    resetInterval();
  });

  next.addEventListener('click', () => {
    currentIndex = (currentIndex < carruselItems.length - 1) ? currentIndex + 1 : 0;
    showItem(currentIndex);
    resetInterval();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      showItem(currentIndex);
      resetInterval();
    });
  });

  function startInterval() {
    interval = setInterval(() => {
      currentIndex = (currentIndex < carruselItems.length - 1) ? currentIndex + 1 : 0;
      showItem(currentIndex);
    }, 10000); 
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  startInterval();
}
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Previene el comportamiento predeterminado del enlace

      const targetId = this.getAttribute('href'); // Obtiene el ID de destino
      const targetElement = document.querySelector(targetId); // Selecciona el elemento objetivo

      // Ralentiza el desplazamiento
      smoothScroll(targetElement.offsetTop, 1000); // 1000 ms para el desplazamiento

  });
});

// Función para un desplazamiento suave
function smoothScroll(targetPosition, duration) {
  const startPosition = window.pageYOffset; // Posición actual del scroll
  const distance = targetPosition - startPosition; // Distancia a recorrer
  let startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime; // Tiempo transcurrido
      const scrollStep = ease(timeElapsed, startPosition, distance, duration); // Cálculo del paso de scroll
      window.scrollTo(0, scrollStep); // Realiza el scroll

      if (timeElapsed < duration) {
          requestAnimationFrame(animation); // Continua la animación
      }
  }

  requestAnimationFrame(animation); // Inicia la animación
}

// Función de easing para suavizar el scroll
function ease(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}
