export const setupModal = (
  productsContainer,
  productDetailsModal,
  products
) => {
  const modalInner = productDetailsModal.querySelector(".modal__inner");
  let isOpen = false;

  const handleQuickView = (e) => {
    if (e.target.closest(".quick_view")) {
      const id = +e.target.dataset.id;
      const { image, name, price } = products.find((p) => p.id === id);

      modalInner.innerHTML = `
        <div class="close-btn">&#x2715;</div>
        <div class='product__image'>
            <img src=${image} />
        </div>
        
        <div class='product__info'>
            <h3>${name}</h3>
            <h4>${price}</h4>
            <button class='btn btn-primary'>Add to cart</button>
        </div>
          `;

      const closeBtn = productDetailsModal.querySelector(".close-btn");
      productDetailsModal.classList.add("open");
      isOpen = true;
      closeBtn.addEventListener("click", () => {
        productDetailsModal.classList.remove("open");
        isOpen = false;
      });
    }
  };
  productsContainer.addEventListener("click", handleQuickView);
};
