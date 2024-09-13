document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
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

  // Testimonials slider
  const testimoniosSlider = document.getElementById('testimonios-slider');
  const testimonios = [
    { name: 'Juan Pérez', text: 'Excelente servicio, muy profesionales.' },
    { name: 'María García', text: 'Resolvieron mi problema eléctrico rápidamente.' },
    { name: 'Carlos Rodríguez', text: 'Muy satisfecho con la instalación de mi aire acondicionado.' }
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
  setInterval(showTestimonial, 5000);

  // Contact form submission
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log('Form submitted:', data);

    // For demonstration, we'll just show an alert
    alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
    contactForm.reset();
  });
});