let input3 = document.getElementById("admin");
let input4 = document.getElementById("password");
let adminError = document.getElementById("adminError");
let passwordError = document.getElementById("passwordError");

document.getElementById("adminlogin").addEventListener("submit", (event) => {
    if (input3.value === '') {
        input3.classList.add("error");
        adminError.innerHTML = `<i style="color: red">Username required</i>`;
        event.preventDefault();
    } else {
        adminError.innerHTML = ``;
        input3.classList.remove("error");
    }
    if (input4.value === '') {
        input4.classList.add("error");
        passwordError.innerHTML = `<i style="color: red">password required</i>`;
        event.preventDefault();
    }
    else {
        passwordError.innerHTML = ``;
        input4.classList.remove("error");
    }
}
)


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNKDC9Mn4Ze9W7XCSxNPhfqtOP36S0ghE",
    authDomain: "admin-5e137.firebaseapp.com",
    projectId: "admin-5e137",
    storageBucket: "admin-5e137.firebasestorage.app",
    messagingSenderId: "521995396631",
    appId: "1:521995396631:web:e8e4e71cbfcf673db4de52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleAdminLogin = document.getElementById("google-admin-login-btn");
googleAdminLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            window.location.href = "./admin.html"
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.error("Google Login Error: ", error)
        });
})
