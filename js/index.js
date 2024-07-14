/// <reference types="../@types/jquery" />;

document.addEventListener('DOMContentLoaded', (event) => {
  getDefaultMeals();
});

const spinner = document.getElementById("spinner");
const sideBar = document.getElementById("sideBar");
const myRow = document.getElementById("rowData");
const inputsRow = document.getElementById("inputs");
const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");

menuButton.addEventListener("click", openSideBar);
closeMenu.addEventListener("click", closeSideBar);

document.getElementById("search").addEventListener("click", (e) => {
  displaySearchInputs();
  myRow.innerHTML = "";
  closeSideBar();
  
  const nameSearchInput = document.getElementById("nameSearchInput");
  const firstLetterSearchInput = document.getElementById("firstLetterSearchInput");

  nameSearchInput.addEventListener("keyup", debounce((e) => {
    console.log(nameSearchInput.value);
    getSearchedNameMeals(nameSearchInput.value);
  }, 300));

  firstLetterSearchInput.addEventListener("keyup", debounce((e) => {
    console.log(firstLetterSearchInput.value);
    if (firstLetterSearchInput.value.trim()) {
      getSearchedLetterMeals(firstLetterSearchInput.value);
    }
  }, 300));
});

document.getElementById("Categories").addEventListener("click", (e) => {
  closeSideBar();
  getCategories();
});

document.getElementById("areas").addEventListener("click", (e) => {
  closeSideBar();
  getAreas();
});

document.getElementById("ingredients").addEventListener("click", (e) => {
  closeSideBar();
  getIngredients();
});

document.getElementById("contactUs").addEventListener("click", (e) => {
  closeSideBar();
  showContactUsForm();
});

async function getDefaultMeals() {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const meals = await data.json();
    displayAllMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch default meals.');
  }
}

async function getMealDetails(mealId) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const meal = await data.json();
    displayMealDetails(meal.meals[0]);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch meal details.');
  }
}

async function getSearchedNameMeals(searchedName) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedName}`);
    const meals = await data.json();
    if (meals.meals) {
      displayAllMeals(meals);
    }
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch searched meals.');
  }
}

async function getSearchedLetterMeals(searchedLetter) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchedLetter}`);
    const meals = await data.json();
    if (meals.meals) {
      displayAllMeals(meals);
    }
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch meals by letter.');
  }
}

async function getCategories() {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const categories = await data.json();
    displayCategories(categories.categories);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch categories.');
  }
}

async function getCategoryMeals(categoryName) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const meals = await data.json();
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch category meals.');
  }
}

async function getAreas() {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const areas = await data.json();
    displayAreas(areas.meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch areas.');
  }
}

async function getAreaMeals(areaName) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    const meals = await data.json();
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch area meals.');
  }
}

async function getIngredients() {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const ingredients = await data.json();
    displayIngredients(ingredients.meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch ingredients.');
  }
}

async function getIngredientMeals(ingredientName) {
  try {
    addSpinner();
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    const meals = await data.json();
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
    alert('Failed to fetch ingredient meals.');
  }
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function removeSpinner() {
  console.log("removed");
  $("#spinner").fadeOut(1000);
  sideBar.classList.replace("hidden", "flex");
}

function addSpinner() {
  console.log("added");
  myRow.innerHTML = `
    <div class="h-screen flex justify-center items-center overflow-hidden w-full" id="spinner">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>`;
  $("#spinner").fadeIn(1000);
  sideBar.classList.replace("flex", "hidden");
}

function displaySearchInputs() {
  document.getElementById("nameSearchInput").value = "";
  document.getElementById("firstLetterSearchInput").value = "";
  inputsRow.classList.replace("hidden", "myRow");
}

function displayMeals(meals) {
  let allMeals = meals.meals;
  let rowData = " ";
  
  const mealsToDisplay = allMeals.slice(0, 20);
  for (const meal of mealsToDisplay) {
    rowData += `
      <div class="item w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer flex flex-col justify-center items-center" id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="" class="rounded-lg">
        <div class="layer rounded-lg bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[140%] group-hover:top-0 transition-all duration-500 flex items-center overflow-hidden">
          <h2 class="text-black text-2xl opacity-100 p-3 font-semibold">${meal.strMeal}</h2>
        </div>
      </div>`;
  }
  myRow.innerHTML = rowData;
  
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", (e) => {
      getMealDetails(item.id);
    });
  });
}

function displayAllMeals(meals) {
  let allMeals = meals.meals;
  let rowData = " ";
  
  for (const meal of allMeals) {
    rowData += `
      <div class="item w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer flex flex-col justify-center items-center" id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="" class="rounded-lg">
        <div class="layer rounded-lg bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[140%] group-hover:top-0 transition-all duration-500 flex items-center overflow-hidden">
          <h2 class="text-black text-2xl opacity-100 p-3 font-semibold">${meal.strMeal}</h2>
        </div>
      </div>`;
  }
  myRow.innerHTML = rowData;
  
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", (e) => {
      getMealDetails(item.id);
    });
  });
}

