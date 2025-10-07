 VANTA.GLOBE({
            el: "#vanta-globe",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: "#ff2d75",
            backgroundColor: "#09090b",
            size: 0.8
        });

        // Typing animation
        const phrases = ["Capturing Light, Emotion, and Time", "Weddings • Portraits • Stories"];
        const typingElement = document.getElementById('typing-text');
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isEnd = true;
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeWriter, 500);
            } else {
                const speed = isDeleting ? 50 : 100;
                setTimeout(typeWriter, speed);
            }
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('bg-black/80');
                navbar.classList.remove('bg-black/50');
            } else {
                navbar.classList.remove('bg-black/80');
                navbar.classList.add('bg-black/50');
            }
        });

        // Initialize Feather Icons
        document.addEventListener('DOMContentLoaded', function() {
            feather.replace();
            typeWriter();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

         document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent page reload

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
       const service = document.getElementById('service').value;

      if (!name || !email || !message || !service) {
        alert('Please fill in all fields.');
        return;
      }

      // Send email using EmailJS
      emailjs.send(
        "service_j2b5tgm",     // ← REPLACE WITH YOUR SERVICE ID
        "template_k9qw7w7",    // ← REPLACE WITH YOUR TEMPLATE ID
        {
          from_name: name,
          reply_to: email,
          service: service,
          message: message

        }
      )
      .then(function(response) {
        alert('✅ Thank you! Your message was sent successfully.');
        document.getElementById('contact-form').reset();
      }, function(error) {
        alert('❌ Failed to send. Please try again or contact us directly.');
        console.log('FAILED...', error);
      });
    });