// Application State
const state = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    currentUser: null,
    virtualTryOnItems: [],
    currentModel: null
};

// DOM Elements
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    cartBtn: document.getElementById('cartBtn'),
    wishlistBtn: document.getElementById('wishlistBtn'),
    cartModal: document.getElementById('cartModal'),
    closeCartModal: document.getElementById('closeCartModal'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.querySelector('.cart-count'),
    wishlistCount: document.querySelector('.wishlist-count'),
    searchBtn: document.getElementById('searchBtn'),
    searchBar: document.getElementById('searchBar'),
    searchClose: document.getElementById('searchClose'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navMenu: document.querySelector('.nav-menu'),
    productsGrid: document.getElementById('productsGrid'),
    tryNowBtn: document.getElementById('tryNowBtn'),
    tryonModal: document.getElementById('tryonModal'),
    closeTryonModal: document.getElementById('closeTryonModal'),
    tryonViewport: document.getElementById('tryonViewport'),
    tryonProducts: document.getElementById('tryonProducts'),
    uploadPhotoBtn: document.getElementById('uploadPhotoBtn'),
    useCameraBtn: document.getElementById('useCameraBtn'),
    resetBtn: document.getElementById('resetBtn'),
    photoUpload: document.getElementById('photoUpload'),
    calculateSizeBtn: document.getElementById('calculateSizeBtn'),
    sizeResult: document.getElementById('sizeResult'),
    continueShoppingBtn: document.getElementById('continueShoppingBtn'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    shippingCost: document.getElementById('shippingCost'),
    cartTotal: document.getElementById('cartTotal')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading
    setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize data
    initializeProducts();
    initializeVirtualTryOnItems();
    
    // Update UI
    updateCartCount();
    updateWishlistCount();
    renderProducts();
    renderCart();
    setupEventListeners();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to StyleVerse! Start your virtual try-on journey.');
    }, 2000);
});

// Initialize Products
function initializeProducts() {
    state.products = [
        {
            id: 1,
            name: "Elegant Summer Dress",
            category: "women",
            price: 89.99,
            oldPrice: 129.99,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "BEST SELLER",
            description: "Lightweight floral dress perfect for summer occasions"
        },
        {
            id: 2,
            name: "Classic Denim Jacket",
            category: "men",
            price: 69.99,
            oldPrice: 89.99,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "NEW",
            description: "Versatile denim jacket for casual outings"
        },
        {
            id: 3,
            name: "Kids Colorful Hoodie",
            category: "kids",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "SALE",
            description: "Comfortable and colorful hoodie for active kids"
        },
        {
            id: 4,
            name: "Designer Handbag",
            category: "accessories",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Luxury handbag with premium finish"
        },
        {
            id: 5,
            name: "Formal Business Suit",
            category: "men",
            price: 249.99,
            oldPrice: 299.99,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "LIMITED",
            description: "Premium wool suit for formal occasions"
        },
        {
            id: 6,
            name: "Casual Sneakers",
            category: "accessories",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            description: "Comfortable sneakers for everyday wear"
        },
        {
            id: 7,
            name: "Kids Rain Jacket",
            category: "kids",
            price: 44.99,
            oldPrice: 59.99,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "WATERPROOF",
            description: "Waterproof jacket for rainy days"
        },
        {
            id: 8,
            name: "Evening Gown",
            category: "women",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            badge: "PREMIUM",
            description: "Elegant gown for special occasions"
        }
    ];
}

