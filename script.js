
/* =========================================
   LITERARY LOVE - COMPLETE JAVASCRIPT
   Premium Online Bookstore
========================================= */


/* =========================================
   1. BOOK DATA
========================================= */

const books = [

    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 1200,
        image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
        description: "A beautiful story about dreams, hope and discovering your destiny."
    },

    {
        id: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        price: 950,
        image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        description: "A classic novel about love, family, relationships and society."
    },

    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        price: 1500,
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        description: "Learn how small habits can create positive changes in your life."
    },

    {
        id: 4,
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 1800,
        image: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
        description: "An exciting magical adventure full of friendship and mystery."
    },

    {
        id: 5,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        price: 1400,
        image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
        description: "Understand how people think about money and financial decisions."
    },

    {
        id: 6,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        price: 1300,
        image: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
        description: "Learn about financial education, saving and money management."
    },

    {
        id: 7,
        title: "It Ends With Us",
        author: "Colleen Hoover",
        category: "Romance",
        price: 1100,
        image: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
        description: "A contemporary novel about relationships and difficult choices."
    },

    {
        id: 8,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        category: "Self Help",
        price: 1250,
        image: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
        description: "Explore the importance of goals, determination and success."
    },

    {
        id: 9,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 1000,
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        description: "A classic story about ambition, wealth and dreams."
    },

    {
        id: 10,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Computer",
        price: 2200,
        image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
        description: "Learn the principles of writing clean and understandable code."
    },

    {
        id: 11,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        price: 1600,
        image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
        description: "Explore fascinating ideas about the universe, space and time."
    },

    {
        id: 12,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "History",
        price: 1700,
        image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
        description: "Discover the history of humanity and the development of civilization."
    }

];


/* =========================================
   2. LOCAL STORAGE
========================================= */

function getSavedData(key) {

    try {

        const data = JSON.parse(localStorage.getItem(key));

        return data ?? [];

    } catch (error) {

        return [];

    }

}


function saveData(key, data) {

    localStorage.setItem(key, JSON.stringify(data));

}


/* =========================================
   3. GENERAL VARIABLES
========================================= */

let cart = getSavedData("bookstoreCart");

let wishlist = getSavedData("bookstoreWishlist");

let selectedCategory = "All";

let searchText = "";

let selectedSort = "default";


cart = Array.isArray(cart)
    ? cart.map(item => ({
        id: Number(item.id ?? item.bookId),
        quantity: Math.max(1, Number(item.quantity ?? item.qty ?? 1))
    })).filter(item => books.some(book => book.id === item.id))
    : [];


wishlist = Array.isArray(wishlist)
    ? wishlist.map(item => Number(typeof item === "object" ? item.id : item))
        .filter(id => books.some(book => book.id === id))
    : [];


/* =========================================
   4. BOOK CARD DESIGN
========================================= */

function createBookCard(book) {

    const isFavourite = wishlist.includes(book.id);

    return `

        <div class="book-card">

            <img
                src="${book.image}"
                alt="${book.title}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/300x400/f0e7da/38251e?text=Literary+Love';">

            <h3>${book.title}</h3>

            <p>By ${book.author}</p>

            <p>Category: ${book.category}</p>

            <p class="price">
                Rs. ${book.price.toLocaleString("en-PK")}
            </p>

            <button onclick="showBookDetails(${book.id})">
                View Details
            </button>

            <button onclick="addToCart(${book.id})">
                🛒 Add to Cart
            </button>

            <button
                class="order-now-btn"
                onclick="buyNow(${book.id})">

                Buy Now

            </button>

            <button
                class="wishlist-btn"
                onclick="toggleWishlist(${book.id})">

                ${isFavourite ? "♥ Remove Wishlist" : "♡ Add to Wishlist"}

            </button>

        </div>

    `;

}


/* =========================================
   5. DISPLAY BOOKS
========================================= */

