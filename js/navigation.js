/* ===================================
   SELECT ELEMENTS
=================================== */

const header = document.querySelector('.header');

const navLinks = document.querySelectorAll('.nav-link');

const sections = document.querySelectorAll('section');

const menuToggle = document.querySelector('.menu-toggle');

const navMenu = document.querySelector('.nav-links');

/* ===================================
   STICKY HEADER ON SCROLL
=================================== */

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        header.style.background = 'rgba(11, 11, 11, 0.95)';

        header.style.borderBottom =
            '1px solid #2A2A2A';

        header.style.boxShadow =
            '0 5px 20px rgba(0, 0, 0, 0.3)';

    }

    else {

        header.style.background =
            'rgba(11, 11, 11, 0.85)';

        header.style.borderBottom =
            '1px solid transparent';

        header.style.boxShadow = 'none';

    }

});

/* ===================================
   ACTIVE NAVIGATION LINK
=================================== */

window.addEventListener('scroll', () => {

    let currentSection = '';

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute('id');

        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (
            link.getAttribute('href') ===
            `#${currentSection}`
        ) {

            link.classList.add('active');

        }

    });

});

/* ===================================
   MOBILE MENU TOGGLE
=================================== */

menuToggle.addEventListener('click', () => {

    navMenu.classList.toggle('active');

    menuToggle.classList.toggle('active');

});

/* ===================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
=================================== */

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('active');

        menuToggle.classList.remove('active');

    });

});

/* ===================================
   HAMBURGER MENU ANIMATION
=================================== */

menuToggle.addEventListener('click', () => {

    const spans =
        menuToggle.querySelectorAll('span');

    spans[0].classList.toggle('rotate-top');

    spans[1].classList.toggle('hide-middle');

    spans[2].classList.toggle('rotate-bottom');

});