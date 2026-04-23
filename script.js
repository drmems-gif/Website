// Product Data
const products = [
    {
        id: 1,
        name: 'Pixie Curls',
        price: 20000,
        description: 'Available in fringe & frontal',
        colors: ['Black', 'Wine', 'Gold'],
        type: 'wig',
        image: '👑'
    },
    {
        id: 2,
        name: 'Full Frontal Bone Straight',
        price: 40000,
        description: '40 inches of pure elegance',
        length: '40 inches',
        colors: ['Black'],
        type: 'wig',
        image: '✨'
    },
    {
        id: 3,
        name: 'Bounce Wig',
        price: 45000,
        description: 'Get that bouncy, voluminous look',
        colors: ['Black', 'Wine', 'Gold'],
        type: 'wig',
        image: '💃'
    },
    {
        id: 4,
        name: 'Long Styled Pixie Curls',
        price: 45000,
        description: 'Elegant long curls with installation',
        colors: ['Black'],
        installation: 10000,
        type: 'wig',
        image: '💄'
    },
    {
        id: 5,
        name: 'Glueless Full Frontal Student Bob',
        price: 20000,
        description: 'Student-friendly glueless frontal',
        colors: ['Black', 'Wine', 'Brown', 'Gold'],
        type: 'wig',
        image: '🎓'
    }
];

// Cart Data
let cart = [];
let currentProduct = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupEventListeners();
    loadCartFromLocalStorage();
    updateCartCount();
});

// Display Products
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="fas fa-crown"></i>
            <span style="font-size: 4rem; position: absolute;">${product.image}</span>
        </div>
        <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₦${product.price.toLocaleString()}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-colors">
                ${product.colors.map((color, idx) => {
                    let bgColor = '';
                    if (color.toLowerCase() === 'black') bgColor = '#000000';
                    else if (color.toLowerCase() === 'wine') bgColor = '#722f37';
                    else if (color.toLowerCase() === 'brown') bgColor = '#8b4513';
                    else if (color.toLowerCase() === 'gold') bgColor = '#ffd700';
                    return `<div class="color-dot" style="background-color: ${bgColor}; border-color: ${bgColor};" title="${color}"></div>`;
                }).join('')}
            </div>
            <button class="view-details-btn" onclick="openProductModal(${product.id})">View Details</button>
        </div>
    `;
    return card;
}

// Open Product Modal
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const colorSelection = document.getElementById('colorSelection');
    const lengthSelection = document.getElementById('lengthSelection');
    const installationOption = document.getElementById('installationOption');

    // Set product details
    modalProductName.textContent = currentProduct.name;
    modalPrice.textContent = `₦${currentProduct.price.toLocaleString()}`;
    modalDescription.innerHTML = `<strong>${currentProduct.description}</strong><br>`;

    // Create fake product image
    const fakeImage = document.createElement('div');
    fakeImage.style.width = '100%';
    fakeImage.style.height = '400px';
    fakeImage.style.background = 'linear-gradient(135deg, #ffe4e1, #fff8dc)';
    fakeImage.style.display = 'flex';
    fakeImage.style.alignItems = 'center';
    fakeImage.style.justifyContent = 'center';
    fakeImage.style.borderRadius = '10px';
    fakeImage.style.fontSize = '6rem';
    fakeImage.textContent = currentProduct.image;
    modalImage.parentElement.replaceChild(fakeImage, modalImage);

    // Color Selection
    colorSelection.innerHTML = `
        <label>Available Colors:</label>
        <div class="color-options">
            ${currentProduct.colors.map(color => `
                <button class="color-option" onclick="selectColor(this, '${color}')">${color}</button>
            `).join('')}
        </div>
    `;
    colorSelection.style.display = 'block';

    // Length Selection
    if (currentProduct.length) {
        lengthSelection.innerHTML = `
            <label>Length:</label>
            <div class="length-options">
                <button class="length-option" onclick="selectLength(this, '${currentProduct.length}')">${currentProduct.length}</button>
            </div>
        `;
        lengthSelection.style.display = 'block';
    } else {
        lengthSelection.style.display = 'none';
    }

    // Installation Option
    if (currentProduct.installation) {
        installationOption.innerHTML = `
            <label class="installation-checkbox">
                <input type="checkbox" id="installationCheckbox" onchange="updateInstallationFee()">
                <span>Add Installation (₦${currentProduct.installation.toLocaleString()})</span>
            </label>
        `;
        installationOption.style.display = 'block';
    } else {
        installationOption.style.display = 'none';
    }

    // Reset quantity
    document.getElementById('quantity').value = 1;

    // Show modal
    modal.style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.querySelector('.close-modal').onclick = closeModal;

// Select Color
function selectColor(element, color) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    currentProduct.selectedColor = color;
}

// Select Length
function selectLength(element, length) {
    document.querySelectorAll('.length-option').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    currentProduct.selectedLength = length;
}

// Update Installation Fee
function updateInstallationFee() {
    const checkbox = document.getElementById('installationCheckbox');
    currentProduct.includeInstallation = checkbox.checked;
}

// Add to Cart
function addToCart() {
    if (!currentProduct.selectedColor) {
        alert('Please select a color');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity').value);
    const cartItem = {
        id: currentProduct.id + Math.random(),
        productId: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        color: currentProduct.selectedColor,
        length: currentProduct.selectedLength || null,
        installation: currentProduct.includeInstallation ? currentProduct.installation : 0,
        quantity: quantity,
        image: currentProduct.image
    };

    cart.push(cartItem);
    saveCartToLocalStorage();
    updateCartCount();
    closeModal();
    
    // Show success message
    alert(`${quantity} ${currentProduct.name}(s) added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartTotals();
        return;
    }

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-image">
                <span style="font-size: 3rem;">${item.image}</span>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-specs">
                    Color: ${item.color}
                    ${item.length ? `<br>Length: ${item.length}` : ''}
                </div>
                <div class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</div>
                ${item.installation > 0 ? `<div class="cart-item-specs" style="color: #ff69b4;">Installation: ₦${item.installation.toLocaleString()}</div>` : ''}
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemDiv);
    });

    updateCartTotals();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
}