function displayBooks(bookList = books) {

    const container = document.getElementById("book-container");

    if (!container) return;

    if (bookList.length === 0) {

        container.innerHTML =
            '<p class="empty-message">No books found. Try another search!</p>';

        return;

    }

    container.innerHTML = bookList.map(createBookCard).join("");

}


/* =========================================
   6. SEARCH BOOKS
========================================= */

function searchBooks() {

    const input = document.getElementById("search-input");

    if (!input) return;

    searchText = input.value.trim();

    filterBooks();

}


/* =========================================
   7. SORT BOOKS
========================================= */

function sortBooks() {

    const select = document.getElementById("sort-books");

    if (!select) return;

    selectedSort = select.value;

    filterBooks();

}


/* =========================================
   8. FILTER BOOKS
========================================= */

function filterBooks(category) {

    if (category !== undefined) {

        selectedCategory = category;

    }

    let filteredBooks = [...books];


    if (selectedCategory !== "All") {

        if (selectedCategory === "Novels") {

            filteredBooks = filteredBooks.filter(book =>
                ["Fiction", "Romance", "Fantasy"].includes(book.category)
            );

        } else if (selectedCategory === "Education") {

            filteredBooks = filteredBooks.filter(book =>
                ["Computer", "Science", "History", "Self Help"].includes(book.category)
            );

        } else {

            filteredBooks = filteredBooks.filter(book =>
                book.category.toLowerCase() === selectedCategory.toLowerCase()
            );

        }

    }


    if (searchText !== "") {

        filteredBooks = filteredBooks.filter(book =>

            book.title.toLowerCase().includes(searchText.toLowerCase()) ||

            book.author.toLowerCase().includes(searchText.toLowerCase()) ||

            book.category.toLowerCase().includes(searchText.toLowerCase())

        );

    }


    if (selectedSort === "low-high") {

        filteredBooks.sort((a, b) => a.price - b.price);

    } else if (selectedSort === "high-low") {

        filteredBooks.sort((a, b) => b.price - a.price);

    } else if (selectedSort === "name") {

        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));

    }


    displayBooks(filteredBooks);

}


/* =========================================
   9. SEARCH AND SORT EVENTS
========================================= */

const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", searchBooks);

}


const sortSelect = document.getElementById("sort-books");

if (sortSelect) {

    sortSelect.addEventListener("change", sortBooks);

}


/* =========================================
   10. CATEGORY CARDS
========================================= */

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", function () {

        const category = this.textContent
            .replace(/[^\w\s]/g, "")
            .trim();

        selectedCategory = category;

        searchText = "";

        if (searchInput) {

            searchInput.value = "";

        }

        if (sortSelect) {

            sortSelect.value = "default";

            selectedSort = "default";

        }

        filterBooks(category);

        document.getElementById("books").scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================
   11. BEST SELLERS
========================================= */

function displayBestSellers() {

    const container =
        document.getElementById("best-sellers-container");

    if (!container) return;

    const bestSellers = books.filter(book =>
        [1, 2, 3, 4].includes(book.id)
    );

    container.innerHTML = bestSellers.map(createBookCard).join("");

}


/* =========================================
   12. NEW ARRIVALS
========================================= */

function displayNewArrivals() {

    const container =
        document.getElementById("new-arrivals-container");

    if (!container) return;

    const newArrivals = books.filter(book =>
        [9, 10, 11, 12].includes(book.id)
    );

    container.innerHTML = newArrivals.map(createBookCard).join("");

}


/* =========================================
   13. ADD TO CART
========================================= */

function addToCart(bookId) {

    const book = books.find(item => item.id === Number(bookId));

    if (!book) return;

    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: book.id,
            quantity: 1
        });

    }

    saveData("bookstoreCart", cart);

    updateCart();

    alert(book.title + " added to your cart!");

}


/* =========================================
   14. BUY NOW
========================================= */

