
let cart = [];

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
}

function addToCart(id, name, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    if (!existingProduct) {
        cart.push({ id, name, price, image });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        return;
    }
    emptyCartMessage.style.display = 'none';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - ${item.price}</span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
