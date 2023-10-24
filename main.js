// Selectors
const preHeaderBtns = document.querySelectorAll(".pre-header .option button");
const allDropDowns = document.querySelectorAll(".pre-header .drop-down");
const countryDropDown = document.querySelector(
  ".pre-header .drop-down.country"
);
const currencyDropDown = document.querySelector(
  ".pre-header .drop-down.currency"
);
const languageDropDown = document.querySelector(
  ".pre-header .drop-down.language"
);
const header = document.querySelector("body>header");
const navCategoriesBtn = document.querySelector("nav .categories > button");
const menuOpenIcon = document.querySelector(".menu-container .open-menu");
const mainMenu = document.querySelector(".main-menu");
const mainMenuShowOptions = document.querySelectorAll(
  ".main-menu .show-options h3"
);
const mainMenuCategories = document.querySelector(".main-menu .categories");
const mainMenuLinks = document.querySelector(".main-menu .links");
const lightDarkToggle = document.getElementById("light-dark-toggle");
const scrollToTopBtn = document.getElementById("scroll-to-top-btn");
const userBtn = document.querySelector("header .user > a");
const signUpPopUp = document.querySelector(".sign-up-pop-up");
const signUpForms = document.querySelectorAll(".sign-up-pop-up form");
const signUpTelForm = document.querySelector(".sign-up-pop-up .tel-form");
const signUpAllInputs = document.querySelectorAll(".sign-up-pop-up input");
const signUpTelFormUNInput = document.querySelector(
  ".sign-up-pop-up .tel-form #un"
);
const signUpTelInput = document.querySelector(".sign-up-pop-up .tel-form #tel");
const signUpEmailForm = document.querySelector(".sign-up-pop-up .email-form");
const signUpEmailFormUNInput = document.querySelector(
  ".sign-up-pop-up .email-form #un2"
);
const signUpEmaiInput = document.querySelector(
  ".sign-up-pop-up .email-form #email"
);
const openCartBtn = document.querySelector("header .cart > a");
const cartProductsNum = document.querySelector("header .cart > a > span");
const cartList = document.querySelector("header .cart > .cart-list");
const cartEmptyAlertP = document.querySelector(
  "header .cart > .cart-list .empty-alert"
);
const cartListProducts = document.querySelector(
  "header .cart > .cart-list .cart-products"
);
const cartSubtotalPrice = document.querySelector(
  "header .cart > .cart-list .subtotal-price span"
);
const addToCartBtns = document.querySelectorAll(
  ".products .product .details > button"
);
const allPopUps = document.querySelectorAll(".pop-up");
const giftPopUp = document.querySelector(".pop-up.gift");
const downloadPopUp = document.querySelector(".pop-up.download-app");

let cartProductsArr = [];

// Check If There Are Productcts In The Local Storage
if (localStorage.getItem("cart products")) {
  cartProductsArr = JSON.parse(localStorage.getItem("cart products"));
}

// Open & Close The Pre-header Drop-Downs
preHeaderBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.nextElementSibling.classList.toggle("opened");
  });
});

// Get Pre-Header Data From Local Storage
getPreHeaderData();
// Get Main Menu Data From Local Storage
getMainMenuData();
// Get Website Mode From Local Storage
getWebsiteMode();
// Get Cart Products Data From Local Storage
getCartProductsFromLocalStorage();
// Get Cart Products Num From Local Storage
getCartProductsNumFromLocalStorage();
// Get Cart Subtotal Price Data From Local Storage
getSubtotalPriceData();

// Update Active Class To The Drop-Down Options
allDropDowns.forEach((dropDown) => {
  for (let i = 0; i < dropDown.children.length; i++) {
    let option = dropDown.children[i];
    option.addEventListener("click", function () {
      for (let j = 0; j < dropDown.children.length; j++) {
        dropDown.children[j].classList.remove("active");
      }
      option.classList.add("active");
      // Update The Content Of The Pre-Header Btn
      preHeaderBtnContentUpdate(option);
    });
  }
});

function preHeaderBtnContentUpdate(option) {
  option.parentElement.previousElementSibling.firstElementChild.textContent =
    option.textContent;
  // Add The Data To The Local Storage
  addCountryToLocalStorage();
  addCurrencyToLocalStorage();
  addLanguageToLocalStorage();
}

function addCountryToLocalStorage() {
  countryDropDown.addEventListener("click", function () {
    window.localStorage.setItem(
      "country",
      this.previousElementSibling.textContent
    );
  });
}

