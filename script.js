// Airbnb Clone - Main JavaScript

// ============================================
// DATA
// ============================================

// Category data
const categories = [
    { id: 'pools', name: 'Amazing pools', image: 'static/type1.jpeg' },
    { id: 'play', name: 'Play', image: 'static/type2.jpeg' },
    { id: 'historical', name: 'Historical Homes', image: 'static/type3.jpeg' },
    { id: 'countryside', name: 'Countryside', image: 'static/type4.jpeg' },
    { id: 'surfing', name: 'Surfing', image: 'static/type5.jpeg' },
    { id: 'farms', name: 'Farms', image: 'static/type6.jpeg' },
    { id: 'views', name: 'Amazing views', image: 'static/type7.jpeg' },
    { id: 'rooms', name: 'Rooms', image: 'static/type8.jpeg' },
    { id: 'lakefront', name: 'Lakefront', image: 'static/type9.jpeg' },
    { id: 'beachfront', name: 'Beachfront', image: 'static/type10.jpeg' },
    { id: 'omg', name: 'OMG!', image: 'static/type11.jpeg' },
    { id: 'golfing', name: 'Golfing', image: 'static/type12.jpeg' },
];

// Property data
const properties = [
    { id: 1, location: 'Lonavla, India', distance: '63 kilometers away', dates: '22-27 Jul', price: 11000, rating: 5.0, image: 'static/img1.jpg', category: 'views' },
    { id: 2, location: 'Goa, India', distance: '450 kilometers away', dates: '15-20 Aug', price: 8500, rating: 4.8, image: 'static/img2.jpg', category: 'beachfront' },
    { id: 3, location: 'Mumbai, India', distance: '25 kilometers away', dates: '1-5 Sep', price: 15000, rating: 4.9, image: 'static/img3.jpg', category: 'rooms' },
    { id: 4, location: 'Pune, India', distance: '120 kilometers away', dates: '10-15 Oct', price: 7200, rating: 4.7, image: 'static/img4.jpg', category: 'countryside' },
    { id: 5, location: 'Alibaug, India', distance: '95 kilometers away', dates: '5-10 Nov', price: 9500, rating: 4.6, image: 'static/img1.jpg', category: 'beachfront' },
    { id: 6, location: 'Mahabaleshwar, India', distance: '260 kilometers away', dates: '20-25 Dec', price: 6800, rating: 4.5, image: 'static/img2.jpg', category: 'views' },
    { id: 7, location: 'Kerala, India', distance: '1200 kilometers away', dates: '1-7 Jan', price: 12500, rating: 4.9, image: 'static/img3.jpg', category: 'lakefront' },
    { id: 8, location: 'Jaipur, India', distance: '1100 kilometers away', dates: '12-18 Feb', price: 8900, rating: 4.7, image: 'static/img4.jpg', category: 'historical' },
    { id: 9, location: 'Udaipur, India', distance: '750 kilometers away', dates: '3-8 Mar', price: 11200, rating: 4.8, image: 'static/img1.jpg', category: 'pools' },
    { id: 10, location: 'Manali, India', distance: '550 kilometers away', dates: '15-20 Apr', price: 7800, rating: 4.6, image: 'static/img2.jpg', category: 'views' },
    { id: 11, location: 'Rishikesh, India', distance: '240 kilometers away', dates: '22-27 May', price: 5500, rating: 4.4, image: 'static/img3.jpg', category: 'farms' },
    { id: 12, location: 'Shimla, India', distance: '340 kilometers away', dates: '8-13 Jun', price: 9200, rating: 4.7, image: 'static/img4.jpg', category: 'views' },
];

// ============================================
// STATE
// ============================================

let activeCategory = 'all';
let showTotalPrice = false;
let displayedProperties = 8;

// ============================================
// DOM ELEMENTS
// ============================================

const categoryContainer = document.getElementById('categoryContainer');
const propertyGrid = document.getElementById('propertyGrid');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const priceToggle = document.getElementById('priceToggle');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// ============================================
// FUNCTIONS
// ============================================

