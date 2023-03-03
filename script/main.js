import "../styles/main.css";
import "../styles/header.css";
import "../styles/products.css";
import "../styles/product-modal.css";

import { products } from "../productsData";
import { setupCart } from "./cart";
import { setupModal } from "./productModal";

const productsContainer = document.querySelector("#products .container");
const cart = document.querySelector(".header__nav__cart");
const badge = cart.querySelector(".count");
const productDetailsModal = document.querySelector(".product-details__modal");

const productCardsHtml = products
  .map(
    ({ id, name, image, price }) =>
      `
    <div class='products__product-card'> 
       <div class='card__image'>
            <img src=${image}/> 
       </div> 
        <div class='card__info'>
            <h3 class='name'>${name}</h3>
            <h4 class='price'>${price} EGP</h4>
            <div class='btns'>
              <button class='add-to-cart btn btn-primary' data-id=${id}>Add to cart</button> 
              <button class='btn btn-secondary quick_view' data-id=${id}>Quick view</button> 
            </div>
        </div> 
    </div>`
  )
  .join("");

productsContainer.innerHTML = productCardsHtml;

setupCart(productsContainer, cart, badge, products);
setupModal(productsContainer, productDetailsModal, products);
