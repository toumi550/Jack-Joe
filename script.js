// Navigation fluide
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(contactForm);
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            // Validation simple
            let isValid = true;
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                    input.style.backgroundColor = '#ffe6e6';
                } else {
                    input.style.borderColor = '';
                    input.style.backgroundColor = '';
                }
            });
            
            if (isValid) {
                // Simulation d'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                // Simulation d'une requête (remplacer par votre logique d'envoi)
                setTimeout(() => {
                    alert('Merci ! Votre message a été envoyé. Nous vous contacterons bientôt.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // Navigation fluide vers les sections
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Effet de parallaxe léger pour le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animation des cartes de service au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Gestion du bouton "Planifier une réunion"
    const meetingBtn = document.querySelector('.btn-secondary');
    if (meetingBtn && meetingBtn.textContent.includes('PLANIFIER')) {
        meetingBtn.addEventListener('click', function() {
            // Ici vous pouvez intégrer Calendly ou un autre système de réservation
            alert('Redirection vers le système de réservation...');
            // window.open('https://calendly.com/votre-lien', '_blank');
        });
    }
    
    // Validation en temps réel des champs du formulaire
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff6b6b';
                this.style.backgroundColor = '#ffe6e6';
            } else {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
        
        input.addEventListener('focus', function() {
            // Vérifier si c'est dans la section "We will call you back"
            const isCallBackSection = this.closest('.contact--wecall');
            if (isCallBackSection) {
                this.style.borderColor = '#667eea';
                this.style.backgroundColor = '#1f1f1f';
                this.style.color = '#ffffff';
            } else {
                this.style.borderColor = '#667eea';
                this.style.backgroundColor = '#f8f9ff';
                this.style.color = '#333';
            }
        });
    });
    
    // Effet hover sur les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Gestion responsive du menu (pour future implémentation mobile)
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher la navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer la navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Transition fluide pour la navbar
    navbar.style.transition = 'transform 0.3s ease';
});

// Fonction utilitaire pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour formater le numéro de téléphone
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
    }
    return phoneNumber;
}

// Ajout de la validation email en temps réel
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ff6b6b';
                this.style.backgroundColor = '#ffe6e6';
            }
        });
    }
    
    // Formatage automatique du numéro de téléphone
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    }
    
    // Fonctionnalité des onglets interactifs
    initializeTabs();
    initializeHamburgerMenu();
});

// Initialize tabs functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Initializing tabs...', { tabButtons: tabButtons.length, tabContents: tabContents.length });

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = button.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Tab activated:', targetTab);
            } else {
                console.error('Target content not found:', targetTab);
            }
        });
    });
}

// Menu Hamburger Functionality
function initializeHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    console.log('Initializing hamburger menu...', { hamburgerMenu, navMenu });

    if (!hamburgerMenu) {
        console.error('Hamburger menu button not found!');
        return;
    }
    
    if (!navMenu) {
        console.error('Navigation menu not found!');
        return;
    }

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked!');
            
            // Toggle active class on hamburger button
            hamburgerMenu.classList.toggle('active');
            
            // Toggle active class on nav menu
            navMenu.classList.toggle('active');
            
            console.log('Menu active:', navMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close menu
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}