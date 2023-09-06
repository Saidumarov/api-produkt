// let div = document.querySelector("body");
// let ui = "";
// const Token = "https://dummyjson.com/products";

// async function getData() {
//   const data = await fetch(Token).then((res) => res.json());
//   let products = data.products;
//   for (let i = 0; i < 20; i++) {
//     ui += `<p>${products[i].title}</p>
// <img src="${products.imgs}" alt="">

//     `;
//   }

//   div.innerHTML = ui;
// }

// getData();

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then(console.log);

let div = document.querySelector("#product-list");
let modal = document.querySelector("#modal ");
let modal1 = document.querySelector(".modal-xarid");
let modalContent = document.querySelector("#modal-content");
let modalContent1 = document.querySelector(".modal-itme");

let ui = "";
const Token = "https://dummyjson.com/products";
let data;

// Mahsulotlarni saqlash uchun savat ro'yxati
let cart = [];

async function openModal(imageUrl, title, brand, price, description) {
  modalContent.innerHTML = `  
     <button class="svg" onclick="ok()">
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-test-id="button__close-sidebar"
    class="close"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L10.9393 12L5.21967 17.7197C4.92678 18.0126 4.92678 18.4874 5.21967 18.7803C5.51256 19.0732 5.98744 19.0732 6.28033 18.7803L12 13.0607L17.7197 18.7803C18.0126 19.0732 18.4874 19.0732 18.7803 18.7803C19.0732 18.4874 19.0732 18.0126 18.7803 17.7197L13.0607 12L18.7803 6.28033C19.0732 5.98744 19.0732 5.51256 18.7803 5.21967C18.4874 4.92678 18.0126 4.92678 17.7197 5.21967L12 10.9393L6.28033 5.21967Z"
    ></path>
  </svg>
</button>  <img src="${imageUrl}" alt="${title}">
     <div class="ul"> <p>${title}</p> <p>Brand:${brand}</p> <p>Narx:${price}$ </p></div> <p class="dis">${description}</p>
     
     `;
  modal.style.display = "block";
}

async function getProducts(filterType, filterValue) {
  if (!data) {
    data = await fetch(Token).then((res) => res.json());
  }

  let products = data.products;
  let filteredProducts = [];

  if (filterType === "all") {
    filteredProducts = products;
  } else if (filterType === "category") {
    filteredProducts = products.filter(
      (product) => product.category === filterValue
    );
  }

  ui = "";

  for (let i = 0; i < filteredProducts.length && i < 20; i++) {
    const product = filteredProducts[i];

    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      const firstImage = product.images[0];
      ui += `<div class="product-item"  onclick="openModal('${firstImage}', '${product.title}', '${product.brand}'
              , '${product.price}' , '${product.description}')"> 
                          <img src="${firstImage}" alt="${product.title}">
                          <p>${product.title}</p>
                          <button class="add-to-cart">Savatga qo'shish</button>
                          
                      </div>`;
    }
  }

  div.innerHTML = ui;
}

modal.addEventListener("click", function (e) {
  if (e.target === modal || e.target.classList.contains("modal-content")) {
    modal.style.display = "none";
  }
});
modal1.addEventListener("click", function (e) {
  if (e.target === modal1 || e.target.classList.contains("modal-itme")) {
    modal1.style.display = "none";
  }
});

function ok() {
  modal.style.display = "none"
  modal1.style.display = "none"

}


// "Savatga o'tish" tugmasini bosganda savat ro'yxatini chiqarish
const cartButton = document.querySelector("#cart-button");
cartButton.addEventListener("click", function () {
  showCart();
});

// "Savatga qo'shish" tugmasini bosganda mahsulotni savatga qo'shish
div.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const productItem = e.target.closest(".product-item");
    const imageUrl = productItem.querySelector("img").getAttribute("src");
    const title = productItem.querySelector("p").textContent;

    addToCart(imageUrl, title);
  }
});

// Savatga mahsulot qo'shish
function addToCart(imageUrl, title) {
  const cartItem = { imageUrl, title };
  cart.push(cartItem);
  updateCartItemCount();
  modal.style.display = "none";
}

// Savatdagi mahsulotlar sonini yangilash
function updateCartItemCount() {
  const cartCount = document.querySelector("#cart-count");
  cartCount.textContent = cart.length.toString();
}

// Savat ro'yxatini chiqarish
function showCart() {
  let cartItems = "";
  for (const item of cart) {
    cartItems += `
          <div class="xarid">
                          <img src="${item.imageUrl}" alt="${item.title}">
                          <p>${item.title}</p>
                     </div>  `;
  }
  modalContent1.innerHTML = cartItems;
  modal1.style.display = "block";
}

// Sahifani yuklanganda barcha mahsulotlarni ko'rsatish
window.addEventListener("load", function () {
  getProducts("all", "");
});
