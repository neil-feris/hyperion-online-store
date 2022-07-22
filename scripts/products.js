// create a product class which contains the following properties: name, description,price, and image.
class Product {
  // constructor function for product
  constructor(name, description, price, image) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

// Create our products

const product1 = new Product(
  "Time",
  "A white wristwatch",
  199.99,
  "./images/01-rachit-tank-2cFZ_FB08UM-unsplash.jpg"
);

const product2 = new Product(
  "Isolation",
  "Noise cancelling headphones",
  59.99,
  "./images/02-c-d-x-PDX_a_82obo-unsplash.jpg"
);

const product3 = new Product(
  "Freeze Frame",
  "An instant camera",
  399.99,
  "./images/03-eniko-kis-KsLPTsYaqIQ-unsplash.jpg"
);

const product4 = new Product(
  "Peace of Mind",
  "Bundle of hand sanitisers",
  14.99,
  "./images/04-kelly-sikkema-xp-ND7NjWaA-unsplash.jpg"
);

const product5 = new Product(
  "Stairway to Heaven",
  "A place to pack things",
  4.99,
  "./images/05-rodion-kutsaev-6W8H4puOJB0-unsplash.jpg"
);

const product6 = new Product(
  "Fuel",
  "When it's time to recharge",
  0.99,
  "./images/06-mike-dorner-sf_1ZDA1YFw-unsplash.jpg"
);

const product7 = new Product(
  "Protection",
  "When it's time to move",
  29.99,
  "./images/07-jakob-owens-BmH09wAkJa8-unsplash.jpg"
);

const product8 = new Product(
  "Cat Remover",
  "When you need your keyboard back",
  1.99,
  "./images/08-parth-shah-940wS2deo9k-unsplash.jpg"
);

const product9 = new Product(
  "Idea",
  "Shine new light on the subject",
  3.99,
  "./images/09-david-van-dijk-3LTht2nxd34-unsplash.jpg"
);

const product10 = new Product(
  "Inspiration",
  "A cup of coffee...or something else.",
  5.99,
  "./images/10-nordwood-themes-nDd3dIkkOLo-unsplash.jpg"
);

// create an array of products to store our original 10 products
let products = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
];

// saveProducts function to save our products to local storage
function saveProducts() {
  // check if local storage has products key
  if (localStorage.getItem("products") === null) {
    // if not, create a new key with the value of our products array
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    // if it does, merge our products array with the existing products array
    const existingProducts = JSON.parse(localStorage.getItem("products")); // get the existing products array
    existingProducts.push(...products); // add our products array to the existing products array
    localStorage.setItem("products", JSON.stringify(existingProducts)); // set the existing products array to local storage
  }
}

// loadProducts function to load our products from local storage
function loadProducts() {
  // check if local storage has products key and if it does, get the products array else return an empty array
  if (localStorage.getItem("products") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("products"));
  }
}

// saveProducts(); // call the saveProducts function to save our products to local storage

// get the products from local storage
// products = loadProducts();

// delete products from local storage
function deleteProducts() {
  localStorage.removeItem("products");
}

// deleteProducts();

// addProductsToDOM();

function addProductsToDOM() {
  // loop through the products array and add each product to the DOM
  products = loadProducts();
  for (let i = 0; i < products.length; i++) {
    // create a div for each product
    const productDiv = document.createElement("div");
    // add classes to the div
    productDiv.classList.add("product", "col-xl-4", "col-sm-6");

    // create a div for the product name
    const productName = document.createElement("div");
    // add a class to the div
    productName.classList.add("product-name", "position-absolute", "fw-bold");

    // add the product name to the div
    productName.innerHTML = products[i].name;
    // create a div for each product description
    const productDescription = document.createElement("div");
    // add a class to the div
    productDescription.classList.add("product-description");
    // add the product description to the div
    productDescription.innerHTML = products[i].description;
    // create a div containing an add to cart button
    const addToCartDiv = document.createElement("div");
    // add a class to the div
    addToCartDiv.classList.add("add-to-cart");
    // create a button for the add to cart button
    const addToCartButton = document.createElement("button");
    // add a class to the button
    addToCartButton.classList.add("btn", "btn-primary", "add-to-cart-btn");
    // add the button text
    addToCartButton.innerHTML = "Add to Cart";

    // add click event listener to the button that runs addToCart with the product as an argument
    addToCartButton.addEventListener("click", () => {
      addToCart(products[i]);
    });

    // add the button to the div
    addToCartDiv.appendChild(addToCartButton);
    // create a div for each product's price
    const productPrice = document.createElement("div");
    // add a class to the div
    productPrice.classList.add("product-price");
    // add the product price to the div
    productPrice.innerHTML = `R${products[i].price}`;
    // create an a for each product's image
    const productImageLink = document.createElement("a");
    // add a class of product-link to the a
    productImageLink.classList.add("product-link");
    // add a href to the a
    let link = `./product-pages/product-${String(i + 1).padStart(2, "0")}.html`; // build the link to the product page with the product number padded with 0s to make it 2 digits
    productImageLink.href = link;
    // create a img for each product
    const productImage = document.createElement("img");
    // add classes to the get a responsive image
    productImage.classList.add("product-image", "img-fluid", "img-thumbnail");
    // add the product image to the img
    productImage.src = products[i].image;
    // append all the divs
    productImageLink.appendChild(productName);
    productImageLink.appendChild(productImage);
    productImageLink.appendChild(productPrice);
    productDiv.appendChild(productImageLink);
    productDescription.appendChild(addToCartDiv);
    productDiv.appendChild(productDescription);
    // append the div to the DOM
    document.querySelector(".products").appendChild(productDiv);
  }
}

// import functions from cart.js
import { addToCart } from "./cart.js";

// export all the functions to be used in other files
export { saveProducts, loadProducts, deleteProducts, addProductsToDOM };
