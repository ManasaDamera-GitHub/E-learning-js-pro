const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('result');
const container = document.getElementById("container");
const loader = document.getElementById("loader"); // Get the loader element
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

async function fetchData() {
    loader.style.display = "block"; // Show loader
    try {
        let response = await fetch("https://large-necessary-quesadilla.glitch.me/courses");
        let data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data);
        displayData(data); // Display all data initially
    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = "<p>Failed to load data. Please try again later.</p>";
    } finally {
        loader.style.display = "none"; // Hide loader
    }
}

function displayData(data) {
    container.innerHTML = ""; // Clear previous results

    if (data.length === 0) {
        container.innerHTML = "<p>No data available</p>";
    } else {
        data.forEach(obj => {
            let div2 = document.createElement("div");
            div2.classList.add("course-card");
            let item = document.createElement("div");
            item.innerHTML = `
                <img src="${obj.pic}" alt="${obj.title}">
                <p><strong>${obj.title}</strong></p>
                <p>${obj.description}</p>
                <p>Price: ${obj.price}</p>
                <p>Category: ${obj.category}</p>
                <button class="btn buy-btn">Buy</button>
                <button class="btn mycor-btn">add to Cart</button>
                <button class="btn heart-btn"><i class="far fa-heart"></i></button>
            `;
            div2.appendChild(item);
            container.appendChild(div2);

            // Add event listener to the "Cart" button
            const addToCartButton = div2.querySelector(".mycor-btn");
            addToCartButton.addEventListener("click", () => {
                addToCart(obj); // Add the course to the cart
            });

            // Add event listener to the "Favourites" button
            const addToFavouritesButton = div2.querySelector(".heart-btn");
            addToFavouritesButton.addEventListener("click", () => {
                addToFavourites(obj, addToFavouritesButton);
            });

            // Update the heart icon if the course is already in favourites
            if (favourites.some(item => item.title === obj.title)) {
                addToFavouritesButton.innerHTML = '<i class="fas fa-heart"></i>'; // Filled heart
                addToFavouritesButton.classList.add("active");
            }
        });
    }
}

// Function to add a course to the cart
function addToCart(course) {
    const confirmAdd = confirm(`Add "${course.title}" to cart?`);
    if (confirmAdd) {
        if (!cart.some(item => item.title === course.title)) {
            cart.push(course);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${course.title} added to cart!`);
        } else {
            alert(`${course.title} is already in the cart!`);
        }
    } else {
        alert("Action canceled.");
    }
}

// Function to remove a course from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}
// favourite buttons
function addToFavourites(course, button) {
    const confirmAdd = confirm(`Add "${course.title}" to favourites?`);
    if (confirmAdd) {
        const index = favourites.findIndex(item => item.title === course.title);

        if (index === -1) {
            // Add to favourites
            favourites.push(course);
            button.innerHTML = '<i class="fas fa-heart"></i>'; // Filled heart
            button.classList.add("active");
            alert(`${course.title} added to favourites!`);
        } else {
            // Remove from favourites
            favourites.splice(index, 1);
            button.innerHTML = '<i class="far fa-heart"></i>'; // Outline heart
            button.classList.remove("active");
            alert(`${course.title} removed from favourites!`);
        }

        localStorage.setItem("favourites", JSON.stringify(favourites));
    } else {
        alert("Action canceled.");
    }
}

// Event listener for search bar
searchBar.addEventListener("keyup", function () {
    let query = searchBar.value.toLowerCase();
    let data = JSON.parse(localStorage.getItem("data")) || [];

    let filteredData = data.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
    );

    displayData(filteredData);
});

// Theme toggle functionality
const toggleButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleButton.innerHTML = currentTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
} else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleButton.addEventListener("click", function () {
    let theme = document.documentElement.getAttribute("data-theme");

    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Typing container

const button = document.getElementById("textButton");
const texts = ["Learn HTML", "Learn CSS", "Learn JAVASCRIPT", "Learn PYTHON", "Learn JAVA",]; // Texts to loop through
let textIndex = 0; // Current text index
let charIndex = 0; // Current character index
let isDeleting = false; // Whether we're deleting text

function typeWriter() {
    const currentText = texts[textIndex];

    // If deleting, remove one character
    if (isDeleting) {
        button.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    }
    // If typing, add one character
    else {
        button.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // If the current text is fully typed
    if (!isDeleting && charIndex === currentText.length) {
        // Pause before starting to delete
        isDeleting = true;
        setTimeout(typeWriter, 1000); // Wait 1 second before deleting
    }
    // If the current text is fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(typeWriter, 10); // Wait 0.5 seconds before typing the next text
    }
    // Continue typing or deleting
    else {
        const typingSpeed = isDeleting ? 100 : 200; // Faster deletion, slower typing
        setTimeout(typeWriter, typingSpeed);
    }
}


// Start the typewriter effect
typeWriter();
fetchData(); // Initial data fetch

// const heart_btn = document.querySelector(".heart-btn");
// heart_btn.addEventListener("click", () => {
//     heart_btn.classList.toggle("Liked!");
// })