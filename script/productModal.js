// import { addToCart, removeFromCart } from "./cart.js";
// import { products } from "../productsData.js";

// export const setupModal = (productsContainer, productDetailsModal, cart) => {
//   const modalInner = productDetailsModal.querySelector(".modal__inner");

//   const handleQuickView = (e) => {
//     if (e.target.closest(".quick_view")) {
//       const id = +e.target.dataset.id;

//       const showModal = () => {
//         const currentProducts =
//           JSON.parse(localStorage.getItem("products")) || products;
//         const { image, name, price, added_to_cart } = currentProducts.find(
//           (p) => p.id === id
//         );

//         modalInner.innerHTML = `
//         <div class="close-btn">&#x2715;</div>
//         <div class='product__image'>
//             <img src=${image} />
//         </div>

//         <div class='product__info'>
//             <h3>${name}</h3>
//             <h4>${price}</h4>
//             ${
//               added_to_cart
//                 ? `<button class='remove-from-cart btn btn-secondary' data-id=${id}>Remove from cart</button>`
//                 : `<button class='add-to-cart btn btn-primary' data-id=${id}>Add to cart</button>`
//             }        </div>
//           `;

//         const closeBtn = productDetailsModal.querySelector(".close-btn");

//         closeBtn.addEventListener("click", () =>
//           productDetailsModal.classList.remove("open")
//         );

//         productDetailsModal.addEventListener("click", (e) => {
//           if (e.target.closest(".add-to-cart")) {
//             addToCart(id, cart);
//             showModal();
//           } else if (e.target.closest(".remove-from-cart")) {
//             removeFromCart(id, cart);
//             showModal();
//           }
//         });
//       };

//       showModal();
//       productDetailsModal.classList.add("open");
//     }
//   };
//   productsContainer.addEventListener("click", handleQuickView);
// };
import { addToCart, removeFromCart } from "./cart.js";
import { products } from "../productsData.js";

export const setupModal = (productsContainer, productDetailsModal, cart) => {
  const modalInner = productDetailsModal.querySelector(".modal__inner");

  const handleQuickView = (e) => {
    const quickViewButton = e.target.closest(".quick_view");
    if (!quickViewButton) {
      return;
    }

    const id = +quickViewButton.dataset.id;
    const currentProducts =
      JSON.parse(localStorage.getItem("products")) || products;
    const product = currentProducts.find((p) => p.id === id);

    const modalContent = `
      <div class="close-btn">&#x2715;</div>
      <div class='product__image'>
        <img src=${product.image} />
      </div>
      <div class='product__info'>
        <h3>${product.name}</h3>
        <h4>${product.price}</h4>
        <button class='cart-btn btn ${
          product.added_to_cart ? "btn-secondary" : "btn-primary"
        }' data-id=${product.id}>
          ${product.added_to_cart ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    `;

    modalInner.innerHTML = modalContent;
    productDetailsModal.classList.add("open");

    const closeBtn = productDetailsModal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () =>
      productDetailsModal.classList.remove("open")
    );

    const cartButton = modalInner.querySelector(".cart-btn");
    cartButton.addEventListener("click", (e) => {
      const button = e.target;
      const id = +button.dataset.id;
      if (product.added_to_cart) {
        removeFromCart(id, cart);
      } else {
        addToCart(id, cart);
      }
      product.added_to_cart = !product.added_to_cart;
      updateCartButton(button, product.added_to_cart);
    });
  };

  productsContainer.addEventListener("click", handleQuickView);

  function updateCartButton(button, addedToCart) {
    const buttonText = addedToCart ? "Remove from cart" : "Add to cart";
    const buttonClass = `btn ${addedToCart ? "btn-secondary" : "btn-primary"}`;
    button.textContent = buttonText;
    button.className = `cart-btn ${buttonClass}`;
  }
};
