document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (Dark/Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    /* ==========================================================================
       2. Sticky Navigation & Scroll Indicators
       ========================================================================== */
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header scroll styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${progress}%`;

        // Scroll-to-Top button visibility
        if (scrollTop > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Active Link Highlighting on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to Top action
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       3. Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       4. Typewriter Effect
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const roles = ['API Architect', 'AI Integrations Specialist', 'Backend Engineer', 'Clean Code Advocate'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster delete speed
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    };

    if (typewriterElement) {
        type();
    }

    /* ==========================================================================
       5. Skills Tab Control
       ========================================================================== */
    const skillsTabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillsPanels = document.querySelectorAll('.skills-panel');

    skillsTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            skillsTabButtons.forEach(btn => btn.classList.remove('active'));
            skillsPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            
            const targetPanel = document.getElementById(targetTab);
            targetPanel.classList.add('active');
            
            // Retrigger progress bar animation inside the active tab
            const progressBars = targetPanel.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
            });
        });
    });

    /* ==========================================================================
       6. Project Filtering
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Toggle active filter button class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset card scale
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });


    /* ==========================================================================
       8. Intersection Observer for Fade-In Animations
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.card, .project-card, .timeline-item, .strength-card, .stat-box');
    
    // Add base transition properties dynamically
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // If it's a stats panel, trigger the numbers animation
                if (entry.target.classList.contains('stat-box')) {
                    animateNumber(entry.target.querySelector('.stat-number'));
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Helper to count up numbers in stats
    function animateNumber(element) {
        if (!element) return;
        const target = parseFloat(element.getAttribute('data-target'));
        const hasPlus = element.textContent.includes('+');
        const hasPercent = element.textContent.includes('%');
        let current = 0;
        const duration = 1500; // ms
        const step = target / (duration / 16); // 60fps

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            
            let displayVal = current;
            if (target % 1 === 0) {
                displayVal = Math.floor(current);
            } else {
                displayVal = current.toFixed(1);
            }
            
            element.textContent = `${displayVal}${hasPercent ? '%' : ''}${hasPlus ? '+' : ''}`;
        }, 16);
    }

    /* ==========================================================================
       9. Form Validation & Simulation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Please fill out all fields.';
                return;
            }

            // Simulate form submission
            formFeedback.className = 'form-feedback';
            formFeedback.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing message...';

            setTimeout(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = '<i class="fa-solid fa-check"></i> Message sent successfully! (Simulated backend submission)';
                
                // Clear the form fields
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formFeedback.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
});