function buyNow(bookId) {

    const book = books.find(item => item.id === Number(bookId));

    if (!book) return;

    cart = [{
        id: book.id,
        quantity: 1
    }];

    saveData("bookstoreCart", cart);

    updateCart();

    const checkout = document.getElementById("checkout-section");

    if (checkout) {

        checkout.style.display = "block";

        updateCheckoutSummary();

        checkout.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   15. UPDATE CART
========================================= */

function updateCart() {

    const cartContainer = document.getElementById("cart-items");

    const totalElement = document.getElementById("cart-total");

    const cartCount = document.getElementById("cart-count");

    let total = 0;


    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }


    if (cartContainer) {

        if (cart.length === 0) {

            cartContainer.innerHTML =
                '<p class="empty-message">Your cart is empty. Start exploring books!</p>';

        } else {

            cartContainer.innerHTML = cart.map(item => {

                const book = books.find(b => b.id === item.id);

                if (!book) return "";

                const subtotal = book.price * item.quantity;

                total += subtotal;

                return `

                    <div class="cart-item">

                        <div>

                            <h3>${book.title}</h3>

                            <p>Price: Rs. ${book.price.toLocaleString("en-PK")}</p>

                            <p>Subtotal: Rs. ${subtotal.toLocaleString("en-PK")}</p>

                        </div>

                        <div>

                            <button onclick="changeQuantity(${book.id}, -1)">−</button>

                            <strong>${item.quantity}</strong>

                            <button onclick="changeQuantity(${book.id}, 1)">+</button>

                            <button onclick="removeFromCart(${book.id})">Remove</button>

                        </div>

                    </div>

                `;

            }).join("");

        }

    }


    if (totalElement) {

        totalElement.textContent = total.toLocaleString("en-PK");

    }

    saveData("bookstoreCart", cart);

    updateCheckoutSummary();

}


/* =========================================
   16. CHANGE QUANTITY
========================================= */

function changeQuantity(bookId, amount) {

    const item = cart.find(item => item.id === Number(bookId));

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== Number(bookId));

    }

    saveData("bookstoreCart", cart);

    updateCart();

}


/* =========================================
   17. REMOVE FROM CART
========================================= */

function removeFromCart(bookId) {

    cart = cart.filter(item => item.id !== Number(bookId));

    saveData("bookstoreCart", cart);

    updateCart();

}


/* =========================================
   18. SHOW CART
========================================= */

function showCart() {

    const cartSection = document.getElementById("cart-section");

    if (cartSection) {

        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }

    updateCart();

}


/* =========================================
   19. WISHLIST
========================================= */

function toggleWishlist(bookId) {

    bookId = Number(bookId);

    if (wishlist.includes(bookId)) {

        wishlist = wishlist.filter(id => id !== bookId);

        alert("Book removed from wishlist!");

    } else {

        wishlist.push(bookId);

        alert("Book added to wishlist!");

    }

    saveData("bookstoreWishlist", wishlist);

    displayWishlist();

    displayBooks(books.filter(book =>
        selectedCategory === "All" ||
        selectedCategory === "Novels" &&
        ["Fiction", "Romance", "Fantasy"].includes(book.category) ||
        selectedCategory === "Education" &&
        ["Computer", "Science", "History", "Self Help"].includes(book.category) ||
        book.category.toLowerCase() === selectedCategory.toLowerCase()
    ).filter(book =>
        !searchText ||
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase()) ||
        book.category.toLowerCase().includes(searchText.toLowerCase())
    ));

    displayBestSellers();

    displayNewArrivals();

}


/* =========================================
   20. DISPLAY WISHLIST
========================================= */

function displayWishlist() {

    const container =
        document.getElementById("wishlist-container");

    if (!container) return;

    if (wishlist.length === 0) {

        container.innerHTML =
            '<p class="empty-message">Your wishlist is empty!</p>';

        return;

    }

    const wishlistBooks = books.filter(book =>
        wishlist.includes(book.id)
    );

    container.innerHTML = wishlistBooks.map(createBookCard).join("");

}


/* =========================================
   21. CHECKOUT SUMMARY
========================================= */

