/**
 * ==========================================
 * APPLE TRAVELS CLIENT SCRIPT (SERVERLESS)
 * ==========================================
 * To change the WhatsApp phone number that receives booking and contact inquiries,
 * look for the phone number "917447500942" in the forms section below (Section 7 and 8)
 * and update it with your country code + phone number (e.g. 91xxxxxxxxxx).
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Sticky Header & Active Link Tracking
  // ==========================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header background transition
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Mobile Menu Toggle Drawer
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = menuToggle.querySelector('i');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle menu icon between bars and xmark
    if (navMenu.classList.contains('active')) {
      menuIcon.className = 'fa-solid fa-xmark';
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuIcon.className = 'fa-solid fa-bars';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuIcon.className = 'fa-solid fa-bars';
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuIcon.className = 'fa-solid fa-bars';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ==========================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% is visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger point
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 4. Booking Tab Switcher (Corporate vs Individual)
  // ==========================================
  const tabIndividual = document.getElementById('tab-individual');
  const tabCorporate = document.getElementById('tab-corporate');
  const bookingTypeInput = document.getElementById('booking-type');
  const bookingSubmitBtn = document.getElementById('btn-submit-booking');

  const setBookingTab = (type) => {
    if (type === 'corporate') {
      tabCorporate.classList.add('active');
      tabIndividual.classList.remove('active');
      bookingTypeInput.value = 'corporate';
      bookingSubmitBtn.innerHTML = 'Request Corporate Quote <i class="fa-solid fa-file-invoice-dollar"></i>';
    } else {
      tabIndividual.classList.add('active');
      tabCorporate.classList.remove('active');
      bookingTypeInput.value = 'individual';
      bookingSubmitBtn.innerHTML = 'Request Booking <i class="fa-solid fa-calendar-check"></i>';
    }
  };

  tabIndividual.addEventListener('click', (e) => {
    e.preventDefault();
    setBookingTab('individual');
  });

  tabCorporate.addEventListener('click', (e) => {
    e.preventDefault();
    setBookingTab('corporate');
  });

  // ==========================================
  // 5. Fleet Category Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        // Reset element layout state
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';

        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          // Use flex/block based on styles
          item.style.display = 'flex';
          // Trigger reflow to run transition
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    });
  });

  // ==========================================
  // 6. Quick Booking prefill triggers
  // ==========================================
  const quickBookBtns = document.querySelectorAll('.btn-quick-book');
  const carTypeSelect = document.getElementById('car-type');

  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const carName = btn.getAttribute('data-car');
      
      // Map car name keywords to selector options
      if (carName.toLowerCase().includes('dzire') || carName.toLowerCase().includes('etios')) {
        carTypeSelect.value = 'sedan';
      } else if (carName.toLowerCase().includes('innova') || carName.toLowerCase().includes('ertiga')) {
        carTypeSelect.value = 'suv';
      } else if (carName.toLowerCase().includes('mercedes') || carName.toLowerCase().includes('bmw')) {
        carTypeSelect.value = 'luxury';
      } else if (carName.toLowerCase().includes('traveller') || carName.toLowerCase().includes('bus')) {
        carTypeSelect.value = 'traveler';
      }

      // Smooth scroll to booking
      document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
      });

      // Highlight the selector to guide user
      carTypeSelect.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        carTypeSelect.style.borderColor = 'var(--border-color)';
      }, 1500);
    });
  });

  // Prefill default date as tomorrow
  const pickupDateInput = document.getElementById('pickup-date');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  pickupDateInput.value = tomorrowFormatted;
  pickupDateInput.min = tomorrowFormatted;

  // ==========================================
  // 7. Booking Request Submission & WhatsApp Logic
  // ==========================================
  const bookingForm = document.getElementById('booking-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const modalTitle = document.getElementById('modal-title-text');
  const modalDesc = document.getElementById('modal-desc-text');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookingType = bookingTypeInput.value;
    const pickupLoc = document.getElementById('pickup-loc').value.trim();
    const dropLoc = document.getElementById('drop-loc').value.trim();
    const dateVal = document.getElementById('pickup-date').value;
    const carVal = carTypeSelect.options[carTypeSelect.selectedIndex].text;
    const phoneVal = document.getElementById('contact-num').value.trim();

    // Create WhatsApp text message for instant booking
    const isCorporate = (bookingType === 'corporate');
    const introText = isCorporate ? "Hello Apple Travels, I want to request a Corporate Rental quote." : "Hello Apple Travels, I want to book a car.";
    const message = `${introText}\n\n*Booking Details:*\n• Service Type: ${isCorporate ? 'Corporate Account' : 'Individual Client'}\n• Pickup Location: ${pickupLoc}\n• Dropoff Location: ${dropLoc}\n• Travel Date: ${dateVal}\n• Car Category: ${carVal}\n• Contact Number: ${phoneVal}`;
    
    // Primary WhatsApp contact: 7447500942 (Modify the number '917447500942' below to change target phone)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917447500942?text=${encodedMessage}`;

    // Configure success modal content
    modalTitle.textContent = isCorporate ? "Quote Request Submitted!" : "Booking Request Created!";
    modalDesc.innerHTML = `Your details have been registered.<br><br><strong>Next Step:</strong> You will be redirected to WhatsApp to instantly share your travel plan with our reservation desk. Alternatively, you can reach us at <strong>+91 7447500942</strong>.`;

    // Display custom modal
    successModal.classList.add('active');

    // Trigger WhatsApp redirect after modal close or click
    const handleRedirect = () => {
      successModal.classList.remove('active');
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
      pickupDateInput.value = tomorrowFormatted; // Reset to tomorrow
    };

    // Listen to modal button action
    closeModalBtn.onclick = handleRedirect;
  });

  // ==========================================
  // 8. Contact Form Mock Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email-input').value.trim();
    const phone = document.getElementById('contact-phone-input').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Text for whatsapp message
    const waMessage = `Hello Apple Travels,\n\nI have a general query/business inquiry.\n\n*Contact Details:*\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n\n*Message:*\n${message}`;
    const encodedWaMessage = encodeURIComponent(waMessage);
    // WhatsApp number for inquiries (Modify the number '917447500942' below to change target phone)
    const whatsappUrl = `https://wa.me/917447500942?text=${encodedWaMessage}`;

    // Configure modal text for contact query
    modalTitle.textContent = "Message Received!";
    modalDesc.innerHTML = `Hi ${name}, thank you for contacting us.<br><br>We are redirecting you to WhatsApp to connect with our representative instantly. Or we will email you at <strong>${email}</strong> shortly.`;

    successModal.classList.add('active');

    const handleContactRedirect = () => {
      successModal.classList.remove('active');
      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    };

    closeModalBtn.onclick = handleContactRedirect;
  });

  // Close modal when clicking on background
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
  });
});