function addCurrencyToLocalStorage() {
  currencyDropDown.addEventListener("click", function () {
    window.localStorage.setItem(
      "currency",
      this.previousElementSibling.textContent
    );
  });
}

function addLanguageToLocalStorage() {
  languageDropDown.addEventListener("click", function () {
    window.localStorage.setItem(
      "language",
      this.previousElementSibling.textContent
    );
  });
}

function getPreHeaderData() {
  if (localStorage.getItem("country")) {
    countryDropDown.previousElementSibling.firstElementChild.textContent =
      localStorage.getItem("country");
    for (let i = 0; i < countryDropDown.children.length; i++) {
      let option = countryDropDown.children[i];
      if (option.textContent === localStorage.getItem("country").trim()) {
        for (let j = 0; j < countryDropDown.children.length; j++) {
          countryDropDown.children[j].classList.remove("active");
        }
        option.classList.add("active");
      }
    }
  }
  if (localStorage.getItem("currency")) {
    currencyDropDown.previousElementSibling.firstElementChild.textContent =
      localStorage.getItem("currency");
    for (let i = 0; i < currencyDropDown.children.length; i++) {
      let option = currencyDropDown.children[i];
      if (option.textContent === localStorage.getItem("currency").trim()) {
        for (let j = 0; j < currencyDropDown.children.length; j++) {
          currencyDropDown.children[j].classList.remove("active");
        }
        option.classList.add("active");
      }
    }
  }
  if (localStorage.getItem("language")) {
    languageDropDown.previousElementSibling.firstElementChild.textContent =
      localStorage.getItem("language");
    for (let i = 0; i < languageDropDown.children.length; i++) {
      let option = languageDropDown.children[i];
      if (option.textContent === localStorage.getItem("language").trim()) {
        for (let j = 0; j < languageDropDown.children.length; j++) {
          languageDropDown.children[j].classList.remove("active");
        }
        option.classList.add("active");
      }
    }
  }
}

// Header Sticky Class
window.addEventListener("scroll", function () {
  if (window.scrollY >= 300) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// User Sign-Up Pop-Up

// Open The Sign-Up Pop-Up
userBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.nextElementSibling.classList.add("opened");
  signUpLableActive();
});

// Close The Sign-Up Pop-Up
signUpPopUp.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-pop-up")) {
    this.classList.remove("opened");
  }
});

// Switch Between Forms
signUpTelForm.lastElementChild.addEventListener("click", function (e) {
  e.preventDefault();
  signUpEmailForm.style.display = "grid";
  signUpTelForm.style.display = "none";
});

signUpEmailForm.lastElementChild.addEventListener("click", function (e) {
  e.preventDefault();
  signUpTelForm.style.display = "grid";
  signUpEmailForm.style.display = "none";
});

// Sign-Up Label Active Class
function signUpLableActive() {
  signUpAllInputs.forEach((input) => {
    if (input.value !== "") {
      input.previousElementSibling.classList.add("active");
    } else {
      input.previousElementSibling.classList.remove("active");
    }
  });
}

// Sign-Up Pop-Up Forms Validation

// On Submit
signUpTelForm.addEventListener("submit", function (e) {
  userNameValidation(signUpTelFormUNInput);
  telValidation(signUpTelInput);
  // Prevent The Submition Of The Form
  if (
    signUpTelFormUNInput.parentElement.nextElementSibling.textContent !== "" ||
    signUpTelInput.parentElement.nextElementSibling.textContent !== ""
  ) {
    e.preventDefault();
  }
});

signUpEmailForm.addEventListener("submit", function (e) {
  userNameValidation(signUpEmailFormUNInput);
  emailValidation(signUpEmaiInput);
  // Prevent The Submition Of The Form
  if (
    signUpEmailFormUNInput.parentElement.nextElementSibling.textContent !==
      "" ||
    signUpEmaiInput.parentElement.nextElementSibling.textContent !== ""
  ) {
    e.preventDefault();
  }
});

// On Input
signUpTelFormUNInput.addEventListener("input", function () {
  userNameValidation(signUpTelFormUNInput);
  signUpLableActive();
});
signUpTelInput.addEventListener("input", function () {
  telValidation(signUpTelInput);
  signUpLableActive();
});
signUpEmailFormUNInput.addEventListener("input", function () {
  userNameValidation(signUpEmailFormUNInput);
  signUpLableActive();
});
signUpEmaiInput.addEventListener("input", function () {
  emailValidation(signUpEmaiInput);
  signUpLableActive();
});