function updateCheckoutSummary() {

    const summary = document.getElementById("checkout-summary");

    const totalElement = document.getElementById("checkout-total");

    let total = 0;

    if (summary) {

        if (cart.length === 0) {

            summary.innerHTML = "<p>No books selected.</p>";

        } else {

            summary.innerHTML = cart.map(item => {

                const book = books.find(b => b.id === item.id);

                if (!book) return "";

                const subtotal = book.price * item.quantity;

                total += subtotal;

                return `

                    <p>
                        ${book.title} × ${item.quantity}
                        = Rs. ${subtotal.toLocaleString("en-PK")}
                    </p>

                `;

            }).join("");

        }

    } else {

        cart.forEach(item => {

            const book = books.find(b => b.id === item.id);

            if (book) {

                total += book.price * item.quantity;

            }

        });

    }

    if (totalElement) {

        totalElement.textContent = total.toLocaleString("en-PK");

    }

}


/* =========================================
   22. PROCEED TO CHECKOUT
========================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add books to your cart first!");

        return;

    }

    const checkout = document.getElementById("checkout-section");

    if (checkout) {

        checkout.style.display = "block";

        updateCheckoutSummary();

        checkout.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================
   23. CONFIRM ORDER - COD
========================================= */

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        const name =
            document.getElementById("customer-name").value.trim();

        const phone =
            document.getElementById("customer-phone").value.trim();

        const email =
            document.getElementById("customer-email").value.trim();

        const city =
            document.getElementById("customer-city").value.trim();

        const address =
            document.getElementById("customer-address").value.trim();

        if (!name || !phone || !email || !city || !address) {

            alert("Please fill all required fields!");

            return;

        }

        const total = cart.reduce((sum, item) => {

            const book = books.find(b => b.id === item.id);

            return sum + (book ? book.price * item.quantity : 0);

        }, 0);

        const orderItems = cart.map(item => {

            const book = books.find(b => b.id === item.id);

            return book ? `${book.title} × ${item.quantity}` : "";

        }).filter(Boolean).join(", ");

        alert(

            "Thank you, " + name + "!\n\n" +

            "Your demo order has been placed successfully.\n\n" +

            "Books: " + orderItems + "\n" +

            "Total: Rs. " + total.toLocaleString("en-PK") + "\n" +

            "Payment: Cash on Delivery (COD)"

        );

        cart = [];

        saveData("bookstoreCart", cart);

        updateCart();

        checkoutForm.reset();

        const checkout =
            document.getElementById("checkout-section");

        if (checkout) {

            checkout.style.display = "none";

        }

        showCart();

    });

}


/* =========================================
   24. BOOK DETAILS MODAL
========================================= */

function showBookDetails(bookId) {

    const book = books.find(item => item.id === Number(bookId));

    if (!book) return;

    const modal = document.getElementById("book-details-modal");

    if (!modal) return;

    document.getElementById("detail-image").src = book.image;

    document.getElementById("detail-image").alt = book.title;

    document.getElementById("detail-name").textContent = book.title;

    document.getElementById("detail-category").textContent =
        "By " + book.author + " | " + book.category;

    document.getElementById("detail-price").textContent =
        "Rs. " + book.price.toLocaleString("en-PK");

    document.getElementById("detail-description").textContent =
        book.description;

    const cartButton =
        document.getElementById("detail-cart-button");

    if (cartButton) {

        cartButton.onclick = function () {

            addToCart(book.id);

            closeBookDetails();

        };

    }

    modal.style.display = "flex";

}


function closeBookDetails() {

    const modal = document.getElementById("book-details-modal");

    if (modal) {

        modal.style.display = "none";

    }

}


/* =========================================
   25. LOGIN MODAL
========================================= */

function openLogin() {

    const modal = document.getElementById("login-modal");

    if (modal) {

        closeAuth();

        modal.style.display = "flex";

    }

}


/* =========================================
   26. SIGNUP MODAL
========================================= */

function openSignup() {

    const modal = document.getElementById("signup-modal");

    if (modal) {

        closeAuth();

        modal.style.display = "flex";

    }

}


