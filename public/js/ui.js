import {
    getCart,
    getCartSubtotal,
    getDeliveryFee,
    getServiceFee,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} from "./cart.js";

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const deliveryFeeElement = document.getElementById("delivery-fee");
    const serviceFeeElement = document.getElementById("service-fee");
    const totalElement = document.getElementById("total");

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
      <p class="empty-cart">Seu carrinho está vazio.</p>
    `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.imagem}" alt="${item.nome}">
        
        <div class="cart-item-info">
          <h4>${item.nome}</h4>
          <p>${formatPrice(item.preco)}</p>

          <div class="cart-controls">
            <button class="decrease-btn" data-id="${item.id}">-</button>
            <span>${item.quantidade}</span>
            <button class="increase-btn" data-id="${item.id}">+</button>
          </div>

          <button class="remove-btn" data-id="${item.id}">Remover</button>
        </div>
      </div>
    `).join("");
    }

    subtotalElement.textContent = formatPrice(getCartSubtotal());
    deliveryFeeElement.textContent = formatPrice(getDeliveryFee());
    serviceFeeElement.textContent = formatPrice(getServiceFee());
    totalElement.textContent = formatPrice(getCartTotal());

    addCartEvents();
}

function addCartEvents() {
    const increaseButtons = document.querySelectorAll(".increase-btn");
    const decreaseButtons = document.querySelectorAll(".decrease-btn");
    const removeButtons = document.querySelectorAll(".remove-btn");

    increaseButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            increaseQuantity(id);
            renderCart();
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            decreaseQuantity(id);
            renderCart();
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            removeFromCart(id);
            renderCart();
        });
    });
}