console.log("script is linked")

document.addEventListener('DOMContentLoaded', function() {
    // Projects button scroll
    const projectsButton = document.querySelector('.projects-button');
    projectsButton.addEventListener('click', function() {
        const projectsSection = document.getElementById('projects');
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Navigation links scroll
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Auto-resize textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Clipboard functionality
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const textToCopy = this.textContent;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Create and show notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.textContent = 'Gekopieerd naar klembord!';
                document.body.appendChild(notification);

                // Remove notification after 2 seconds
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Verzenden...';
            submitBtn.disabled = true;
            console.log(Date.now());
            // Send email using EmailJS
            emailjs.send(
                "service_1iwm80g", // Replace with your EmailJS service ID (found in Email Services)
                "template_udqi47f", // Replace with your EmailJS template ID (found in Email Templates)
                {
                    name: name,
                    date: Date.now(),
                    email: email,
                    message: message,
                }
            )
            .then(function() {
                // Show success notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.textContent = 'Bericht succesvol verzonden!';
                document.body.appendChild(notification);

                // Remove notification after 2 seconds
                setTimeout(() => {
                    notification.remove();
                }, 2000);

                // Clear form
                contactForm.reset();
                if (textarea) {
                    textarea.style.height = 'auto';
                }
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                // Show error notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification error';
                notification.textContent = 'Er is een fout opgetreden. Probeer het later opnieuw.';
                document.body.appendChild(notification);

                // Remove notification after 2 seconds
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});