/* =========================================
   27. CLOSE AUTH MODALS
========================================= */

function closeAuth() {

    const loginModal = document.getElementById("login-modal");

    const signupModal = document.getElementById("signup-modal");

    if (loginModal) {

        loginModal.style.display = "none";

    }

    if (signupModal) {

        signupModal.style.display = "none";

    }

}


/* =========================================
   28. SIGNUP
========================================= */

function signupUser() {

    const name =
        document.getElementById("signup-name").value.trim();

    const email =
        document.getElementById("signup-email").value.trim();

    const password =
        document.getElementById("signup-password").value;

    if (!name || !email || !password) {

        alert("Please fill all signup fields!");

        return;

    }

    if (password.length < 6) {

        alert("Password must contain at least 6 characters!");

        return;

    }

    const existingUser = getSavedData("bookstoreUser");

    if (
        !Array.isArray(existingUser) &&
        existingUser.email === email
    ) {

        alert("This email is already registered!");

        return;

    }

    const user = {

        name: name,

        email: email,

        password: password

    };

    saveData("bookstoreUser", user);

    alert("Welcome to Literary Love! Signup successful.");

    document.getElementById("signup-form").reset();

    closeAuth();

    openLogin();

}


/* =========================================
   29. LOGIN
========================================= */

function loginUser() {

    const email =
        document.getElementById("login-email").value.trim();

    const password =
        document.getElementById("login-password").value;

    const savedUser = getSavedData("bookstoreUser");

    if (

        !savedUser ||

        Array.isArray(savedUser) ||

        savedUser.email !== email ||

        savedUser.password !== password

    ) {

        alert("Incorrect email or password!");

        return;

    }

    saveData("loggedInUser", {

        name: savedUser.name,

        email: savedUser.email

    });

    alert("Login successful! Welcome to Literary Love.");

    document.getElementById("login-form").reset();

    closeAuth();

    updateAuthUI();

}


/* =========================================
   30. LOGIN AND SIGNUP FORM EVENTS
========================================= */

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        loginUser();

    });

}


const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        signupUser();

    });

}


/* =========================================
   31. UPDATE USER INTERFACE
========================================= */

function updateAuthUI() {

    const user = getSavedData("loggedInUser");

    const welcome = document.getElementById("welcome-user");

    const loginButton = document.getElementById("login-nav-btn");

    const signupButton = document.getElementById("signup-nav-btn");

    const logoutButton = document.getElementById("logout-btn");

    const isLoggedIn =
        user && !Array.isArray(user) && user.name;

    if (welcome) {

        welcome.textContent = isLoggedIn
            ? "Welcome, " + user.name
            : "";

    }

    if (loginButton) {

        loginButton.style.display =
            isLoggedIn ? "none" : "inline-block";

    }

    if (signupButton) {

        signupButton.style.display =
            isLoggedIn ? "none" : "inline-block";

    }

    if (logoutButton) {

        logoutButton.style.display =
            isLoggedIn ? "inline-block" : "none";

    }

}


/* =========================================
   32. LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem("loggedInUser");

    updateAuthUI();

    alert("You have logged out successfully!");

}


/* =========================================
   33. CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contact-name").value.trim();

        if (!name) {

            alert("Please enter your name!");

            return;

        }

        alert(

            "Thank you, " + name +

            "! Your message has been received in this demo website."

        );

        contactForm.reset();

    });

}


/* =========================================
   34. CLOSE MODALS OUTSIDE CLICK
========================================= */

document.querySelectorAll(".auth-modal, .book-modal").forEach(modal => {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    });

});


/* =========================================
   35. INITIALIZE WEBSITE
========================================= */

function initializeBookstore() {

    displayBooks();

    displayBestSellers();

    displayNewArrivals();

    displayWishlist();

    updateCart();

    updateCheckoutSummary();

    updateAuthUI();

}


initializeBookstore();


/* =========================================
   END OF LITERARY LOVE JAVASCRIPT
========================================= */
