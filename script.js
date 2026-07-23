// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Mobile nav toggle ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after choosing a link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ---------- Scroll-reveal for sections ----------
const revealTargets = document.querySelectorAll(
    ".resume-block, .project-card, .skills-category, .contact-content, .contact-links a"
);

if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
}

// ---------- Animate skill bars when they scroll into view ----------
// Each .fill div already carries its true width inline (style="width:70%").
// We snapshot that value, drop to 0, then transition back up once the bar
// enters the viewport. If IntersectionObserver isn't available, we simply
// leave the inline width alone so bars still render filled correctly.
const skillBars = document.querySelectorAll(".fill");

if ("IntersectionObserver" in window) {
    skillBars.forEach((bar) => {
        const match = bar.getAttribute("style").match(/width:\s*([\d.]+%)/);
        if (!match) return;
        const targetWidth = match[1];
        bar.style.width = "0";
        bar.dataset.targetWidth = targetWidth;
    });

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.dataset.targetWidth;
                    skillObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.4 }
    );
    skillBars.forEach((bar) => skillObserver.observe(bar));
}

// ---------- Terminal-badge typewriter ----------
const typedEl = document.getElementById("typedRole");
const roles = [
    "Final Year IT Student",
    "Aspiring Data Analyst",
    "Business Analysis Enthusiast",
    "Problem Solver"
];

if (typedEl) {
    if (prefersReducedMotion) {
        typedEl.textContent = roles[0];
    } else {
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let isDeleting = false;

        // Start already showing the first role fully typed, then loop from there.
        typedEl.textContent = roles[0];

        const TYPE_SPEED = 55;
        const DELETE_SPEED = 30;
        const HOLD_TIME = 1600;

        function tick() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                charIndex++;
                if (charIndex >= currentRole.length) {
                    typedEl.textContent = currentRole;
                    isDeleting = true;
                    setTimeout(tick, HOLD_TIME);
                    return;
                }
                typedEl.textContent = currentRole.slice(0, charIndex);
                setTimeout(tick, TYPE_SPEED);
            } else {
                charIndex--;
                typedEl.textContent = currentRole.slice(0, charIndex);
                if (charIndex <= 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(tick, 400);
                    return;
                }
                setTimeout(tick, DELETE_SPEED);
            }
        }

        setTimeout(tick, HOLD_TIME);
    }
}

// ---------- Scroll progress bar ----------
const scrollProgress = document.getElementById("scrollProgress");

if (scrollProgress) {
    let ticking = false;

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
        scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    });

    updateScrollProgress();
}