// On Blur
signUpTelFormUNInput.addEventListener("blur", function () {
  userNameValidation(signUpTelFormUNInput);
  signUpLableActive();
});
signUpTelInput.addEventListener("blur", function () {
  telValidation(signUpTelInput);
  signUpLableActive();
});
signUpEmailFormUNInput.addEventListener("blur", function () {
  userNameValidation(signUpEmailFormUNInput);
  signUpLableActive();
});
signUpEmaiInput.addEventListener("blur", function () {
  emailValidation(signUpEmaiInput);
  signUpLableActive();
});

// Open The Cart List
openCartBtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.nextElementSibling.classList.add("opened");
  // Hide The Empty Alert P
  if (cartListProducts.children.length > 0) {
    hideCartEmptyAlertP();
  }
});

// Colse The Cart List
cartList.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-list")) {
    cartList.classList.remove("opened");
  }
});

// Delete Product Btn Events
cartList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-product")) {
    // Delete The Product From The Local Storage
    deleteProductFromLocalStorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
    decreasingCartProductsNum();
    // Show The Empty Alert P
    if (cartListProducts.children.length === 0) {
      showCartEmptyAlertP();
    }
    // Updating The Subtotal Price
    decreasingCastSubtotalPrice(e.target.nextElementSibling);
    // Removing Product Certinity Div
    createRemovingProductFromCartDiv();
  }
});

function deleteProductFromLocalStorage(productId) {
  cartProductsArr = cartProductsArr.filter(
    (product) => product.id != productId
  );
  addProductsToLocalStorage();
}

// Start The Adding Of The Product To The Cart List

// Add Product
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    addProductToArr(
      btn.parentElement.previousElementSibling.previousElementSibling
        .firstElementChild.src,
      btn.parentElement.firstElementChild.textContent,
      btn.previousElementSibling.firstElementChild.textContent, // old
      btn.previousElementSibling.lastElementChild.textContent // new
    );
    increasingCartProductsNum();
    // Hide The Empty Alert P
    hideCartEmptyAlertP();
    // Update Subtotal Price
    increasingCastSubtotalPrice(btn.previousElementSibling);
    // Adding Product Certinity Div
    createAddProductToCartDiv();
  });
});

function addProductToArr(imgURL, title, oldPrice, newPrice) {
  // Product Date
  const product = {
    id: cartProductsArr.length + 1,
    productImageSrc: imgURL,
    productName: title,
    productOldPrice: oldPrice,
    productNewPrice: newPrice,
  };
  // Push Product To To Arr
  cartProductsArr.push(product);
  // Add Products To The Page
  addProductsToPage();
  // Add Products To The Local Storage
  addProductsToLocalStorage();
}

function addProductsToPage() {
  // Empty The Cart List Products
  cartListProducts.innerHTML = "";
  // looping On Products Arr
  cartProductsArr.forEach((product) => {
    // Create The Product Div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-id", product.id);
    // Append The Product Div To The Cart List Products
    cartListProducts.append(productDiv);
    // Create The Image Box
    const imageBox = document.createElement("a");
    imageBox.innerHTML = `
      <img src=${product.productImageSrc} alt="${product.productName}" title="${product.productName}" />
    `;
    imageBox.classList.add("image");
    imageBox.href = "#";
    productDiv.append(imageBox);
    // Create The Details Box
    const detailsBox = document.createElement("div");
    detailsBox.innerHTML = `
      <a href="#" class="product-title">${product.productName}</a>
      <i class="fas fa-xmark delete-product"></i>
    `;
    detailsBox.classList.add("details");
    productDiv.append(detailsBox);
    // Create The Price Box
    const priceBox = document.createElement("div");
    if (product.productOldPrice !== product.productNewPrice) {
      priceBox.innerHTML = `
        <span class="old">${product.productOldPrice}</span>
        <span class="new">${product.productNewPrice}</span>
      `;
    } else {
      priceBox.innerHTML = `
        <span class="new">${product.productNewPrice}</span>
      `;
    }
    priceBox.classList.add("price");
    detailsBox.append(priceBox);
  });
}

function addProductsToLocalStorage() {
  window.localStorage.setItem("cart products", JSON.stringify(cartProductsArr));
}