// Render categories
function renderCategories() {
    categoryContainer.innerHTML = categories.map(cat => `
        <div class="category-item flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${activeCategory === cat.id ? 'active text-airbnb-dark' : 'text-gray-500 hover:text-gray-800 hover:opacity-80'}" 
             data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
            <img src="${cat.image}" alt="${cat.name}" class="w-6 h-6 object-cover opacity-80 grayscale hover:grayscale-0 transition">
            <span class="text-xs font-medium whitespace-nowrap">${cat.name}</span>
        </div>
    `).join('');
}

// Render properties
function renderProperties() {
    let filtered = activeCategory === 'all' 
        ? properties 
        : properties.filter(p => p.category === activeCategory);
    
    const toShow = filtered.slice(0, displayedProperties);
    
    propertyGrid.innerHTML = toShow.map(prop => `
        <div class="property-card group cursor-pointer" data-category="${prop.category}">
            <!-- Image Container -->
            <div class="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3">
                <img src="${prop.image}" alt="${prop.location}" class="property-image w-full h-full object-cover transition-transform duration-300">
                
                <!-- Heart Icon -->
                <button class="heart-icon absolute top-3 right-3 text-white hover:scale-110 transition" onclick="event.stopPropagation(); toggleHeart(this)">
                    <i class="fa-regular fa-heart text-2xl drop-shadow-lg"></i>
                </button>
                
                <!-- Guest Favorite Badge -->
                ${prop.rating >= 4.8 ? `
                    <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                        <span class="text-xs font-semibold">Guest favorite</span>
                    </div>
                ` : ''}
                
                <!-- Navigation Dots -->
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div class="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                    <div class="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                </div>
            </div>
            
            <!-- Property Info -->
            <div class="space-y-0.5">
                <div class="flex justify-between items-start">
                    <h3 class="font-semibold text-airbnb-dark">${prop.location}</h3>
                    <div class="flex items-center gap-1 text-sm">
                        <i class="fa-solid fa-star text-xs"></i>
                        <span>${prop.rating}</span>
                    </div>
                </div>
                <p class="text-gray-500 text-sm">${prop.distance}</p>
                <p class="text-gray-500 text-sm">${prop.dates}</p>
                <p class="text-airbnb-dark text-sm mt-1">
                    <span class="font-semibold">₹${showTotalPrice ? prop.price * 5 : prop.price}</span>
                    ${showTotalPrice ? 'total before taxes' : 'night'}
                </p>
            </div>
        </div>
    `).join('');
    
    // Hide load more if all properties shown
    loadMoreBtn.style.display = displayedProperties >= filtered.length ? 'none' : 'block';
}

// Filter by category
function filterByCategory(categoryId) {
    activeCategory = activeCategory === categoryId ? 'all' : categoryId;
    displayedProperties = 8; // Reset displayed count
    renderCategories();
    renderProperties();
    
    // Scroll to top of grid
    propertyGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle heart/favorite
function toggleHeart(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.classList.add('text-airbnb-red');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.remove('text-airbnb-red');
        icon.classList.add('fa-regular');
    }
}

// Toggle user dropdown
function toggleUserDropdown() {
    userDropdown.classList.toggle('hidden');
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
    mobileMenuOverlay.classList.toggle('hidden');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

// Toggle price display
function togglePriceDisplay() {
    showTotalPrice = !showTotalPrice;
    const icon = priceToggle.querySelector('span');
    icon.textContent = showTotalPrice ? 'toggle_on' : 'toggle_off';
    priceToggle.classList.toggle('text-airbnb-red', showTotalPrice);
    priceToggle.classList.toggle('text-gray-400', !showTotalPrice);
    renderProperties();
}

// Load more properties
function loadMore() {
    displayedProperties += 4;
    renderProperties();
}

// ============================================
// EVENT LISTENERS
// ============================================

// User menu toggle
userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleUserDropdown();
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
        userDropdown.classList.add('hidden');
    }
});

// Mobile menu
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMobileMenu.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

// Price toggle
priceToggle.addEventListener('click', togglePriceDisplay);

// Load more
loadMoreBtn.addEventListener('click', loadMore);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        userDropdown.classList.add('hidden');
        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
});

// Horizontal scroll with mouse wheel for categories
categoryContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        categoryContainer.scrollLeft += e.deltaY;
    }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProperties();
    
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Make filterByCategory globally accessible
window.filterByCategory = filterByCategory;
window.toggleHeart = toggleHeart;
