// main.js
document.addEventListener("DOMContentLoaded", function () {

    // 1) Mobile menu toggle
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector(".main-nav");
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
    }

    // 2) Scroll-to-top button
    const scrollBtn = document.querySelector("[data-scroll-top]");
    if (scrollBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 250) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 3) Courses horizontal carousel buttons
    const coursesTrack = document.querySelector("[data-courses-track]");
    const prevBtn = document.querySelector("[data-courses-prev]");
    const nextBtn = document.querySelector("[data-courses-next]");

    if (coursesTrack && prevBtn && nextBtn) {
        const scrollAmount = 300;

        prevBtn.addEventListener("click", function () {
            coursesTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        nextBtn.addEventListener("click", function () {
            coursesTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    }

    // 4) Show discount details on course cards
    const discountButtons = document.querySelectorAll(".show-discount");
    discountButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            alert("This course includes a limited-time discount for Saudi students. Prices include VAT.");
        });
    });

    // 5) Animated counters in hero stats
    const counters = document.querySelectorAll("[data-counter]");
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(function (el) {
            const target = parseInt(el.getAttribute("data-counter"), 10);
            let value = 0;
            const step = Math.max(1, Math.floor(target / 120));

            const timer = setInterval(function () {
                value += step;
                if (value >= target) {
                    value = target;
                    clearInterval(timer);
                }
                el.textContent = value + (target >= 100 && target < 1000 ? "%" : (target >= 1000 ? "+" : ""));
            }, 20);
        });
    }

    if (counters.length > 0) {
        const heroSection = document.querySelector(".hero");
        if (heroSection && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        startCounters();
                        observer.disconnect();
                    }
                });
            });

            observer.observe(heroSection);
        } else {
            // fallback
            startCounters();
        }
    }

    // ==== Interactions for other pages (to be created later) ====

    // 6) FAQ accordion (faq.html)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", function () {
                item.classList.toggle("open");
                const answer = item.querySelector(".faq-answer");
                if (answer) {
                    if (item.classList.contains("open")) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        }
    });

    // 7) Placement test simple evaluation (placement-test.html)
    const placementForm = document.querySelector("#placement-form");
    if (placementForm) {
        placementForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let score = 0;
            const answers = placementForm.querySelectorAll("input[type=radio]:checked");
            answers.forEach(function () {
                score += 1;
            });

            let level = "";
            if (score <= 3) level = "A1 – Beginner";
            else if (score <= 6) level = "A2 – Elementary";
            else if (score <= 8) level = "B1 – Intermediate";
            else level = "B2 – Upper-Intermediate";

            const resultBox = document.querySelector("#placement-result");
            if (resultBox) {
                resultBox.textContent =
                    "Your estimated level is: " + level + ". Our team will contact you with a detailed plan.";
            }
        });
    }

    // 8) Contact / Register form validation (contact.html / courses.html)
    const requiredForms = document.querySelectorAll("[data-validate=form]");
    requiredForms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
            const requiredFields = form.querySelectorAll("[data-required]");
            let valid = true;
 
            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add("field-error");
                } else {
                    field.classList.remove("field-error");
                }
            });

            if (!valid) {
                e.preventDefault();
                alert("Please fill in all required fields before submitting.");
            }
        });
    });

});
