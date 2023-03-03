export const setupCart = (container, cart, badge, products) => {
  let cartState = JSON.parse(localStorage.getItem("cart")) || [];

  const handleAddToCart = (e) => {
    const btn = e.target.closest(".card__info--btn");
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

      updateCartBadge(badge, cartState);
      localStorage.setItem("cart", JSON.stringify(cartState));
    }
  };

  const updateCartBadge = (badge, cartState) => {
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
    const productsContainer = dropdown.querySelector(".products");
    dropdown.classList.toggle("open");

    const cartProductsHtml = cartState
      .map(
        ({ id, name, image, price }) =>
          `
          <div class='cart__product'> 
            <div class='cart__product__image'>
                <img src=${image}/> 
            </div> 
              <div class='cart__product__info'>
                  <h3 class='name'>${name}</h3>
                  <h4 class='price'>${price} EGP</h4>
                  <button data-id=${id}>delete</button>
              </div> 
          </div>
    `
      )
      .join("");

    productsContainer.innerHTML = cartProductsHtml;
  };

  // update badge state on initial load
  updateCartBadge(badge, cartState);
  // Adding the listener to the parent instead of every child button
  container.addEventListener("click", handleAddToCart);
  cart.addEventListener("click", handleOpenCart);
};
