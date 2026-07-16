/* ==========================================================================
   Boutique Law Firm - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Navigation & Header Effects
    // ----------------------------------------------------------------------
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll shrinkage and style adjustment
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    // Mobile Navigation Menu Toggle
    mobileToggle.addEventListener('click', () => {
        const expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
        mobileToggle.setAttribute('aria-expanded', !expanded);
        mainNav.classList.toggle('active');
        document.body.classList.toggle('nav-open'); // prevents body scroll when menu open
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // Active Section Link Tracking
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for fixed header
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.main-nav a[href*=${sectionId}]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active-nav-item');
                } else {
                    correspondingLink.classList.remove('active-nav-item');
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Practice Areas Modal Details Injection
    // ----------------------------------------------------------------------
    const practiceCards = document.querySelectorAll('.practice-card');
    const modal = document.getElementById('practiceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCtaBtn = document.querySelector('.modal-cta-btn');

    // Data Store for Practice Area Details
    const practiceDetails = {
        corporate: {
            title: "Corporate Advisory",
            body: `
                <h4>Structuring & Governance</h4>
                <p>We provide comprehensive corporate structuring and governance frameworks tailored for executive boards, founders, and stakeholders. Our objective is to define clear operational boundaries and mitigate regulatory conflicts early.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Entity selection, design, and regulatory registration structures</li>
                    <li>Board of directors frameworks, advisory guidelines, and operational bylaws</li>
                    <li>Internal group reorganizations, equity allocations, and share transfer mechanisms</li>
                    <li>Fictional joint-venture designs and partnership configurations</li>
                </ul>
                <p>Our corporate advisory structures are built with clear, objective governance paths in mind, reducing the friction associated with long-term capital restructuring or operational evolution.</p>
            `
        },
        contracts: {
            title: "Commercial Contracts",
            body: `
                <h4>Agreement Design & Risk Allocation</h4>
                <p>We structure, draft, and negotiate commercial agreements that protect proprietary interests while facilitating rapid deal cycles. We emphasize translating complex legal protections into plain, actionable terms.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Standard service provider, vendor, and platform supply templates</li>
                    <li>Intellectual property licensing agreements and software licensing frameworks</li>
                    <li>Data processing policies, non-disclosure covenants, and privacy guidelines</li>
                    <li>Multi-year distribution, logistics, and supply chain contract structures</li>
                </ul>
                <p>We ensure that our agreements avoid redundant jargon, giving your sales, procurement, and management teams a highly legible playbook that balances protection and performance.</p>
            `
        },
        employment: {
            title: "Employment Guidance",
            body: `
                <h4>Workplace Standards & Regulatory Compliance</h4>
                <p>We guide operational teams through workplace regulations, helping design equitable agreement packages and robust internal policies that reduce workplace dispute risks.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Executive employment agreements and consulting arrangements</li>
                    <li>Employee handbook designs, workplace behavior policies, and dispute guidelines</li>
                    <li>Regulatory wage-and-hour compliance audit templates</li>
                    <li>Restructuring advisory, separation frameworks, and exit covenant design</li>
                </ul>
                <p>Our guidance ensures that your workplace policies respect active compliance mandates while remaining highly operational and adaptive to growth phases.</p>
            `
        },
        disputes: {
            title: "Dispute Resolution",
            body: `
                <h4>Strategic Arbitration & Pre-Litigation Counsel</h4>
                <p>We focus on resolving high-value disputes before they escalate to public court trials. Our approach leverages detailed forensic review, mediation strategies, and private arbitration paths.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Early-stage risk analysis and dispute resolution feasibility studies</li>
                    <li>Representation in structured commercial mediation and private arbitration</li>
                    <li>Settlement negotiation, structured exit agreements, and release releases</li>
                    <li>Breach of contract claims and real estate covenant enforcement</li>
                </ul>
                <p>We understand that litigation is costly and resource-draining. We prioritize structured settlements and private dispute routes that protect business integrity and resources.</p>
            `
        },
        property: {
            title: "Property Matters",
            body: `
                <h4>Commercial Real Estate Transactions</h4>
                <p>We advise corporate tenants and asset owners on structured real estate leases, asset purchases, transfers, and general property usage guidelines.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Commercial lease drafting, modification, and renegotiation frameworks</li>
                    <li>Real estate buy-sell advisory, asset due diligence, and transfer processes</li>
                    <li>Easement creation, property usage covenants, and shared space agreements</li>
                    <li>Title clearance coordination and real estate asset structural advisory</li>
                </ul>
                <p>By conducting detailed structural reviews of commercial real estate agreements, we ensure that operational space requirements do not lock down long-term capital unnecessarily.</p>
            `
        },
        regulatory: {
            title: "Regulatory Support",
            body: `
                <h4>Compliance Management & Audit Readiness</h4>
                <p>We assist operational leads in building audit readiness frameworks to adapt to evolving compliance regimes and minimize regulatory penalties.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Internal policy audits, system evaluations, and gaps analysis</li>
                    <li>Regulatory compliance plan design for financial, environmental, or data structures</li>
                    <li>Board briefings regarding regulatory changes and liability containment</li>
                    <li>Coordination with external audit experts and administrative filings</li>
                </ul>
                <p>We help businesses build continuous internal audit habits, ensuring compliance reviews are structured as routine operational checklists rather than panic situations.</p>
            `
        },
        estate: {
            title: "Estate Planning",
            body: `
                <h4>Asset Protection & Generational Structures</h4>
                <p>We counsel individuals, founders, and families on configuring wealth preservation vehicles that protect assets, minimize estate friction, and establish clean transfer pathways.</p>
                <h4>Core services include:</h4>
                <ul>
                    <li>Comprehensive will drafting, executor guidelines, and healthcare directives</li>
                    <li>Private trust configurations, including asset preservation and legacy vehicles</li>
                    <li>Succession plans for family-owned or closely held businesses</li>
                    <li>Generational asset transfer designs and asset protection structures</li>
                </ul>
                <p>Our approach details simple, legal, and private structures that give wealth builders absolute confidence that their assets will be transferred as structured without public court disputes.</p>
            `
        }
    };

    // Open Modal with Correct Content
    practiceCards.forEach(card => {
        const learnBtn = card.querySelector('.learn-more-btn');
        const handleOpen = () => {
            const key = card.getAttribute('data-practice');
            const data = practiceDetails[key];
            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.body;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            }
        };
        
        // Listen both on button click and card container click (excluding text selection if clicked directly on layout)
        learnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleOpen();
        });
        card.addEventListener('click', handleOpen);
    });

    // Close Modal Functions
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock background scroll
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    modalCtaBtn.addEventListener('click', closeModal);

    // Escape Key to Close Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 3. Representative Matters Filter Logic
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const matterCards = document.querySelectorAll('.matter-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filters
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            
            // Set active class to current filter
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            matterCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Fade out transition trigger
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });

    // ----------------------------------------------------------------------
    // 4. Testimonials Slider Logic
    // ----------------------------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideTimer;

    function showSlide(index) {
        // Handle boundary wraps
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        // Reset slide classes
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Reset dot classes
        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentSlide) {
                dot.classList.add('active');
            }
        });
        
        // Reset timer when manually clicked
        resetSlideTimer();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
    });

    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, 7000); // Change testimonial every 7 seconds
    }

    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }

    // Initialize Timer
    startSlideTimer();

    // ----------------------------------------------------------------------
    // 5. FAQ Accordion Logic
    // ----------------------------------------------------------------------
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other accordion panels
            faqTriggers.forEach(t => {
                if (t !== trigger && t.getAttribute('aria-expanded') === 'true') {
                    t.setAttribute('aria-expanded', 'false');
                    t.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current panel
            if (expanded) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. Contact Form Validation & Simulated Submission
    // ----------------------------------------------------------------------
    const form = document.getElementById('consultationForm');
    const successMsg = document.getElementById('successMsg');
    const clientName = document.getElementById('clientName');
    const clientEmail = document.getElementById('clientEmail');
    const matterType = document.getElementById('matterType');
    const clientMessage = document.getElementById('clientMessage');
    const submitBtn = document.getElementById('submitBtn');
    const resetFormBtn = document.getElementById('resetFormBtn');

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Helper to validate single field
    function validateField(element, errorId, condition) {
        const formGroup = element.closest('.form-group');
        if (condition) {
            formGroup.classList.remove('invalid');
            return true;
        } else {
            formGroup.classList.add('invalid');
            return false;
        }
    }

    // Input listeners to clear errors on typing
    clientName.addEventListener('input', () => {
        validateField(clientName, 'nameError', clientName.value.trim() !== '');
    });

    clientEmail.addEventListener('input', () => {
        validateField(clientEmail, 'emailError', emailPattern.test(clientEmail.value.trim()));
    });

    matterType.addEventListener('change', () => {
        validateField(matterType, 'matterError', matterType.value !== '');
    });

    clientMessage.addEventListener('input', () => {
        validateField(clientMessage, 'messageError', clientMessage.value.trim() !== '');
    });

    // Form Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Run all validations
        const isNameValid = validateField(clientName, 'nameError', clientName.value.trim() !== '');
        const isEmailValid = validateField(clientEmail, 'emailError', emailPattern.test(clientEmail.value.trim()));
        const isMatterValid = validateField(matterType, 'matterError', matterType.value !== '');
        const isMessageValid = validateField(clientMessage, 'messageError', clientMessage.value.trim() !== '');

        if (isNameValid && isEmailValid && isMatterValid && isMessageValid) {
            // Show Loading State
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text-content').classList.add('hidden');
            submitBtn.querySelector('.spinner').classList.remove('hidden');

            // Simulate Network Request Delay
            setTimeout(() => {
                // Reset loading button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text-content').classList.remove('hidden');
                submitBtn.querySelector('.spinner').classList.add('hidden');

                // Hide Form & Show Success Screen
                form.classList.add('hidden');
                successMsg.classList.remove('hidden');
                
                // Clear Form Values
                form.reset();
            }, 1800);
        }
    });

    // Reset Form button action (from Success Screen)
    resetFormBtn.addEventListener('click', () => {
        successMsg.classList.add('hidden');
        form.classList.remove('hidden');
    });
});
