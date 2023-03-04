import { renderProducts } from "./main";
import { products } from "../productsData";

let cartState = JSON.parse(localStorage.getItem("cart")) || [];
let currentProducts = JSON.parse(localStorage.getItem("products")) || products;

export const addToCart = (id, cart) => {
  let product = currentProducts.find((p) => p.id === id);
  let cartItem = cartState.find((p) => p.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    product.added_to_cart = true;
    cartItem = { ...product, quantity: 1 };
    cartState.push(cartItem);
    localStorage.setItem("products", JSON.stringify(currentProducts));
    renderProducts();
  }

  updateCartState(cart);
};

export const removeFromCart = (id, cart) => {
  let newCartState = cartState.filter((p) => p.id !== id);
  const product = currentProducts.find((p) => p.id === id);
  product.added_to_cart = false;
  cartState = newCartState;

  // Save to local storage and update products and cart state
  localStorage.setItem("products", JSON.stringify(currentProducts));
  renderProducts();
  updateCartState(cart);
};

const handleAddToCart = (e, cart) => {
  const add = e.target.closest(".add-to-cart");
  const remove = e.target.closest(".remove-from-cart");
  if (add) {
    const id = +add.dataset.id;
    // Extracting the id from the data-id attribute
    addToCart(id, cart);
  }

  if (remove) {
    const id = +remove.dataset.id;
    removeFromCart(id, cart);
  }
};

const updateCartBadge = (cart) => {
  const badge = cart.querySelector(".count");
  const totalQuantity = cartState.reduce((acc, item) => acc + item.quantity, 0);

  badge.innerHTML = totalQuantity;
  if (totalQuantity > 0) {
    badge.classList.add("active");
  } else {
    badge.classList.remove("active");
  }
};

const handleOpenCart = (cart) => {
  const dropdown = cart.querySelector(".cart__dropdown");
  dropdown.classList.toggle("open");

  // Close the cart dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".cart__label") &&
      !e.target.closest(".cart__dropdown") &&
      dropdown.classList.contains("open")
    ) {
      dropdown.classList.toggle("open");
    }
  });
};

const handleDeleteFromCart = (e, cart) => {
  if (e.target.closest(".delete-btn")) {
    const id = +e.target.closest(".delete-btn").dataset.id;
    console.log(e.target);
    removeFromCart(id, cart);
  }
};

const handleCartQuantity = (e, cart) => {
  if (e.target.closest(".quantity input")) {
    const id = +e.target.dataset.id;
    const product = cartState.find((p) => p.id === id);
    const value = +e.target.value;
    let newCartState;

    if (value === 0) {
      removeFromCart(id, cart);
    } else {
      product.quantity = value;
    }

    localStorage.setItem("products", JSON.stringify(currentProducts));
    updateCartState(cart);
  }
};

const updateCartState = (cart) => {
  const cartProductsContainer = cart.querySelector(".cart__dropdown .products");
  const totalContainer = cart.querySelector(".cart__dropdown__footer .total");

  const totalPrice = cartState.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Render products in cart if any, and show empty state if not
  const cartProductsHtml = cartState.length
    ? cartState
        .map(
          ({ id, name, image, price, quantity }) =>
            `
      <div class='cart__product'> 
        <div class='image'>
            <img src=${image}/> 
        </div> 
          <div class='info'>
            <h3 class='name'>${name}</h3>
            <h4 class='price'>${price} EGP</h4>
            <div class='quantity'>
              <span>Quantity: </span>
              <input type='number' value='${quantity}' data-id=${id} />
            </div>
          </div> 
            <button class='delete-btn' title='Delete Item' data-id=${id}>
              <img src='/trash.png' />
            </button>
      </div>
`
        )
        .join("")
    : `<div class='empty-cart'>
        <div>
          <img src='https://cdn.dribbble.com/users/357797/screenshots/3998541/empty_box.jpg' alt='Empty cart'/>
          <h4>No products in Cart, Add some.</h4>
        </div>
    </div>`;

  updateCartBadge(cart);
  cartProductsContainer.innerHTML = cartProductsHtml;
  totalContainer.innerHTML = `Total: ${totalPrice} EGP`;
  localStorage.setItem("cart", JSON.stringify(cartState));
};

export const setupCart = (productsContainer, cart) => {
  const cartBtn = cart.querySelector(".cart__label");
  const cartProductsContainer = cart.querySelector(".cart__dropdown .products");

  // Populate the cart on initial load
  updateCartState(cart);

  // Adding the listener to the parent instead of every child button
  productsContainer.addEventListener("click", (e) => handleAddToCart(e, cart));
  cartBtn.addEventListener("click", () => handleOpenCart(cart));
  cartProductsContainer.addEventListener("click", (e) =>
    handleDeleteFromCart(e, cart)
  );
  cartProductsContainer.addEventListener("change", (e) =>
    handleCartQuantity(e, cart)
  );
};
