document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });
    }

    // Cursor interaction on links/buttons
    if (cursor) {
        const hoverables = document.querySelectorAll('a, button');
        hoverables.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursor.style.background = 'rgba(0,0,0,0.05)';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .feature-card, .lifestyle-item, .category-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Order Page Navigation - scroll CTA buttons to order section
    const scrollCTAs = document.querySelectorAll('.cta-nav, .secure-btn');
    scrollCTAs.forEach(btn => {
        btn.addEventListener('click', () => {
            const orderPage = document.getElementById('order-page');
            if (orderPage) {
                orderPage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll primary-btn to order page only if it's not the checkout submit
    document.querySelectorAll('.primary-btn:not(.checkout-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            const orderPage = document.getElementById('order-page');
            if (orderPage) {
                orderPage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Checkout Form - Web3Forms AJAX Submission
    const checkoutForm = document.getElementById('checkout-form');
    const formResult = document.getElementById('form-result');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            formResult.innerHTML = "Processing your order...";
            formResult.style.display = "block";
            formResult.className = "form-result processing";

            fetch('https://formbold.com/s/9XW5e', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(async (response) => {
                if (response.ok) {
                    formResult.innerHTML = "✨ Your order has been placed! We'll contact you shortly.";
                    formResult.className = "form-result success";
                    checkoutForm.reset();
                } else {
                    const data = await response.json();
                    formResult.innerHTML = data.message || "Oops! Something went wrong.";
                    formResult.className = "form-result error";
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong. Please check your internet connection.";
                formResult.className = "form-result error";
            })
            .then(function() {
                setTimeout(() => {
                    if (formResult.classList.contains('success')) {
                        formResult.style.display = "none";
                    }
                }, 5000);
            });
        });
    }

    // Category Slider Logic
    const categoryScroll = document.querySelector('.category-scroll');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (prevBtn && nextBtn && categoryScroll) {
        const scrollAmount = 475; // Card width + gap
        
        nextBtn.addEventListener('click', () => {
            categoryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            categoryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }



    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Privacy Modal Logic
    const modal = document.getElementById('privacy-modal');
    const openBtn = document.getElementById('open-privacy');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && openBtn) {
        openBtn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }
        
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});
