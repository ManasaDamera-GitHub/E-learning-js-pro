document.addEventListener("DOMContentLoaded", () => {
    const favouritesContainer = document.getElementById("favourites-container");
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (favourites.length === 0) {
        favouritesContainer.innerHTML = "<p>Your favourites list is empty.</p>";
    } else {
        favourites.forEach((course, index) => {
            const favouriteItem = document.createElement("div");
            favouriteItem.classList.add("favourite-item");
            favouriteItem.innerHTML = `
                <img src="${course.pic}" alt="${course.title}">
                <div>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p class="price">Price: $${course.price}</p>
                    <button class="btn remove-favourite-btn" data-index="${index}">Remove</button>
                </div>
            `;
            favouritesContainer.appendChild(favouriteItem);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll(".remove-favourite-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                removeFromFavourites(index);
            });
        });
    }

    function removeFromFavourites(index) {
        favourites.splice(index, 1);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        location.reload(); // Refresh the page to update the favourites display
    }
});