// Update Cart Totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const installationFee = cart.reduce((sum, item) => sum + item.installation, 0);
    const total = subtotal + installationFee;

    document.getElementById('subtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('installationFee').textContent = `₦${installationFee.toLocaleString()}`;
    document.getElementById('total').textContent = `₦${total.toLocaleString()}`;
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items first.');
        return;
    }

    // Hide cart section and show checkout
    document.querySelector('.cart-section').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';

    // Scroll to checkout
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });

    // Display checkout summary
    displayCheckoutSummary();
}

function displayCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const installationFee = cart.reduce((sum, item) => sum + item.installation, 0);
    const total = subtotal + installationFee;

    summary.innerHTML = `
        <div style="padding: 1.5rem; background: #f9f9f9; border-radius: 10px;">
            ${cart.map(item => `
                <div style="padding: 0.8rem; border-bottom: 1px solid #eee;">
                    <div style="font-weight: bold; margin-bottom: 0.3rem;">${item.name} x ${item.quantity}</div>
                    <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.3rem;">Color: ${item.color}</div>
                    <div style="color: #ff69b4; font-weight: bold;">₦${(item.price * item.quantity).toLocaleString()}</div>
                    ${item.installation > 0 ? `<div style="color: #666; font-size: 0.9rem; margin-top: 0.2rem;">Installation: ₦${item.installation.toLocaleString()}</div>` : ''}
                </div>
            `).join('')}
            <div style="padding: 1rem 0; border-top: 2px solid #eee; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Subtotal:</span>
                    <span>₦${subtotal.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Installation:</span>
                    <span>₦${installationFee.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: bold; color: #ff69b4;">
                    <span>Total:</span>
                    <span>₦${total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `;
}

// Submit Order
function submitOrder(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    // Validate form
    if (!fullName || !email || !phone || !address || !city || !state) {
        alert('Please fill in all required fields');
        return;
    }

    // Hide checkout and show payment confirmation
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('paymentConfirmation').style.display = 'block';

    // Generate order reference
    const orderRef = 'ORD-' + Date.now();
    document.getElementById('orderRef').textContent = orderRef;

    // Display payment information
    displayPaymentConfirmation(fullName, email, phone, address, city, state, orderRef);

    // Scroll to payment section
    document.getElementById('paymentConfirmation').scrollIntoView({ behavior: 'smooth' });
}

function displayPaymentConfirmation(name, email, phone, address, city, state, orderRef) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const installationFee = cart.reduce((sum, item) => sum + item.installation, 0);
    const total = subtotal + installationFee;

    document.getElementById('paymentAmount').textContent = `₦${total.toLocaleString()}`;
    document.getElementById('paymentTotal').textContent = `₦${total.toLocaleString()}`;

    // Display order items
    const paymentSummaryItems = document.getElementById('paymentSummaryItems');
    paymentSummaryItems.innerHTML = cart.map(item => `
        <div class="payment-summary-item">
            <div class="payment-summary-name">${item.name}</div>
            <div class="payment-summary-spec">Color: ${item.color} | Qty: ${item.quantity}</div>
            ${item.length ? `<div class="payment-summary-spec">Length: ${item.length}</div>` : ''}
            <div class="payment-summary-price">₦${(item.price * item.quantity).toLocaleString()}</div>
            ${item.installation > 0 ? `<div class="payment-summary-spec">Installation: ₦${item.installation.toLocaleString()}</div>` : ''}
        </div>
    `).join('');
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Continue Shopping
function continueShopping() {
    document.querySelector('.cart-section').style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('paymentConfirmation').style.display = 'none';
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Back to Home
function backToHome() {
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();
    displayCart();
    document.querySelector('.cart-section').style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('paymentConfirmation').style.display = 'none';
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

// Local Storage Functions
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Cart section click
    const cartLink = document.querySelector('a[href="#cart"]');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.cart-section').style.display = 'block';
            document.getElementById('checkout').style.display = 'none';
            document.getElementById('paymentConfirmation').style.display = 'none';
            displayCart();
            document.querySelector('.cart-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Initialize cart display on page load
window.addEventListener('load', () => {
    displayCart();
});