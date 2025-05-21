document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) AOS.init({ once: true });

    // Animated Skills Bars
    function animateSkills() {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const value = bar.getAttribute('data-skill');
            bar.style.width = value + '%';
        });
    }
    // Animate skills when section is in view
    let skillsAnimated = false;
    function onScrollSkills() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        if (!skillsAnimated && rect.top < window.innerHeight - 100) {
            animateSkills();
            skillsAnimated = true;
        }
    }
    window.addEventListener('scroll', onScrollSkills);
    onScrollSkills();

    // Remove data-aos attributes after first load to prevent double animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.removeAttribute('data-aos');
        card.removeAttribute('data-aos-delay');
    });

    // Project Gallery Filtering with animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                if (match) {
                    card.classList.remove('hide');
                    card.classList.add('zoom-in-anim');
                    setTimeout(() => {
                        card.classList.remove('zoom-in-anim');
                    }, 500);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // Smooth scroll for nav-links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal project details
    const projectDetails = {
        "modal-landing": {
            title: "Modern Landing Page",
            desc: "A modern, responsive landing page built with HTML, CSS, and JavaScript. Features smooth animations, mobile-first design, and a clean, professional look. <br><br><strong>Features:</strong><ul><li>Responsive layout</li><li>Animated hero section</li><li>Call-to-action buttons</li></ul>",
            link: "https://v1nch3ns0.github.io/landing-page/"
        },
        "modal-portfolio": {
            title: "Portfolio Website",
            desc: "A personal portfolio website to showcase my projects, skills, and contact information. Built with accessibility and performance in mind.<br><br><strong>Features:</strong><ul><li>Project gallery with filters</li><li>Animated skill bars</li><li>Contact form</li></ul>",
            link: "https://v1nch3ns0.github.io/portfolio/"
        },
        // Add more projects as needed
    };

    // Modal logic
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    document.querySelectorAll('.project-card[data-modal]').forEach(card => {
        card.addEventListener('click', () => {
            const modalKey = card.getAttribute('data-modal');
            const info = projectDetails[modalKey];
            if (info) {
                modalBody.innerHTML = `
                    <h3>${info.title}</h3>
                    <p>${info.desc}</p>
                    <a href="${info.link}" target="_blank" rel="noopener">Visit Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                `;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    function closeModal() {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.classList.remove('show', 'closing');
            document.body.style.overflow = '';
        }, 300); // Match the CSS animation duration
    }
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (modal.classList.contains('show') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeModal();
        }
    });
});
