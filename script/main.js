import "../styles/main.css";
import "../styles/header.css";
import "../styles/products.css";
import "../styles/product-modal.css";

import { products } from "../productsData";
import { setupCart } from "./cart";
import { setupModal } from "./productModal";

export const cart = document.querySelector(".header__nav__cart");
const productsContainer = document.querySelector("#products .container");
const productDetailsModal = document.querySelector(".product-details__modal");

export const renderProducts = () => {
  const currentProducts =
    JSON.parse(localStorage.getItem("products")) || products;

  const productCardsHtml = currentProducts
    .map(
      ({ id, name, image, price, added_to_cart }) =>
        `
    <div class='product-card'> 
       <div class='card__image' data-id=${id}>
            <img src=${image}/> 
       </div> 
        <div class='card__info'>
            <h3 class='name'>${name}</h3>
            <h4 class='price'>${price} EGP</h4>
            <div class='btns'>
              ${
                added_to_cart
                  ? `<button class='remove-from-cart btn btn-danger' data-id=${id}>Remove from cart</button>`
                  : `<button class='add-to-cart btn btn-primary' data-id=${id}>Add to cart</button>`
              }
              <button class='btn btn-secondary quick_view' data-id=${id}>Quick view</button> 
            </div>
        </div> 
    </div>`
    )
    .join("");

  productsContainer.innerHTML = productCardsHtml;
};

renderProducts();
setupCart(productsContainer);
setupModal(productsContainer, productDetailsModal);
