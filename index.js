// for background image
window.addEventListener("scroll", function () {
    const cont1 = document.getElementById("cont1");
    const body = document.body;

    // Get the height of #cont1
    const cont1Height = cont1.offsetHeight;

    // Check if the user has scrolled past #cont1
    if (window.scrollY > cont1Height) {
        body.style.backgroundImage = "none"; // Remove background image
    } else {
        body.style.backgroundImage = 'url("./img7.jpg")'; // Restore background image
    }
});


const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('result');
const container = document.getElementById("container");

async function fetchData() {
    // let response = await fetch("https://large-necessary-quesadilla.glitch.me/courses");
    let response = await fetch("https://harsh-hospitable-turnip.glitch.me/courses");
    let data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    displayData(data); // Display all data initially
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
            // item.classList.add(""); 
            //     item.innerHTML = `
            //     <img src="${obj.pic}" alt="${obj.title}" >
            //     <p><strong>${obj.title}</strong></p>
            //     <p>${obj.description}</p>
            //     <p>Price: ${obj.price}</p>
            //     <p>Category: ${obj.category}</p>
            // `;
            item.innerHTML = `
         <img src="${obj.pic}" alt="${obj.title}" >
        <p><strong>${obj.title}</strong></p>
        <p class="get">READ MORE</p>
        `
            div2.appendChild(item);
            container.appendChild(div2)
        });
    }
}

function login() {
    alert("Redirecting to Login Page...");
    window.location.href = './login.html'
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

// Select all elements with class "get"
document.querySelectorAll(".get").forEach(get => {
    get.addEventListener("click", function () {

        alert("You're just one step away! Log in to unlock the full course.");

        // You can redirect the user to a course page or take other actions
        // window.location.href = "course-details.html";  // Example redirect
    });
});
// Dropdown content
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.getElementById("pages");
    const dropdown = document.getElementById("dropdownMenu");

    pages.addEventListener("click", function (event) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        event.stopPropagation();//prevent click from closing immediately
    });
    document.addEventListener("click", function () {
        dropdown.style.display = "none";//hide dropdown when clicking outside
    });
    document.addEventListener("click", function (event) {
        event.stopPropagation();//keep dropdown open when clicking inside
    });

})




fetchData();


window.onload = () => {
    landingPage()
    fetchData()
    displayData()
}
