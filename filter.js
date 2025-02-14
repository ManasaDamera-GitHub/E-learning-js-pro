const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('result');
const container = document.getElementById("container");
const loader = document.getElementById("loader"); // Get the loader element

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

// Function to display data
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
            `;
            div2.appendChild(item);
            container.appendChild(div2);
        });
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

fetchData(); // Initial data fetch