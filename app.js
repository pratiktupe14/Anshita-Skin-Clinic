document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Sticky Header on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight active nav link on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Form Submission Logic
  const appointmentForm = document.getElementById('appointment-form');
  const formStatus = document.getElementById('form-status');
  const whatsappSubmitBtn = document.getElementById('whatsapp-submit');

  const getFormData = () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    return { name, phone, message };
  };

  const validateForm = (data) => {
    if (!data.name || !data.phone) {
      formStatus.textContent = 'Please fill in your name and phone number.';
      formStatus.className = 'form-status error';
      return false;
    }
    return true;
  };

  // Standard Submission (Mock)
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (validateForm(data)) {
      // Here you would typically send data to a server (e.g., via Fetch API)
      formStatus.textContent = 'Thank you! Your request has been sent. We will contact you shortly.';
      formStatus.className = 'form-status success';
      appointmentForm.reset();
      
      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
      }, 5000);
    }
  });

  // WhatsApp Submission
  whatsappSubmitBtn.addEventListener('click', () => {
    const data = getFormData();
    if (validateForm(data)) {
      const clinicPhone = '918485027982'; // Country code + number
      let waMessage = `Hi, I'd like to book an appointment.%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}`;
      
      if (data.message) {
        waMessage += `%0A*Message/Service:* ${data.message}`;
      }

      const waUrl = `https://wa.me/${clinicPhone}?text=${waMessage}`;
      window.open(waUrl, '_blank');
      
      // Optionally reset form after sending
      appointmentForm.reset();
      formStatus.textContent = 'Opening WhatsApp...';
      formStatus.className = 'form-status success';
      
      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
      }, 3000);
    }
  });

  // Hero Carousel Logic
  const track = document.getElementById('hero-carousel-track');
  const indicators = document.querySelectorAll('#hero-carousel-indicators .indicator');

  if (track && indicators.length > 0) {
    track.addEventListener('scroll', () => {
      // Calculate which slide is currently in view
      const scrollPosition = track.scrollLeft;
      const slideWidth = track.clientWidth;
      const activeIndex = Math.round(scrollPosition / slideWidth);

      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        const slideWidth = track.clientWidth;
        track.scrollTo({
          left: index * slideWidth,
          behavior: 'smooth'
        });
      });
    });
  }
});
