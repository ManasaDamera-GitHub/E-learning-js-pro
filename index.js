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
// conatiner 3
document.addEventListener("DOMContentLoaded", function () {
    const cont3 = document.querySelector("#cont3");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    cont3.classList.add("show"); // Add the class when visible
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    observer.observe(cont3);
});

const searchBar = document.getElementById('searchBar');
const resultList = document.getElementById('result');
const container = document.getElementById("container");



async function fetchData() {
    window.addEventListener('load', function () {
        // Hide the loader when the page is fully loaded
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    });
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
        <p style="color:#987070"><strong>${obj.title}</strong></p>
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
document.querySelectorAll(".get").forEach(get =>
    get.addEventListener("click", () => {
        // Create a toast message element
        const toast = document.createElement("div");
        toast.textContent = "Please login...!";
        toast.style.position = "fixed";
        toast.style.top = "100px";
        toast.style.right = "20px";
        toast.style.backgroundColor = "#61605d";
        toast.style.color = "#fff";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        toast.style.zIndex = "1000";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s ease";

        // Append the toast to the body
        document.body.appendChild(toast);

        // Fade in the toast
        setTimeout(() => {
            toast.style.opacity = "1";
        }, 100);

        // Fade out and remove the toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500); // Wait for the fade-out transition to complete
        }, 3000);
    })
);
// Dropdown content
// document.addEventListener("DOMContentLoaded", function () {
//     const pages = document.getElementById("pages");
//     const dropdown = document.getElementById("dropdownMenu");

//     pages.addEventListener("click", function (event) {
//         dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//         event.stopPropagation();//prevent click from closing immediately
//     });
//     document.addEventListener("click", function () {
//         dropdown.style.display = "none";//hide dropdown when clicking outside
//     });
//     document.addEventListener("click", function (event) {
//         event.stopPropagation();//keep dropdown open when clicking inside
//     });

// })




fetchData();


window.onload = () => {
    landingPage()
    fetchData()
    displayData()
}
