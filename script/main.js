import "../styles/main.css";
import "../styles/header.css";
import "../styles/products.css";

import { products } from "../productsData";
import { setupCart } from "./cart";

const productsContainer = document.querySelector("#products .container");
const cart = document.querySelector(".header__nav__cart");
const badge = cart.querySelector(".count");

const productCardsHtml = products
  .map(
    ({ id, name, image, price }) =>
      `
    <div class='products__product-card'> 
       <div class='card__image'>
            <img src=${image}/> 
       </div> 
        <div class='card__info'>
            <h3 class='card__info--name'>${name}</h3>
            <h4 class='card__info--price'>${price} EGP</h4>
            <button class='card__info--btn btn' data-id=${id}>Add to cart</button> 
        </div> 
    </div>`
  )
  .join("");

productsContainer.innerHTML = productCardsHtml;

setupCart(productsContainer, cart, badge, products);
