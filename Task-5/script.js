document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Product data for quick view modal
    const products = [
        {
            id: 1,
            title: 'Premium Wireless Headphones',
            image: 'head2.avif',
            rating: 4.5,
            reviews: 124,
            price: 199.99,
            originalPrice: 249.99,
            description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.'
        },
        {
            id: 2,
            title: 'Smart Fitness Watch',
            image: 'images/products/product2.jpg',
            rating: 4,
            reviews: 89,
            price: 159.99,
            originalPrice: 199.99,
            description: 'Track your fitness goals with our advanced smart watch. Monitor heart rate, sleep patterns, and activity levels. Water-resistant design with 7-day battery life and smartphone notifications.'
        },
        {
            id: 3,
            title: 'Portable Bluetooth Speaker',
            image: 'images/products/product3.jpg',
            rating: 5,
            reviews: 210,
            price: 129.99,
            description: 'Take your music anywhere with this powerful portable speaker. 20-hour playtime, IPX7 waterproof rating, and crystal-clear 360° sound. Connects via Bluetooth to all your devices.'
        },
        {
            id: 4,
            title: 'True Wireless Earbuds',
            image: 'images/products/product4.jpg',
            rating: 4.5,
            reviews: 76,
            price: 89.99,
            description: 'Enjoy true wireless freedom with these compact earbuds. Features touch controls, 8-hour battery life (24h with case), and premium sound quality with deep bass.'
        },
        {
            id: 5,
            title: 'Premium Laptop Backpack',
            image: 'images/products/product5.jpg',
            rating: 4,
            reviews: 42,
            price: 79.99,
            description: 'Protect your laptop in style with this premium backpack. Fits up to 15.6" laptops, multiple compartments for organization, water-resistant material, and comfortable padded straps.'
        },
        {
            id: 6,
            title: 'Latest Smartphone',
            image: 'images/products/product6.jpg',
            rating: 5,
            reviews: 187,
            price: 899.99,
            description: 'Our flagship smartphone features a stunning 6.7" OLED display, professional-grade camera system, all-day battery life, and the fastest processor available.'
        }
    ];
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductRating = document.getElementById('modalProductRating');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            const product = products.find(p => p.title === productTitle);
            
            if (product) {
                modalProductImage.src = product.image;
                modalProductTitle.textContent = product.title;
                
                // Create rating stars
                let ratingHTML = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(product.rating)) {
                        ratingHTML += '<i class="fas fa-star"></i>';
                    } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                        ratingHTML += '<i class="fas fa-star-half-alt"></i>';
                    } else {
                        ratingHTML += '<i class="far fa-star"></i>';
                    }
                }
                ratingHTML += `<span>(${product.reviews})</span>`;
                modalProductRating.innerHTML = ratingHTML;
                
                // Create price display
                let priceHTML = '';
                if (product.originalPrice) {
                    priceHTML = `<span class="current-price">$${product.price.toFixed(2)}</span>
                                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
                } else {
                    priceHTML = `<span class="current-price">$${product.price.toFixed(2)}</span>`;
                }
                modalProductPrice.innerHTML = priceHTML;
                
                modalProductDescription.textContent = product.description;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Quantity Selector
    const quantityMinus = document.querySelector('.quantity-minus');
    const quantityPlus = document.querySelector('.quantity-plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (quantityMinus && quantityPlus && quantityInput) {
        quantityMinus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        quantityPlus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation effect
            this.textContent = 'Added!';
            this.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}!`);
            emailInput.value = '';
        });
    }
});

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Start autoplay
    startSlideInterval();
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (slideIndex + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        resetSlideInterval();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideInterval();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetSlideInterval();
        }
    });
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);
