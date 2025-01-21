// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Load the cart when the cart page is opened
    if (window.location.pathname.includes("cart.html")) {
      displayCartItems();
    }
  });
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({name: productName, price: price, quantity: 1 });
    }
  
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Notify the user
    alert(`${productName} added to cart!`);
  }
  
  // Function to display cart items on the cart page
  function displayCartItems() {
    const cartItemsList = document.getElementById("cartItems");
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      return;
    }
  
    emptyCartMessage.style.display = "none";
  
    cartItemsList.innerHTML = ""; // Clear any existing content
    let totalPrice = 0;
  
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
  
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ₹${item.price} x ${item.quantity}
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      `;
      cartItemsList.appendChild(li);
    });
  
    // Add total price at the end
    const totalPriceEl = document.createElement("div");
    totalPriceEl.innerHTML = `<h3>Total: ₹${totalPrice}</h3>`;
    cartItemsList.appendChild(totalPriceEl);
  }
  
  function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Reload the cart page
  }
  