// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCeQpWWL9G3qg6N_j0ZRy1LdzYIWQ-eQqM",
//     authDomain: "online-art-gallery-75f53.firebaseapp.com",
//     projectId: "online-art-gallery-75f53",
//     storageBucket: "online-art-gallery-75f53.appspot.com",
//     messagingSenderId: "653464446865",
//     appId: "1:653464446865:web:42cc3985b39307b0ff1c30"
// };


const items = document.querySelectorAll('.carousel-item');
let currentItem = 0;
const autoRotateInterval = 2000; // Auto rotate every 2 seconds

function updateCarousel() {
    const offset = -currentItem * 100;
    items.forEach(item => {
        item.style.transform = `translateX(${offset}%)`;
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentItem = (currentItem + 1) % items.length;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentItem = (currentItem - 1 + items.length) % items.length;
    updateCarousel();
});

setInterval(() => {
    currentItem = (currentItem + 1) % items.length;
    updateCarousel();
}, autoRotateInterval);

document.querySelector('.logo').addEventListener('click', () => {
    const logo = document.querySelector('.logo');
    logo.style.color = 'yellow';
});



