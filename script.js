/* =========================================
   BOOK DATA
========================================= */

const books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 1200,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        price: 1500,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        price: 1400,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 4,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        price: 1600,
        image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 5,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        category: "Motivation",
        price: 1100,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 6,
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen Covey",
        category: "Self Help",
        price: 1800,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 7,
        title: "Ikigai",
        author: "Hector Garcia",
        category: "Lifestyle",
        price: 1300,
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: 8,
        title: "The Power of Now",
        author: "Eckhart Tolle",
        category: "Spirituality",
        price: 1250,
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80"
    }
];


/* =========================================
   CART ARRAY
========================================= */

let cart = [];


/* =========================================
   DOM ELEMENTS
========================================= */

// getElementById()

const booksContainer =
    document.getElementById("books-container");

const cartCount =
    document.getElementById("cart-count");

const cartContainer =
    document.getElementById("cart-container");

const cartTotal =
    document.getElementById("cart-total");

const emptyCartMessage =
    document.getElementById("empty-cart-message");

const clearCartBtn =
    document.getElementById("clear-cart-btn");

const darkModeBtn =
    document.getElementById("dark-mode-btn");

const menuBtn =
    document.getElementById("menu-btn");

const navLinks =
    document.getElementById("nav-links");

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");


/* =========================================
   querySelector()
========================================= */

const searchInput =
    document.querySelector("#search");

const searchButton =
    document.querySelector("#search-btn");

const cartButton =
    document.querySelector("#cart-btn");


/* =========================================
   DISPLAY BOOKS
========================================= */

function displayBooks(bookList) {

    // innerHTML

    booksContainer.innerHTML = "";

    if (bookList.length === 0) {

        booksContainer.innerHTML = `
            <p class="no-books">
                No books found.
            </p>
        `;

        return;
    }


    // Loop

    bookList.forEach(function (book) {

        // Template literal

        booksContainer.innerHTML += `

            <div class="book-card">

                <div class="book-image">

                    <img
                        src="${book.image}"
                        alt="${book.title}">

                </div>

                <div class="book-info">

                    <span class="book-category">
                        ${book.category}
                    </span>

                    <h3>
                        ${book.title}
                    </h3>

                    <p class="book-author">
                        By ${book.author}
                    </p>

                    <div class="book-bottom">

                        <span class="book-price">
                            Rs. ${book.price.toLocaleString()}
                        </span>

                        <button
                            class="add-cart"
                            data-id="${book.id}">

                            <i class="fa-solid fa-cart-plus"></i>
                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>
        `;
    });


    /* =====================================
       querySelectorAll()
    ===================================== */

    const buttons =
        document.querySelectorAll(".add-cart");


    /* =====================================
       forEach()
    ===================================== */

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const bookId =
                Number(button.dataset.id);

            addToCart(bookId);

        });

    });

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(bookId) {

    const selectedBook =
        books.find(function (book) {

            return book.id === bookId;

        });


    if (!selectedBook) {
        return;
    }


    const existingBook =
        cart.find(function (item) {

            return item.id === bookId;

        });


    if (existingBook) {

        existingBook.quantity++;

    } else {

        cart.push({

            ...selectedBook,

            quantity: 1

        });

    }


    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    // Calculate total quantity

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });


    // textContent

    cartCount.textContent =
        totalQuantity;


    displayCart();

}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        const message =
            document.createElement("p");

        message.id =
            "empty-cart-message";

        message.textContent =
            "Your cart is empty.";

        cartContainer.appendChild(message);

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function (item) {

        total +=
            item.price * item.quantity;


        cartContainer.innerHTML += `

            <div
                class="cart-item"
                data-id="${item.id}">

                <div class="cart-item-info">

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        Rs. ${item.price.toLocaleString()}
                    </p>

                </div>

                <div class="quantity">

                    Quantity:
                    ${item.quantity}

                </div>

                <div>

                    <strong>
                        Rs.
                        ${(item.price * item.quantity)
                            .toLocaleString()}
                    </strong>

                </div>

                <button
                    class="remove-btn"
                    data-id="${item.id}">

                    <i class="fa-solid fa-trash"></i>
                    Remove

                </button>

            </div>

        `;

    });


    // Total

    cartTotal.textContent =
        total.toLocaleString();


    /* =====================================
       querySelectorAll + forEach
    ===================================== */

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const bookId =
                Number(button.dataset.id);

            removeFromCart(bookId);

        });

    });

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(bookId) {

    cart =
        cart.filter(function (item) {

            return item.id !== bookId;

        });


    updateCart();

}


/* =========================================
   CLEAR CART
========================================= */

clearCartBtn.addEventListener(
    "click",
    function () {

        cart = [];

        cartCount.textContent = "0";

        cartTotal.textContent = "0";

        cartContainer.innerHTML = "";


        // createElement()

        const message =
            document.createElement("p");


        // classList.add()

        message.classList.add(
            "empty-cart-message"
        );


        // textContent

        message.textContent =
            "Your cart is empty.";


        // appendChild()

        cartContainer.appendChild(message);

    }
);


/* =========================================
   SEARCH FUNCTION
========================================= */

function searchBooks() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredBooks =
        books.filter(function (book) {

            return (
                book.title
                    .toLowerCase()
                    .includes(searchValue)

                ||

                book.author
                    .toLowerCase()
                    .includes(searchValue)
            );

        });


    displayBooks(filteredBooks);

}


/* =========================================
   SEARCH BUTTON CLICK
========================================= */

searchButton.addEventListener(
    "click",
    function () {

        searchBooks();

    }
);


/* =========================================
   INPUT EVENT
========================================= */

searchInput.addEventListener(
    "input",
    function () {

        searchBooks();

    }
);


/* =========================================
   DARK MODE
========================================= */

darkModeBtn.addEventListener(
    "click",
    function () {

        // classList.toggle()

        document.body.classList.toggle(
            "dark-mode"
        );


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            darkModeBtn.textContent =
                "☀️ Light Mode";

        } else {

            darkModeBtn.textContent =
                "🌙 Dark Mode";

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    function () {

        // classList.toggle()

        navLinks.classList.toggle(
            "active"
        );

    }
);


/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navItems.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            // classList.remove()

            navLinks.classList.remove(
                "active"
            );

        }
    );

});


/* =========================================
   CART BUTTON
========================================= */

cartButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("cart")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   CONTACT FORM
========================================= */

contactForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        /* =================================
           VALIDATION
        ================================= */

        if (
            name === "" ||
            email === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.style.color =
                "red";

            return;
        }


        /* =================================
           SUCCESS
        ================================= */

        formMessage.textContent =
            "Message sent successfully!";

        formMessage.style.color =
            "green";


        // Clear form

        contactForm.reset();

    }
);


/* =========================================
   INITIAL DISPLAY
========================================= */

displayBooks(books);

updateCart();