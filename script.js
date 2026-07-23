// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

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
    ".resume-block, .project-card, .skills-category, .contact-content"
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