function displayMealDetails(meal) {
  let ingredientData = '';
  
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredientData += `
        <div class="my-3 mx-3 px-3 py-2 rounded-lg bg-white bg-opacity-20 flex">
          <p class="text-lg text-black my-auto">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</p>
        </div>`;
    }
  }

  myRow.innerHTML = `
    <div class="col-md-4 text-white text-center">
      <img src="${meal.strMealThumb}" class="w-full rounded-lg mb-3" alt="">
      <h1>${meal.strMeal}</h1>
    </div>
    <div class="col-md-8 text-white text-left">
      <h2>Instructions:</h2>
      <p>${meal.strInstructions}</p>
      <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
      <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
      <h3>Recipes :</h3>
      <div class="d-flex flex-wrap" id="recipes">${ingredientData}</div>
      <h3 class="my-2 mx-1 p-1">Tags :</h3>
      <span class="badge rounded-pill bg-warning text-dark mx-1 my-1 p-2">${meal.strTags}</span>
      <a class="btn btn-success text-white my-3" target="_blank" href="${meal.strSource}">Source</a>
      <a class="btn btn-danger text-white my-3" target="_blank" href="${meal.strYoutube}">Youtube</a>
    </div>`;
}

function displayCategories(categories) {
  let rowData = "";
  
  for (const category of categories) {
    rowData += `
      <div class="category col-md-3 w-full md:w-[22.5%] my-3 mx-auto shadow-lg" id="${category.strCategory}">
        <div class="content position-relative overflow-hidden cursor-pointer rounded-lg">
          <img src="${category.strCategoryThumb}" class="w-full" alt="">
          <div class="layer position-absolute text-center text-black rounded-lg">
            <h2 class="text-2xl font-semibold">${category.strCategory}</h2>
            <p class="text-black">${category.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>`;
  }
  
  myRow.innerHTML = rowData;
  
  document.querySelectorAll(".category").forEach(item => {
    item.addEventListener("click", (e) => {
      getCategoryMeals(item.id);
    });
  });
}

function displayAreas(areas) {
  let rowData = "";
  
  for (const area of areas) {
    rowData += `
      <div class="area col-md-3 w-full md:w-[22.5%] my-3 mx-auto shadow-lg text-center text-white" id="${area.strArea}">
        <div class="rounded-lg position-relative overflow-hidden cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h2>${area.strArea}</h2>
        </div>
      </div>`;
  }
  
  myRow.innerHTML = rowData;
  
  document.querySelectorAll(".area").forEach(item => {
    item.addEventListener("click", (e) => {
      getAreaMeals(item.id);
    });
  });
}

function displayIngredients(ingredients) {
  let rowData = "";
  
  for (const ingredient of ingredients) {
    rowData += `
      <div class="ingredient col-md-3 w-full md:w-[22.5%] my-3 mx-auto shadow-lg text-center text-white" id="${ingredient.strIngredient}">
        <div class="rounded-lg position-relative overflow-hidden cursor-pointer">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h2>${ingredient.strIngredient}</h2>
          <p>${ingredient.strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>`;
  }
  
  myRow.innerHTML = rowData;
  
  document.querySelectorAll(".ingredient").forEach(item => {
    item.addEventListener("click", (e) => {
      getIngredientMeals(item.id);
    });
  });
}

function showContactUsForm() {
  myRow.innerHTML = `
    <div class="container w-full flex justify-center items-center">
      <div class="row w-full mx-3 lg:w-3/5">
        <div class="col-md-6 text-white w-full">
          <div class="p-2">
            <input type="text" class="form-control bg-transparent my-3" placeholder="Enter Your Name">
            <input type="email" class="form-control bg-transparent my-3" placeholder="Enter Your Email">
            <input type="text" class="form-control bg-transparent my-3" placeholder="Enter Phone">
          </div>
        </div>
        <div class="col-md-6 text-white w-full">
          <div class="p-2">
            <textarea class="form-control bg-transparent my-3" placeholder="Enter Message"></textarea>
          </div>
        </div>
        <button class="btn btn-outline-danger px-2 py-1 mx-2 my-3 w-auto text-lg">Send</button>
      </div>
    </div>`;
}

function openSideBar() {
  sideBar.classList.replace("-left-64", "left-0");
  $(".open-close-icon").addClass("fa-times").removeClass("fa-align-justify");
}

function closeSideBar() {
  sideBar.classList.replace("left-0", "-left-64");
  $(".open-close-icon").addClass("fa-align-justify").removeClass("fa-times");
}
