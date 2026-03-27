const CART_KEY = "nahora-cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
    return cart;
}

export function addToCart(item) {
    const itemExists = cart.find(product => product.id === item.id);

    if (itemExists) {
        itemExists.quantidade += 1;
    } else {
        cart.push({
            ...item,
            quantidade: 1
        });
    }

    saveCart();
}

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

export function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantidade += 1;
        saveCart();
    }
}

export function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (item.quantidade > 1) {
        item.quantidade -= 1;
    } else {
        removeFromCart(id);
        return;
    }

    saveCart();
}

export function clearCart() {
    cart = [];
    saveCart();
}

export function getCartSubtotal() {
    return cart.reduce((total, item) => {
        return total + item.preco * item.quantidade;
    }, 0);
}

export function getDeliveryFee() {
    const selectedDelivery = document.querySelector('input[name="entrega"]:checked');

    if (!selectedDelivery) return 0;
    if (selectedDelivery.value === "padrao") return 8;
    if (selectedDelivery.value === "retirada") return 0;

    return 0;
}

export function getServiceFee() {
    const subtotal = getCartSubtotal();

    if (subtotal === 0) return 0;

    return 2;
}

export function getCartTotal() {
    return getCartSubtotal() + getDeliveryFee() + getServiceFee();
}