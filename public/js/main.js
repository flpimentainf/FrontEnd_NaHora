import { products } from "./products.js";
import { addToCart } from "./cart.js";

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const product = products.find(item => item.id === id);

        if (product) {
            addToCart(product);
            alert(`${product.nome} foi adicionado ao carrinho!`);
        }
    });
});