function getCartProductsFromLocalStorage() {
  if (localStorage.getItem("cart products")) {
    addProductsToPage();
  }
}

function increasingCartProductsNum() {
  ~~cartProductsNum.textContent++;
  window.localStorage.setItem("cart-products-num", cartProductsNum.textContent);
}

function decreasingCartProductsNum() {
  ~~cartProductsNum.textContent--;
  window.localStorage.setItem("cart-products-num", cartProductsNum.textContent);
}

function getCartProductsNumFromLocalStorage() {
  if (localStorage.getItem("cart-products-num")) {
    cartProductsNum.textContent = localStorage.getItem("cart-products-num");
  }
}

// End The Adding Of The Product To The Cart List

function hideCartEmptyAlertP() {
  cartEmptyAlertP.style.display = "none";
}

function showCartEmptyAlertP() {
  cartEmptyAlertP.style.display = "block";
}

function increasingCastSubtotalPrice(priceDiv) {
  let price = parseInt(cartSubtotalPrice.textContent);
  for (let i = 0; i < priceDiv.children.length; i++) {
    if (priceDiv.children[i].classList.contains("new")) {
      price += parseInt(priceDiv.children[i].textContent);
    }
  }
  cartSubtotalPrice.textContent = `${price} ر.س`;
  storeSubtotalPriceInLocalStorage();
}

function decreasingCastSubtotalPrice(priceDiv) {
  let price = parseInt(cartSubtotalPrice.textContent);
  for (let i = 0; i < priceDiv.children.length; i++) {
    if (priceDiv.children[i].classList.contains("new")) {
      price -= parseInt(priceDiv.children[i].textContent);
    }
  }
  cartSubtotalPrice.textContent = `${price} ر.س`;
  storeSubtotalPriceInLocalStorage();
}

function storeSubtotalPriceInLocalStorage() {
  window.localStorage.setItem("subtotal-price", cartSubtotalPrice.textContent);
}

function getSubtotalPriceData() {
  if (localStorage.getItem("subtotal-price")) {
    cartSubtotalPrice.textContent = localStorage.getItem("subtotal-price");
  }
}

function createAddProductToCartDiv() {
  const addingDiv = document.createElement("div");
  addingDiv.innerHTML = `
    <h4><i class="fas fa-check-circle"></i> تمت اضافة المنتج للسلة بنجاح.</h4>
    <i class="fas fa-xmark remove"></i>
  `;
  addingDiv.classList.add("cirtinity-div", "add-to-cart");
  header.append(addingDiv);
  // Hide The addingDiv
  addingDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.classList.add("hidden");
    }
  });
  // Auto Hide The addingDiv
  setTimeout(function () {
    addingDiv.classList.add("hidden");
  }, 3000);
}

function createRemovingProductFromCartDiv() {
  const removingDiv = document.createElement("div");
  removingDiv.innerHTML = `
    <h4><i class="fas fa-xmark-circle"></i> تم حذف المنتج من السلة بنجاح.</h4>
    <i class="fas fa-xmark remove"></i>
  `;
  removingDiv.classList.add("cirtinity-div", "remove-from-cart");
  header.append(removingDiv);
  // Hide The removingDiv
  removingDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.classList.add("hidden");
    }
  });
  // Auto Hide The removingDiv
  setTimeout(function () {
    removingDiv.classList.add("hidden");
  }, 3000);
}

// Open & Close The Nav Categories List
navCategoriesBtn.addEventListener("click", function () {
  this.nextElementSibling.classList.toggle("opened");
});

// Open & Close The Main Menu
menuOpenIcon.addEventListener("click", function () {
  mainMenu.classList.add("opened");
});

mainMenu.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-menu")) {
    mainMenu.classList.remove("opened");
  }
});

// Update Main Menu Show Options Active Class
mainMenuShowOptions.forEach((option) => {
  option.addEventListener("click", function () {
    mainMenuShowOptions.forEach((option) => {
      option.classList.remove("active");
    });
    this.classList.add("active");
    if (option.textContent === "الفئات") {
      mainMenuCategories.style.display = "block";
      mainMenuLinks.style.display = "none";
    } else {
      mainMenuLinks.style.display = "block";
      mainMenuCategories.style.display = "none";
    }
    addMainMenuSelectedOptionToLocalStorage(option);
  });
});

