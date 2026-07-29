// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Dark/light mode toggle ----------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeIcon) {
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

const storedTheme = localStorage.getItem(THEME_KEY);
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(storedTheme || (systemPrefersDark ? "dark" : "light"));

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);

        if (themeIcon && !prefersReducedMotion) {
            themeIcon.classList.remove("spin");
            void themeIcon.offsetWidth; // restart animation
            themeIcon.classList.add("spin");
        }
    });
}

// Keep in sync with system changes if the user hasn't picked a theme manually
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
    }
});

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

// ---------- Loading spinner ----------
const loadingSpinner = document.getElementById("loadingSpinner");

function hideSpinner() {
    if (loadingSpinner) loadingSpinner.classList.add("is-hidden");
}

if (document.readyState === "complete") {
    hideSpinner();
} else {
    window.addEventListener("load", hideSpinner);
    // Safety net in case 'load' is delayed by slow external assets/fonts
    setTimeout(hideSpinner, 2500);
}

// ---------- Parallax ambient orbs ----------
const orbs = document.querySelectorAll(".orb");

if (orbs.length && !prefersReducedMotion) {
    let parallaxTicking = false;

    function updateOrbParallax() {
        const scrollRatio = window.scrollY * 0.06;
        orbs.forEach((orb, i) => {
            const direction = i % 2 === 0 ? 1 : -1;
            orb.style.transform = `translateY(${scrollRatio * direction}px)`;
        });
        parallaxTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!parallaxTicking) {
            requestAnimationFrame(updateOrbParallax);
            parallaxTicking = true;
        }
    });

    // Subtle mouse-driven drift for extra depth
    window.addEventListener("mousemove", (e) => {
        const xRatio = (e.clientX / window.innerWidth - 0.5) * 20;
        const yRatio = (e.clientY / window.innerHeight - 0.5) * 20;
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 0.4;
            orb.style.marginLeft = `${xRatio * factor}px`;
            orb.style.marginTop = `${yRatio * factor}px`;
        });
    });
}

// ---------- 3D tilt on project cards ----------
const tiltCards = document.querySelectorAll(".project-card");

if (!prefersReducedMotion) {
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

// ---------- Project details modal ----------
const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");

function openProjectModal(card) {
    const img = card.querySelector("img");
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDescription.textContent = card.querySelector(".project-info p").textContent;
    modalTags.innerHTML = card.querySelector(".project-tags").innerHTML;
    modalLinks.innerHTML = card.querySelector(".project-links").innerHTML;

    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeProjectModal() {
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (projectModal) {
    document.querySelectorAll(".project-view-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".project-card");
            if (card) openProjectModal(card);
        });
    });

    modalClose.addEventListener("click", closeProjectModal);
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("is-open")) {
            closeProjectModal();
        }
    });
}

// ---------- Contact form validation ----------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const nameInput = document.getElementById("cf-name");
    const emailInput = document.getElementById("cf-email");
    const messageInput = document.getElementById("cf-message");
    const formStatus = document.getElementById("formStatus");

    function showFieldError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) errorEl.textContent = message;
        input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateContactForm() {
        let isValid = true;

        if (!nameInput.value.trim()) {
            showFieldError(nameInput, "Please enter your name.");
            isValid = false;
        } else {
            showFieldError(nameInput, "");
        }

        if (!emailInput.value.trim()) {
            showFieldError(emailInput, "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showFieldError(emailInput, "Please enter a valid email address.");
            isValid = false;
        } else {
            showFieldError(emailInput, "");
        }

        if (!messageInput.value.trim()) {
            showFieldError(messageInput, "Please enter a message.");
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showFieldError(messageInput, "Message should be at least 10 characters.");
            isValid = false;
        } else {
            showFieldError(messageInput, "");
        }

        return isValid;
    }

    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener("blur", validateContactForm);
    });

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateContactForm()) {
            formStatus.textContent = "Please fix the errors above.";
            formStatus.classList.remove("success");
            formStatus.classList.add("error");
            return;
        }

        // This is a static site with no backend, so we hand off to the
        // visitor's own email client with the message pre-filled.
        const subject = encodeURIComponent(`Portfolio contact from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(
            `${messageInput.value.trim()}\n\n— ${nameInput.value.trim()} (${emailInput.value.trim()})`
        );

        formStatus.textContent = "Opening your email client to send the message...";
        formStatus.classList.remove("error");
        formStatus.classList.add("success");

        window.location.href = `mailto:khanyekhotso05@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });
}
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
