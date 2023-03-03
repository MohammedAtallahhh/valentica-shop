export const setupCart = (productsContainer, cart, badge, products) => {
  let cartState = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBtn = cart.querySelector(".cart__label");
  const cartProductsContainer = document.querySelector(
    ".cart__dropdown .products"
  );
  const totalContainer = cart.querySelector(".cart__dropdown__footer .total");

  const handleAddToCart = (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (btn) {
      // Extracting the id from the data-id attribute
      const id = +btn.dataset.id;
      let product = products.find((p) => p.id === id);
      let cartItem = cartState.find((p) => p.id === id);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        delete product.added_to_cart;
        cartItem = { ...product, quantity: 1 };
        cartState.push(cartItem);
      }

      updateCartState();
    }
  };

  const updateCartBadge = () => {
    const totalQuantity = cartState.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    badge.innerHTML = totalQuantity;
    if (totalQuantity > 0) {
      badge.classList.add("active");
    } else {
      badge.classList.remove("active");
    }
  };

  const handleOpenCart = () => {
    const dropdown = cart.querySelector(".cart__dropdown");
    dropdown.classList.toggle("open");
  };

  const updateCartState = () => {
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
          <div class='cart__product__image'>
              <img src=${image}/> 
          </div> 
            <div class='cart__product__info'>
                <h3 class='name'>${name}</h3>
                <h4 class='price'>${price} EGP</h4>
                <div class='quantity'>
                  <span>Quantity: </span>
                  <input type='number' value='${quantity}' data-id=${id} />
                </div>
                </div> 
                <button class='delete-btn' data-id=${id}>&#x2715</button>
        </div>
  `
          )
          .join("")
      : `<div class='empty-cart'>
          <div>
            <img src='https://cdn.dribbble.com/users/357797/screenshots/3998541/empty_box.jpg' alt='Empty cart'/>
            <h4>Empty Cart, Add some products.</h4>
          </div>
      </div>`;

    updateCartBadge();
    cartProductsContainer.innerHTML = cartProductsHtml;
    totalContainer.innerHTML = `Total: ${totalPrice}`;
    localStorage.setItem("cart", JSON.stringify(cartState));
  };

  const handleDeleteFromCart = (e) => {
    if (e.target.closest(".delete-btn")) {
      const id = +e.target.dataset.id;
      cartState = cartState.filter((p) => p.id !== id);
      updateCartState();
    }
  };

  const handleCartQuantity = (e) => {
    if (e.target.closest(".quantity input")) {
      const id = +e.target.dataset.id;
      const product = cartState.find((p) => p.id === id);
      const value = +e.target.value;

      if (value === 0) {
        cartState = cartState.filter((p) => p.id !== id);
      } else {
        product.quantity = value;
      }

      updateCartState();
    }
  };

  // Populate the cart on initial load
  updateCartState();

  // Adding the listener to the parent instead of every child button
  productsContainer.addEventListener("click", handleAddToCart);
  cartBtn.addEventListener("click", handleOpenCart);
  cartProductsContainer.addEventListener("click", handleDeleteFromCart);
  cartProductsContainer.addEventListener("change", handleCartQuantity);
};
