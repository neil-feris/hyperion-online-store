// import addProductsToDOM from ./products.js
import { addProductsToDOM } from "./products.js";

let cart = []; // create an empty array to store our cart

// create a function to add a product to the cart
function addToCart(product) {
  // first load the cart from local storage
  cart = loadCart();
  let inCart = false; // create a variable to check if the product is already in the cart

  // loop through the cart array checking if name is the same as the product name
  for (let i = 0; i < cart.length; i++) {
    // if it is then increase the quantity by 1
    if (cart[i].name === product.name) {
      cart[i].quantity++;
      // save the cart to local storage
      saveCart();
      // set the inCart variable to true
      inCart = true;
    }
  }

  // if the product is not in the cart then add it to the cart with a quantity of 1
  if (!inCart) {
    product.quantity = 1; // set the quantity to 1
    cart.push(product); // add the product to the cart array
    saveCart(); // call the saveCart function to save the cart to local storage
  }

  // calculate total value in cart
  let total = getCartTotal();
  // alert user that product has been added to cart and the total value in cart rounded to 2 decimal places
  alert(
    `${
      product.name
    } has been added to your cart. Your total is R${total.toFixed(2)}`
  );
}

// create a function to remove an item from the cart
function removeFromCart(product) {
  // find the product in the cart array and decrease the quantity by 1 if it is greater than 1 else remove the product from the cart
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name) {
      if (cart[i].quantity > 1) {
        cart[i].quantity--;
        saveCart();
        return;
      } else {
        cart.splice(i, 1);
        saveCart();
        return;
      }
    }
  }
}

function saveCart() {
  // create a function to save the cart to local storage
  localStorage.setItem("cart", JSON.stringify(cart)); // set the cart array to local storage
}

function loadCart() {
  // create a function to load the cart from local storage
  // check if local storage has cart key and if it does, get the cart array else return an empty array
  if (localStorage.getItem("cart") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("cart"));
  }
}

function deleteCart() {
  // create a function to delete the cart from local storage
  localStorage.removeItem("cart");
}

