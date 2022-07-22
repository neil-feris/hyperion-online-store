// import the products array and functions saveProducts, loadProducts and deleteProducts from ./products.js
import {
  saveProducts,
  loadProducts,
  deleteProducts,
  addProductsToDOM,
} from "./products.js";

// import the cart array and functions addToCart, saveCart, loadCart and deleteCart from ./cart.js
import {
  cart,
  addToCart,
  saveCart,
  loadCart,
  deleteCart,
  addCartToDOM,
  refreshCart,
  getFinalTotal,
  applyDiscount,
} from "./cart.js";

deleteProducts(); // delete the products from local storage
saveProducts(); // call the saveProducts function to save our products to local storage

// if we are on the deals page then addProductsToDOM();
if (document.querySelector("#deals")) {
  addProductsToDOM(); // add the products to the DOM
}

// if we are on the cart page then loadCart() and addCartToDOM();
if (document.querySelector("#cart")) {
  loadCart(); // load the cart from local storage
  addCartToDOM(); // add the cart to the DOM
  // use jquery to reload cart when priority or standard shipping is selected
  $("#priority").click(() => {
    refreshCart();
  });
  $("#standard").click(() => {
    refreshCart();
  });
}

// if we are on a product page  we slide down our content and add a event handler to the add to cart button
if (document.querySelector("#add-to-cart")) {
  // slide down the content
  $(".product-details")
    .slideDown(1000)
    .animate({ opacity: 1 }, { queue: false, duration: 1000 });

  // add a click event listener to the add to cart button
  document.querySelector("#add-to-cart").addEventListener("click", () => {
    // load products from local storage
    const products = loadProducts();

    // load the cart from local storage
    loadCart();

    // determine what product we are adding to the cart by querying the id with the #product-id and parsing it to an integer and then subtracting 1 from it

    const productId =
      parseInt(document.querySelector("#product-id").innerHTML, 10) - 1;

    // set product to the product in the products array with the id of productId
    const product = products[productId];

    // add the product to the cart
    addToCart(product); // call the addToCart function to add the product to the cart
    // save the cart to local storage
    saveCart(); // call the saveCart function to save the cart to local storage
  });
}

// create a jQuery function that displays the shipping div if the delivery radio button is selected
$(document).ready(function () {
  $("#delivery").click(function () {
    $(".shipping").show();
    // $(".shipping").slideDown("slow");
  });
  $("#pickup").click(function () {
    $(".shipping").hide();
    // $(".shipping").slideUp("slow"); // hide the shipping div
    // uncheck both radio buttons
    $("#standard").prop("checked", false);
    $("#priority").prop("checked", false);
    // refresh the cart
    refreshCart();
  });
});

// use jquery to check if the confirm-order button is clicked and then generate an alert with the total price of the cart as well as a random 5 character confirmation code
$("#confirm-order").click(function () {
  // if cart is not empty
  if (cart.length > 0) {
    alert(
      "Your order was successful.\nYour total is: R" +
        getFinalTotal().toFixed(2) + // call the getFinalTotal function to get the total price of the cart
        "\nYour confirmation code is: " +
        generateConfirmationCode()
    );
  } else {
    alert("Your cart is empty. Please add items to your cart.");
  }
});

//  generateConfirmationCode function to generate a random 5 character confirmation code
function generateConfirmationCode() {
  // create an empty string
  let code = "";
  // for loop to generate 5 random characters
  for (let i = 0; i < 5; i++) {
    // get a random number between 0 and 25
    let randomNumber = Math.floor(Math.random() * 26);
    // convert the random number to a character
    let randomCharacter = String.fromCharCode(randomNumber + 97); // 97 is the ascii value for a
    // add the character to the string
    code += randomCharacter;
  }
  // return the string
  return code;
}

// if we are on the about page use jquery to slideToggle the navbar

if (document.querySelector("#about")) {
  $(document).ready(function () {
    $("#toggle-nav").click(function () {
      $(".navbar").slideToggle("slow");
    });
  });
}

// deleteCart(); // delete the cart from local storage
