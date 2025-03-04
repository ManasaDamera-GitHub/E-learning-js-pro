document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = ""; // Empty cart message is handled by CSS
    } else {
        cart.forEach((course, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${course.pic}" alt="${course.title}">
                <div>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p class="price">Price: $${course.price}</p>
                    <button class="btn remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // Refresh the page to update the cart display
    }
});