function addMainMenuSelectedOptionToLocalStorage(option) {
  window.localStorage.setItem("main-menu-selected-option", option.textContent);
}

function getMainMenuData() {
  if (localStorage.getItem("main-menu-selected-option")) {
    mainMenuShowOptions.forEach((option) => {
      if (
        option.textContent === localStorage.getItem("main-menu-selected-option")
      ) {
        mainMenuShowOptions.forEach((option) => {
          option.classList.remove("active");
        });
        option.classList.add("active");
        if (option.textContent === "الفئات") {
          mainMenuCategories.style.display = "block";
          mainMenuLinks.style.display = "none";
        } else {
          mainMenuLinks.style.display = "block";
          mainMenuCategories.style.display = "none";
        }
      }
    });
  }
}

// Switch Light & Dark Mode
lightDarkToggle.addEventListener("click", function (e) {
  let element = e.target;
  if (element.tagName === "I" || element.tagName === "SPAN") {
    document.body.parentElement.classList.toggle("dark-mode");
    addWebsiteModeToLocalStorage();
  }
});

function addWebsiteModeToLocalStorage() {
  if (document.body.parentElement.classList.contains("dark-mode")) {
    window.localStorage.setItem("website-mode", "dark");
  } else {
    window.localStorage.setItem("website-mode", "light");
  }
}

function getWebsiteMode() {
  if (localStorage.getItem("website-mode") === "dark") {
    document.body.parentElement.classList.add("dark-mode");
  } else {
    document.body.parentElement.classList.remove("dark-mode");
  }
}

// Scroll To Top Btn
window.addEventListener("scroll", function () {
  if (window.scrollY >= 500) {
    scrollToTopBtn.classList.add("showed");
  } else {
    scrollToTopBtn.classList.remove("showed");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Forms Validation
function userNameValidation(input) {
  if (input.value === "") {
    input.parentElement.nextElementSibling.textContent =
      "لا يجب ترك هذا الحقل فارغا.";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else {
    input.parentElement.nextElementSibling.textContent = "";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = `
      <i class="fas fa-check-circle"></i> محتوي الحقل سليم.
    `;
  }
}

function telValidation(input) {
  if (input.value === "") {
    input.parentElement.nextElementSibling.textContent =
      "لا يجب ترك هذا الحقل فارغا.";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (input.value.length < 11) {
    input.parentElement.nextElementSibling.textContent = "رقم الجوال قصير جدا.";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (input.value.length > 11) {
    input.parentElement.nextElementSibling.textContent = "رقم الجوال طويل جدا.";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else {
    input.parentElement.nextElementSibling.textContent = "";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = `
      <i class="fas fa-check-circle"></i> محتوي الحقل سليم.
    `;
  }
}

function emailValidation(input) {
  if (input.value === "") {
    input.parentElement.nextElementSibling.textContent =
      "لا يجب ترك هذا الحقل فارغا.";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (!input.value.includes("@")) {
    input.parentElement.nextElementSibling.textContent =
      "يجب أن يحتوي البريد الألكتروني علي '@'";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (input.value.endsWith("@")) {
    input.parentElement.nextElementSibling.textContent =
      "يجب ألا ينتهي البريد الألكتروني ب '@'";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (!input.value.includes(".")) {
    input.parentElement.nextElementSibling.textContent =
      "يجب أن يحتوي البريد الألكتروني علي '.'";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (input.value.endsWith(".")) {
    input.parentElement.nextElementSibling.textContent =
      "يجب أن يحتوي البريد الألكتروني علي محتوي بعد ال '.'";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else if (input.value.includes("@.")) {
    input.parentElement.nextElementSibling.textContent =
      "يجب أن يحتوي البريد الألكتروني علي محتوي فاصل بين ال '@' وال '.'";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = ``;
  } else {
    input.parentElement.nextElementSibling.textContent = "";
    input.parentElement.nextElementSibling.nextElementSibling.innerHTML = `
      <i class="fas fa-check-circle"></i> محتوي الحقل سليم.
    `;
  }
}

// Start PopUps

// Close Any PopUp
allPopUps.forEach((popup) => {
  popup.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-popup")) {
      e.target.parentElement.classList.remove("show");
    }
  });
});

// Show Gift PopUp
setTimeout(function () {
  giftPopUp.classList.add("show");
}, 5000);

// Show Download PopUp
setTimeout(function () {
  downloadPopUp.classList.add("show");
}, 20000);

// End PopUps
