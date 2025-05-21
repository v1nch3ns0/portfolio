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
});