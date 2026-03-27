import { clearCart } from "./cart.js";
import { renderCart } from "./ui.js";

const clearCartButton = document.getElementById("clear-cart-btn");
const deliveryOptions = document.querySelectorAll('input[name="entrega"]');

if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
        clearCart();
        renderCart();
    });
}

deliveryOptions.forEach(option => {
    option.addEventListener("change", () => {
        renderCart();
    });
});

renderCart();