// Strict mode for safer JavaScript execution
"use strict";


// 1. Form Validation & Error Handling
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form submission by default

  let valid = true;  // Flag to check form validity
  const formElements = event.target.elements;
  const errorMessages = document.getElementById('form-messages');
  errorMessages.innerHTML = "";  // Clear any previous error messages


  // Loop through all form elements and validate each
  for (let element of formElements) {
    if (element.type !== "submit") {
      // Check if the required fields are empty
      if (element.required && !element.value.trim()) {
        valid = false;
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `${element.name} is required.`;
        errorMessages.appendChild(errorMessage);
        element.classList.add('error');  // Add error class for styling
      } else {
        element.classList.remove('error');  // Remove error class if input is valid
      }
    }
  }


  // If the form is valid, show a success message and reset the form
  if (valid) {
    errorMessages.innerHTML = "<p>Thank you for contacting us! Your message has been sent.</p>";
    document.getElementById('contact-form').reset();  // Reset the form fields
  }
});


// 2. Password Validation Function
function validatePassword(password) {
    let errors = [];
  
    // Password validation rules
    if (password.length < 10) {
      errors.push('Password must be at least 10 characters long');
    }
    if (password.length > 24) {
      errors.push('Password must be at most 24 characters long');
    }
    if (/\s/.test(password)) {
      errors.push('Password cannot contain spaces');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
  
    return errors; // Return validation errors for password
  }


// 3. Cart Total Calculation
const productCards = document.querySelectorAll('.product-card');
const cartItemsList = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');

// Initialize cart items (Empty initially)
let cart = [];

productCards.forEach(card => {
  const addToCartButton = card.querySelector('.add-to-cart');
  const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

  addToCartButton.addEventListener('click', () => {
    // Add item to the cart (can handle duplicates)
    cart.push(price);
    updateCart();
  });
});

// Function to update the cart display and total calculations
function updateCart() {
  // Clear previous cart content
  cartItemsList.innerHTML = "";

  // Recalculate subtotal, tax, and total
  let subtotal = 0;
  cart.forEach(price => {
    subtotal += price;
    const listItem = document.createElement('li');
    listItem.textContent = `$${price.toFixed(2)}`;
    cartItemsList.appendChild(listItem);
  });

  const tax = subtotal * 0.08;  // 8% tax rate
  const shipping = subtotal > 0 ? 5.00 : 0.00;  // $5 shipping fee

  subtotalElement.textContent = subtotal.toFixed(2);
  taxElement.textContent = tax.toFixed(2);
  shippingElement.textContent = shipping.toFixed(2);
  totalElement.textContent = (subtotal + tax + shipping).toFixed(2);
}


// 4. Light/Dark Mode Toggle
const modeToggleButton = document.getElementById('mode-toggle');

// Check the user's current theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Toggle light/dark mode when the button is clicked
modeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Save user's preference in localStorage for next visit
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
});


// 5. Clear Errors and Reset Inputs
// Clear input error styles and messages if the user corrects their inputs
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.classList.contains('error') && input.value.trim()) {
      input.classList.remove('error');
      document.getElementById('form-messages').innerHTML = "";
    }
  });
});