// Initialize Virtual Try-On Items
function initializeVirtualTryOnItems() {
    state.virtualTryOnItems = [
        { id: 1, name: "Red Dress", type: "dress", category: "women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 2, name: "Denim Jacket", type: "jacket", category: "men", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 3, name: "White Shirt", type: "shirt", category: "men", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 4, name: "Black Pants", type: "pants", category: "women", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 5, name: "Summer Hat", type: "hat", category: "accessories", image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { id: 6, name: "Leather Shoes", type: "shoes", category: "men", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
    ];
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Modal
    elements.cartBtn.addEventListener('click', () => {
        elements.cartModal.style.display = 'flex';
        setTimeout(() => elements.cartModal.classList.add('active'), 10);
    });
    
    elements.closeCartModal.addEventListener('click', () => {
        elements.cartModal.classList.remove('active');
        setTimeout(() => elements.cartModal.style.display = 'none', 300);
    });
    
    elements.continueShoppingBtn.addEventListener('click', () => {
        elements.cartModal.classList.remove('active');
        setTimeout(() => elements.cartModal.style.display = 'none', 300);
    });
    
    // Search
    elements.searchBtn.addEventListener('click', () => {
        elements.searchBar.style.display = 'block';
        setTimeout(() => elements.searchBar.querySelector('.search-input').focus(), 10);
    });
    
    elements.searchClose.addEventListener('click', () => {
        elements.searchBar.style.display = 'none';
    });
    
    // Mobile Menu
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.navMenu.classList.toggle('active');
    });
    
    // Virtual Try-On
    elements.tryNowBtn.addEventListener('click', openVirtualTryOn);
    elements.closeTryonModal.addEventListener('click', closeVirtualTryOn);
    
    // Try-On Controls
    elements.uploadPhotoBtn.addEventListener('click', () => elements.photoUpload.click());
    elements.useCameraBtn.addEventListener('click', startCamera);
    elements.resetBtn.addEventListener('click', resetTryOn);
    
    elements.photoUpload.addEventListener('change', handlePhotoUpload);
    
    // Size Recommender
    elements.calculateSizeBtn.addEventListener('click', calculateSize);
    
    // Product Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
    
    // Category Cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.filter-btn[data-filter="${category}"]`).classList.add('active');
            renderProducts(category);
            
            // Scroll to products
            document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.cartModal) {
            elements.cartModal.classList.remove('active');
            setTimeout(() => elements.cartModal.style.display = 'none', 300);
        }
        if (e.target === elements.tryonModal) {
            closeVirtualTryOn();
        }
    });
}

// Render Products
function renderProducts(filter = 'all') {
    elements.productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? state.products 
        : state.products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x400?text=Fashion+Item'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <button class="product-wishlist ${state.wishlist.includes(product.id) ? 'active' : ''}" 
                        data-id="${product.id}">
                    <i class="${state.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="try-on-btn" data-id="${product.id}">
                        <i class="fas fa-magic"></i> Try On
                    </button>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        elements.productsGrid.appendChild(productCard);
    });
    
    // Add event listeners for new buttons
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id);
            toggleWishlist(productId);
        });
    });
    
    document.querySelectorAll('.try-on-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id);
            openVirtualTryOnWithProduct(productId);
        });
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id);
            addToCart(productId);
        });
    });
}