// addCartToDOM function to add the cart to the DOM of cart.html
function addCartToDOM() {
  // loop through the cart array and add each product to the DOM
  cart = loadCart();
  for (let i = 0; i < cart.length; i++) {
    // create a div for each product
    const productDiv = document.createElement("div");
    // add classes to the div
    productDiv.classList.add("product", "col-xl-4", "col-sm-6");

    // create a div for each product name
    const productName = document.createElement("div");
    // add classes to the div
    productName.classList.add("fw-bold");
    // add the product name to the div
    productName.innerHTML = cart[i].name;
    // create a div for each product description
    const productDescription = document.createElement("div");
    // add the product description to the div
    productDescription.innerHTML = cart[i].description;

    // create a div for each product price
    const productPrice = document.createElement("div");
    // add a class to the div
    productPrice.classList.add("fw-bold");
    // add the product price to the div
    productPrice.innerHTML = `R${cart[i].price.toFixed(2)}`;

    // create a div for each product quantity
    const productQuantity = document.createElement("div");
    // add a class to the div
    productQuantity.classList.add("fw-bold");
    // add the product quantity to the div
    productQuantity.innerHTML = `Quantity: ${cart[i].quantity}`;

    // create a button to add 1 to the product quantity
    const addOne = document.createElement("button");
    // add a class to the button
    addOne.classList.add("btn", "btn-primary", "btn-sm");
    // add the text to the button
    addOne.innerHTML = "Add 1";

    // add an event listener to the button
    addOne.addEventListener("click", () => {
      // increase the quantity by 1
      addToCart(cart[i]);
      // save the cart to local storage
      saveCart();
      // refresh the cart
      refreshCart();
    });

    // create a button to remove 1 from the product quantity
    const removeOne = document.createElement("button");
    // add a class to the button
    removeOne.classList.add("btn", "btn-danger", "btn-sm");
    // add the text to the button
    removeOne.innerHTML = "Remove 1";
    // add an event listener to the button
    removeOne.addEventListener("click", () => {
      // decrease the quantity by 1
      removeFromCart(cart[i]);
      // save the cart to local storage
      saveCart();
      // refresh the cart
      refreshCart();
    });

    // append all the divs to the product div
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productQuantity);
    productDiv.appendChild(addOne);
    productDiv.appendChild(removeOne);

    // append the div to the DOM
    document.getElementById("cart-items").appendChild(productDiv);
  }
  // create a div with the cart total
  const cartTotal = document.createElement("div");
  // add a class to the div
  cartTotal.classList.add("fw-bold", "cart-total");
  // add the cart total to the div
  cartTotal.innerHTML = `Total: R${getCartTotal().toFixed(2)}`;
  // append the div to the DOM
  document.getElementById("cart-items").appendChild(cartTotal);

  // create a div with the final total
  const finalTotal = document.createElement("div");
  // add a class to the div
  finalTotal.classList.add("fw-bold", "final-total");
  // add the final total to the div
  finalTotal.innerHTML = `Final Total: R${getFinalTotal().toFixed(
    2
  )}   (Tax included)`;
  // append the div to the DOM
  document.getElementById("cart-items").appendChild(finalTotal);

  // create a button to delete the cart
  const deleteCartButton = document.createElement("button");
  // add a class to the button
  deleteCartButton.classList.add("btn", "btn-danger", "btn-sm");
  // add the text to the button
  deleteCartButton.innerHTML = "Delete Cart";

  // use jQuery to add event listener that deletes the cart when the button is clicked and calls refreshCart function
  $(deleteCartButton).click(function () {
    deleteCart();
    refreshCart();
  });

  // append the button to the DOM
  document.getElementById("cart-items").appendChild(deleteCartButton);
}

function getCartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let itemTotal = cart[i].price * cart[i].quantity;
    total = total + itemTotal;
  }
  return total;
}

// set standard shipping to R100 and priority shipping to R200
const standardShipping = 100;
const priorityShipping = 200;

function getFinalTotal() {
  // if the cart is empty return 0
  if (cart.length === 0) {
    return 0;
  }

  // add VAT at 15% to the cart total
  let total = getCartTotal();
  let vat = total * 0.15;
  let finalTotal = total + vat;

  // check if discounted is true and if it is, add the discount to the final total
  if (discounted) {
    finalTotal = finalTotal - finalTotal * 0.1; // 10% discount
  }

  // add shipping based on the shipping method selected
  if (document.getElementById("standard").checked) {
    finalTotal = finalTotal + standardShipping;
  } else if (document.getElementById("priority").checked) {
    finalTotal = finalTotal + priorityShipping;
  }

  return finalTotal;
}

// refreshCart function to refresh the cart after adding or removing items
function refreshCart() {
  // use jquery to clear the cart-items div
  $("#cart-items").empty();
  // call the addCartToDOM function
  addCartToDOM();
}

// jquery function that runs applyDiscount function when the user clicks the apply discount button
$("#apply-discount").click(function () {
  applyDiscount();
});

let discounted = false; // set discounted to false
// applyDiscount function checks if the user has entered a discount code and if so, applies the discount to the cart
function applyDiscount() {
  // get the discount code from the input
  let discountCode = document.getElementById("discount-code").value;
  // as long as the discount code is not empty, set discounted to true
  if (discountCode !== "") {
    discounted = true;
    // alert the user that the discount has been applied
    alert("Discount applied!");
  }
  // refresh the cart
  refreshCart();
}

// export addToCart, saveCart, loadCart and deleteCart functions
export {
  cart,
  addToCart,
  saveCart,
  loadCart,
  deleteCart,
  removeFromCart,
  addCartToDOM,
  refreshCart,
  applyDiscount,
  getFinalTotal,
  discounted,
};
