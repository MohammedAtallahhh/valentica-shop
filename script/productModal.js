import { addToCart, removeFromCart } from "./cart.js";
import { products } from "../productsData.js";

export const setupModal = (productsContainer, productDetailsModal, cart) => {
  const modalInner = productDetailsModal.querySelector(".modal__inner");

  const handleQuickView = (e) => {
    // Catch the click on the quick view button
    const quickViewButton =
      e.target.closest(".quick_view") || e.target.closest(".card__image");
    if (!quickViewButton) {
      return;
    }

    // Getting the id of the product through the data-id attribute
    const id = +quickViewButton.dataset.id;

    // Getting the current state of products
    const currentProducts =
      JSON.parse(localStorage.getItem("products")) || products;

    const product = currentProducts.find((p) => p.id === id);

    // Popualte the modal with the product data
    const modalContent = `
      <div class="close-btn">&#x2715;</div>
      <div class='product__image'>
        <img src=${product.image} />
      </div>
      <div class='product__info'>
        <h3 class='name'>${product.name}</h3>
        <h4 class='price'>${product.price} EGP</h4>
        <button class='cart-btn btn ${
          product.added_to_cart ? "btn-danger" : "btn-primary"
        }' data-id=${product.id}>
          ${product.added_to_cart ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    `;
    modalInner.innerHTML = modalContent;

    // Open the modal
    productDetailsModal.classList.add("open");
    document.documentElement.classList.add("no-scroll");

    // handle Closing the modal by clicking the button or outside the modal
    const closeBtn = productDetailsModal.querySelector(".close-btn");
    closeBtn.addEventListener("click", handleCloseModal);
    document.addEventListener("click", handleOutsideClick);

    // Handle the cart button
    const cartButton = modalInner.querySelector(".cart-btn");
    cartButton.addEventListener("click", handleCartButtonClick);
  };

  const handleCloseModal = () => {
    productDetailsModal.classList.remove("open");
    const closeBtn = productDetailsModal.querySelector(".close-btn");
    closeBtn.removeEventListener("click", handleCloseModal);
    document.removeEventListener("click", handleOutsideClick);
    document.documentElement.classList.remove("no-scroll");
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "product-details__modal open") {
      handleCloseModal();
    }
  };

  const handleCartButtonClick = (e) => {
    const button = e.target;
    const id = +button.dataset.id;

    const currentProducts =
      JSON.parse(localStorage.getItem("products")) || products;

    const product = currentProducts.find((p) => p.id === id);

    if (product.added_to_cart) {
      removeFromCart(id, cart);
    } else {
      addToCart(id, cart);
    }

    // Toggle the added_to_cart property
    product.added_to_cart = !product.added_to_cart;

    // update the button text and classes
    updateCartButton(button, product.added_to_cart);
  };

  productsContainer.addEventListener("click", handleQuickView);

  function updateCartButton(button, addedToCart) {
    const buttonText = addedToCart ? "Remove from cart" : "Add to cart";
    const buttonClass = `btn ${addedToCart ? "btn-danger" : "btn-primary"}`;
    button.textContent = buttonText;
    button.className = `cart-btn ${buttonClass}`;
  }
};