// Render Cart
function renderCart() {
    elements.cartItems.innerHTML = '';
    
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your bag is empty</p>
                <button class="btn-secondary" id="continueShoppingBtn">Continue Shopping</button>
            </div>
        `;
        
        elements.continueShoppingBtn.addEventListener('click', () => {
            elements.cartModal.classList.remove('active');
            setTimeout(() => elements.cartModal.style.display = 'none', 300);
        });
        
        updateCartSummary(0);
        return;
    }
    
    let subtotal = 0;
    
    state.cart.forEach(item => {
        const product = state.products.find(p => p.id === item.productId);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.name}</h4>
                <p class="cart-item-category">${product.category.toUpperCase()}</p>
                <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${product.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    <button class="remove-item" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        elements.cartItems.appendChild(cartItem);
    });
    
    // Add event listeners for cart actions
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            updateCartQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            updateCartQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            removeFromCart(productId);
        });
    });
    
    updateCartSummary(subtotal);
}

// Cart Functions
function addToCart(productId) {
    const existingItem = state.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    
    updateCartCount();
    renderCart();
    saveCart();
    showNotification('Item added to cart!');
}

function updateCartQuantity(productId, change) {
    const item = state.cart.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        renderCart();
        saveCart();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    updateCartCount();
    renderCart();
    saveCart();
    showNotification('Item removed from cart');
}

function updateCartCount() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
}

function updateCartSummary(subtotal) {
    elements.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    const shipping = subtotal > 100 ? 0 : 9.99;
    elements.shippingCost.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    elements.cartTotal.textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

// Wishlist Functions
function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    
    if (index === -1) {
        state.wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        state.wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    }
    
    updateWishlistCount();
    saveWishlist();
    renderProducts(); // Re-render to update heart icons
}

function updateWishlistCount() {
    elements.wishlistCount.textContent = state.wishlist.length;
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
}

// Virtual Try-On Functions
function openVirtualTryOn() {
    elements.tryonModal.style.display = 'flex';
    setTimeout(() => elements.tryonModal.classList.add('active'), 10);
    renderTryOnProducts();
}

function openVirtualTryOnWithProduct(productId) {
    openVirtualTryOn();
    // In a real implementation, this would pre-select the product
    setTimeout(() => {
        showNotification('Drag and drop the clothing item onto the model');
    }, 500);
}

function closeVirtualTryOn() {
    elements.tryonModal.classList.remove('active');
    setTimeout(() => elements.tryonModal.style.display = 'none', 300);
    
    // Stop camera if active
    if (state.currentModel && state.currentModel.stream) {
        state.currentModel.stream.getTracks().forEach(track => track.stop());
    }
}

function renderTryOnProducts() {
    elements.tryonProducts.innerHTML = '';
    
    state.virtualTryOnItems.forEach(item => {
        const productItem = document.createElement('div');
        productItem.className = 'tryon-product-item';
        productItem.draggable = true;
        productItem.dataset.id = item.id;
        productItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
        `;
        
        productItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
        });
        
        elements.tryonProducts.appendChild(productItem);
    });
    
    // Allow drop on viewport
    elements.tryonViewport.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.tryonViewport.style.border = '2px dashed var(--primary-color)';
    });
    
    elements.tryonViewport.addEventListener('dragleave', () => {
        elements.tryonViewport.style.border = 'none';
    });
    
    elements.tryonViewport.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.tryonViewport.style.border = 'none';
        
        const itemId = e.dataTransfer.getData('text/plain');
        const item = state.virtualTryOnItems.find(i => i.id == itemId);
        
        if (item) {
            simulateTryOn(item);
        }
    });
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        elements.tryonViewport.innerHTML = `
            <img src="${e.target.result}" alt="Uploaded model" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        elements.tryonViewport.style.background = '#132f4c';
        showNotification('Photo uploaded successfully! Now drag clothing items onto the model.');
    };
    reader.readAsDataURL(file);
}

function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showNotification('Camera access not available in your browser', 'error');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            state.currentModel = { stream };
            elements.tryonViewport.innerHTML = `
                <video autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
            `;
            const video = elements.tryonViewport.querySelector('video');
            video.srcObject = stream;
            elements.tryonViewport.style.background = '#132f4c';
            showNotification('Camera activated! Position yourself and try on items.');
        })
        .catch(err => {
            console.error('Camera error:', err);
            showNotification('Unable to access camera. Please check permissions.', 'error');
        });
}

function resetTryOn() {
    elements.tryonViewport.innerHTML = `
        <div class="viewport-placeholder">
            <i class="fas fa-user-circle"></i>
            <p>Load a photo or enable camera to start</p>
        </div>
    `;
    elements.tryonViewport.style.background = '#132f4c';
    
    if (state.currentModel && state.currentModel.stream) {
        state.currentModel.stream.getTracks().forEach(track => track.stop());
        state.currentModel = null;
    }
    
    showNotification('Try-on reset');
}

function simulateTryOn(item) {
    // In a real implementation, this would use AI/AR to overlay the clothing
    // For this demo, we'll simulate with a simple overlay
    
    if (!elements.tryonViewport.querySelector('img') && !elements.tryonViewport.querySelector('video')) {
        showNotification('Please upload a photo or enable camera first', 'error');
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'tryon-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.width = '60%';
    overlay.style.height = '60%';
    overlay.style.background = `url('${item.image}') center/contain no-repeat`;
    overlay.style.border = '2px dashed var(--primary-color)';
    overlay.style.cursor = 'move';
    
    // Make draggable
    makeDraggable(overlay);
    
    elements.tryonViewport.appendChild(overlay);
    showNotification(`${item.name} added to model! Drag to reposition.`);
}

function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    element.addEventListener('mousedown', dragStart);
    element.addEventListener('touchstart', dragStart);
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === element) {
            isDragging = true;
        }
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, element);
        }
    }
    
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

// Size Recommender
function calculateSize() {
    const height = parseFloat(document.getElementById('heightInput').value) || 175;
    const weight = parseFloat(document.getElementById('weightInput').value) || 70;
    const fit = document.getElementById('fitPreference').value;
    
    if (!height || !weight) {
        showNotification('Please enter your measurements', 'error');
        return;
    }
    
    // Simple size calculation logic (simplified for demo)
    let size;
    const bmi = weight / ((height/100) ** 2);
    
    if (height < 160) {
        size = fit === 'slim' ? 'XS' : fit === 'regular' ? 'S' : 'M';
    } else if (height < 175) {
        if (bmi < 20) size = 'S';
        else if (bmi < 25) size = 'M';
        else size = 'L';
    } else if (height < 185) {
        if (bmi < 21) size = 'M';
        else if (bmi < 26) size = 'L';
        else size = 'XL';
    } else {
        if (bmi < 22) size = 'L';
        else if (bmi < 27) size = 'XL';
        else size = 'XXL';
    }
    
    // Adjust based on fit preference
    if (fit === 'slim' && size !== 'XS') {
        const sizeMap = { 'S': 'XS', 'M': 'S', 'L': 'M', 'XL': 'L', 'XXL': 'XL' };
        size = sizeMap[size] || size;
    } else if (fit === 'loose' && size !== 'XXL') {
        const sizeMap = { 'XS': 'S', 'S': 'M', 'M': 'L', 'L': 'XL', 'XL': 'XXL' };
        size = sizeMap[size] || size;
    }
    
    // Display result
    elements.sizeResult.innerHTML = `
        <div class="size-result-content">
            <h3>Your Recommended Size</h3>
            <div class="size-display">
                <span class="size-value">${size}</span>
            </div>
            <p>Based on your measurements and preference for a <strong>${fit}</strong> fit.</p>
            <div class="size-details">
                <p><i class="fas fa-ruler-vertical"></i> Height: ${height} cm</p>
                <p><i class="fas fa-weight"></i> Weight: ${weight} kg</p>
                <p><i class="fas fa-calculator"></i> BMI: ${bmi.toFixed(1)}</p>
            </div>
            <button class="btn-secondary" onclick="saveSizeProfile()">
                <i class="fas fa-save"></i> Save Size Profile
            </button>
        </div>
    `;
    
    showNotification('Size calculated successfully!');
}

function saveSizeProfile() {
    showNotification('Size profile saved! We\'ll use this for future recommendations.');
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                color: var(--text-primary);
                padding: 15px 20px;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 10000;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--primary-color);
                max-width: 350px;
            }
            .notification.error {
                border-left-color: var(--danger-color);
            }
            .notification i.fa-check-circle {
                color: var(--primary-color);
                font-size: 1.2rem;
            }
            .notification i.fa-exclamation-circle {
                color: var(--danger-color);
                font-size: 1.2rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--text-tertiary);
                cursor: pointer;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Export functions for use in HTML
window.saveSizeProfile = saveSizeProfile;
