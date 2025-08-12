// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeQpWWL9G3qg6N_j0ZRy1LdzYIWQ-eQqM",
    authDomain: "online-art-gallery-75f53.firebaseapp.com",
    projectId: "online-art-gallery-75f53",
    storageBucket: "online-art-gallery-75f53.appspot.com",
    messagingSenderId: "653464446865",
    appId: "1:653464446865:web:42cc3985b39307b0ff1c30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch carousel data dynamically
document.addEventListener('DOMContentLoaded', async function () {
    const carouselInner = document.querySelector('.carousel-inner');

    async function fetchCarouselData() {
        const dbRef = ref(db);
        try {
            const snapshot = await get(child(dbRef, 'carouselItems'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.keys(data).forEach((key, index) => {
                    const item = data[key];
                    const div = document.createElement('div');
                    div.classList.add('carousel-item');
                    if (index === 0) div.classList.add('active'); // Set the first item as active
                    div.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.altText}" class="review-image">
                        <p>"${item.review}"</p>
                        <p>- ${item.reviewer}</p>
                    `;
                    carouselInner.appendChild(div);
                });
            } else {
                console.log("No data available for carousel items.");
            }
        } catch (error) {
            console.error("Error fetching carousel data:", error);
        }
    }

    await fetchCarouselData();

    // Automatically cycle through carousel items
    let currentIndex = 0;
    const totalItems = document.querySelectorAll('.carousel-item').length;

    setInterval(() => {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach((item) => item.classList.remove('active'));
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.add('active');
    }, 2000);
 });

// Shopping Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartLink = document.createElement('div');
    cartLink.id = "cart-link";
    cartLink.textContent = `Cart (0)`;
    document.body.appendChild(cartLink); // Adding the cart count outside of the navbar

    // Add item to cart on "Buy Now" click
    document.querySelectorAll('.artwork-detail form').forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form from navigating away

            const artworkSection = form.closest('.artwork-detail');
            const title = artworkSection.querySelector('h1').textContent;
            const price = artworkSection.querySelector('p[id^="artwork-price"]').textContent;
            const quantity = parseInt(form.querySelector('input[name="quantity"]').value, 10);

            // Add the item to the cart
            const item = { title, price, quantity };
            cart.push(item);

            // Update cart count
            cartLink.textContent = `Cart (${cart.length})`;
            alert('Item added to cart!');
        });
    });
});
