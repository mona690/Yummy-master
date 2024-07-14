/// <reference types="../@types/jquery" />;

let spinner = document.getElementById("spinner");
let sideBar = document.getElementById("sideBar");
let myRow = document.getElementById("rowData");
let inputsRow = document.getElementById("inputs");
let menuButton = document.getElementById("menuButton");
let closeMenu = document.getElementById("closeMenu");

$(function (e) {
  getDefaultMeals();
});

/* side nav open and close */
$("#menuButton").on("click", function (e) {
  openSideBar();
});

$("#closeMenu").on("click", function (e) {
  closeSideBar();
});

/* sideBar list item clicked event listner */
$("#search").on("click", function (e) {
  displaySearchInputs();
  myRow.innerHTML = "";
  closeSideBar();
  /*when search clicked go add eventlistener otherwise these elements not displayed so it is null*/
  document
    .getElementById("nameSearchInput")
    .addEventListener("keyup", function (e) {
      console.log(this.value);
      getSearchedNameMeals(this.value); // dont get error when name is empty or space but get default meals
    });

  document
    .getElementById("firstLetterSearchInput")
    .addEventListener("keyup", function (e) {
      console.log(this.value);
      if (this.value != "" && this.value != " ") {
        // if entered char is not space or empty go get meals else dont get meals (error)
        getSearchedLetterMeals(this.value);
      }
    });
});

$("#Categories").on("click", function (e) {
  closeSideBar();
  getCategories();
});

$("#areas").on("click", function (e) {
  closeSideBar();
  getAreas();
});

$("#ingredients").on("click", function (e) {
  closeSideBar();
  getIngredients();
});

$("#contactUs").on("click", function (e) {
  closeSideBar();
  showContactUsForm();
});

async function getDefaultMeals() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let meals = await data.json();
    //console.log(meals);

    /* when data ready remove spinner and display meals */
    displayAllMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getMealDetails(mealId) {
  try {
    addSpinner();

    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    let meal = await data.json();
    console.log(meal);
    console.log(meal.meals[0]);

    let selectedMeal = meal.meals[0];
    displayMealDetails(selectedMeal);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getSearchedNameMeals(searchedName) {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedName}`
    );
    let meals = await data.json();
    console.log(meals.meals);
    if (meals.meals != null) {
      displayAllMeals(meals);
    }
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getSearchedLetterMeals(searchedLetter) {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchedLetter}`
    );
    let meals = await data.json();
    console.log(meals);
    if (meals.meals != null) {
      displayAllMeals(meals);
    }
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getCategories() {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let categories = await data.json();
    console.log(categories);
    displayCategories(categories.categories);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getCategoryMeals(categoryName) {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    let meals = await data.json();
    console.log(meals);
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getAreas() {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list
`
    );
    let areas = await data.json();
    console.log(areas.meals);
    displayAreas(areas.meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getAreaMeals(areaName) {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
    );
    let meals = await data.json();
    console.log(meals);
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getIngredients() {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let ingredients = await data.json();
    console.log(ingredients.meals);
    displayIngredients(ingredients.meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

async function getIngredientMeals(ingredientName) {
  try {
    addSpinner();
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
    );
    let meals = await data.json();
    console.log(meals);
    displayMeals(meals);
    removeSpinner();
  } catch (error) {
    console.error(error);
  }
}

function removeSpinner() {
  console.log("removed");
  $("#spinner").fadeOut(1000);
  sideBar.classList.replace("hidden", "flex");
}

function addSpinner() {
  console.log("added");
  myRow.innerHTML = `<div
              class="h-screen flex justify-center items-center overflow-hidden w-full"
              id="spinner"
            >
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
  document.getElementById("firstLetterSearchInput").value = ""; //clear inputs values before display

  inputsRow.classList.replace("hidden", "myRow"); //display search inputs row
}

function displayMeals(meals) {
  let allMeals = meals.meals; // paramter meals is an object has an array called meals inside it

  let rowData = " ";

  //if meals less than or equal diaplay it if its greater than 20 meal only display 20 meal
  if (allMeals.length <= 20) {
    for (const meal of allMeals) {
      rowData += `
      <div class="item w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer flex flex-col justify-center items-center" id="${meal.idMeal}" >
            <img src="${meal.strMealThumb}" alt="" class="rounded-lg">
            <div class="layer rounded-lg  bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[140%] group-hover:top-0 transition-all duration-500 flex  items-center overflow-hidden ">
              <h2 class="text-black text-2xl opacity-100 p-3 font-semibold">${meal.strMeal}</h2>
            </div>
        </div> `;
    }
  } else {
    for (let i = 0; i < 20; i++) {
      rowData += `
      <div class="item w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer flex flex-col justify-center items-center" id="${allMeals[i].idMeal}" >
            <img src="${allMeals[i].strMealThumb}" alt="" class="rounded-lg">
            <div class="layer rounded-lg  bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[140%] group-hover:top-0 transition-all duration-500 flex  items-center overflow-hidden ">
              <h2 class="text-black text-2xl opacity-100 p-3 font-semibold">${allMeals[i].strMeal}</h2>
            </div>
        </div> `;
    }
  }
  myRow.innerHTML = rowData;

  $(".item").on("click", function (e) {
    console.log(this.id);
    getMealDetails(this.id);
  });
}

function displayAllMeals(meals) {
  //function that display all meals not only 20 used when display search meals and default meals only

  let allMeals = meals.meals; // paramter meals is an object has an array called meals inside it

  let rowData = " ";
  for (const meal of allMeals) {
    rowData += `
      <div class="item w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer flex flex-col justify-center items-center" id="${meal.idMeal}" >
            <img src="${meal.strMealThumb}" alt="" class="rounded-lg">
            <div class="layer rounded-lg  bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[140%] group-hover:top-0 transition-all duration-500 flex  items-center overflow-hidden ">
              <h2 class="text-black text-2xl opacity-100 p-3 font-semibold">${meal.strMeal}</h2>
            </div>
        </div> `;
  }

  myRow.innerHTML = rowData;

  $(".item").on("click", function (e) {
    console.log(this.id);
    getMealDetails(this.id);
  });
}

function displayMealDetails(meal) {
  inputsRow.classList.replace("myRow", "hidden"); //hide search inputs if it is not
  let myIngredients = "";

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      myIngredients += `<span class="px-3 py-1 m-1 bg-[#CFF4FC] rounded-lg text-[#055160]">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}  </span>`;
    }
  }

  let myTags = ""; //tags html body (cartona)

  //if meal.strTags not empty go get tags html body
  if (meal.strTags) {
    let tags = meal["strTags"].split(",").map(function (tag) {
      return tag.trim();
    }); //convert meal["strTags"] to an array of each word separated
    for (let i = 0; i < tags.length; i++) {
      myTags += `<span class="px-3 py-1 m-1 bg-[#F8D7DA] rounded-lg text-[#842029]">${tags[i]}</span>`;
    }
  }

  myRow.innerHTML = `<div class="meal w-full md:w-1/3 text-white">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded-lg" />
                <h1 class="text-4xl font-semibold">${meal.strMeal}</h1>
              </div>
              <div class="details w-full md:w-[55%] text-white">
                <h2 class="text-3xl my-2 font-bold">Instructions</h2>
                <p>
                  ${meal.strInstructions}
                </p>
                <h2 class="text-2xl my-2 font-bold">Area : ${meal.strArea}</h2>
                <h2 class="text-2xl my-2 font-bold">Category : ${meal.strCategory}</h2>
                <h2 class="text-2xl my-2 font-bold">Recipe :</h2>
                <div class="myRow">
                  ${myIngredients}
                </div>
               <div>
                <h2 class="text-2xl my-2 font-bold">Tags :</h2>
                  ${myTags}
               </div>
                <br>
                <span class="px-3 py-2 m-1 bg-green-700 rounded-lg text-white hover:bg-green-500 transition-all duration-500"><a href="${meal.strSource}" class="text-white no-underline" target="_blank">Source</a></span>
                <span class="px-3 py-2 m-1 bg-red-700 rounded-lg text-white hover:bg-red-500 transition-all duration-500"><a href="${meal.strYoutube}" class="text-white no-underline" target="_blank">Youtube</a></span>
                 

              </div>`;
}

function displayCategories(categories) {
  inputsRow.classList.replace("myRow", "hidden"); //hide search inputs if it is not
  let rowData = " ";
  for (const category of categories) {
    let disc = category.strCategoryDescription
      .split(" ")
      .slice(0, 10)
      .join(" ");
    //console.log(disc);
    rowData += `
    <div class="category w-full md:w-[22.5%] relative group overflow-hidden cursor-pointer text-center flex flex-col justify-center items-center" id="${category.strCategory}" >
          <img src="${category.strCategoryThumb}" alt="" class="rounded-lg">
          <div class="layer rounded-lg  bg-slate-400 bg-opacity-50 absolute left-0 right-0 bottom-0 top-[120%] group-hover:top-0 transition-all duration-500 flex  justify-center flex-col text-center overflow-hidden ">
            <h2 class="text-black  opacity-100 font-bold text-base  md:text-base  lg:text-2xl sm:text-3xl ">${category.strCategory}</h2>
            <p class=" md:text-sm lg:text-xl sm:text-2xl px-2">${disc}</p>
          </div>
      </div>
    
    `;
  }
  myRow.innerHTML = rowData;
  $(".category").on("click", function (e) {
    console.log(this.id);
    getCategoryMeals(this.id);
  });
}

function displayAreas(areas) {
  inputsRow.classList.replace("myRow", "hidden"); //hide search inputs if it is not
  let rowData = " ";
  for (const area of areas) {
    rowData += `
    <div class="area w-full md:w-[22.5%] relative  overflow-hidden cursor-pointer text-center flex flex-col justify-center items-center" id="${area.strArea}" >
          <i class="fa-solid fa-house-laptop text-white font-bold text-7xl"></i>
          <h2 class="text-white  opacity-100 font-bold text-base  md:text-base  lg:text-2xl sm:text-3xl ">${area.strArea}</h2>
      </div>
    
    `;
  }
  myRow.innerHTML = rowData;

  $(".area").on("click", function (e) {
    console.log(this.id);
    getAreaMeals(this.id);
  });
}

function displayIngredients(ingredients) {
  inputsRow.classList.replace("myRow", "hidden"); //hide search inputs if it is not
  let rowData = " ";
  for (let i = 0; i < 20; i++) {
    let ingredient = ingredients[i];
    let disc = ingredient["strDescription"].split(" ").slice(0, 16).join(" ");
    rowData += `
    <div class="ingredient w-full md:w-[22.5%] relative  overflow-hidden cursor-pointer text-center flex flex-col justify-center items-center" id="${ingredients[i].strIngredient}" >
          <i class="fa-solid fa-drumstick-bite  text-white font-bold text-7xl"></i>
          <h2 class="text-white  opacity-100 font-bold text-base  md:text-base  lg:text-2xl sm:text-3xl ">${ingredients[i].strIngredient}</h2>
          <p class="text-white my-2">${disc}</p>
      </div>
    
    `;
  }
  myRow.innerHTML = rowData;

  $(".ingredient").on("click", function (e) {
    console.log(this.id);
    getIngredientMeals(this.id);
  });
}

function openSideBar() {
  $("#sideBar").animate({ left: "0px" }, 600);
  $(".links li a").animate({ top: "0px" }, 900);
  menuButton.classList.add("hidden");
  document.getElementById("closeMenu").classList.replace("hidden", "block");
}

function closeSideBar() {
  $("#sideBar").animate({ left: "-250px" }, 600);
  $(".links li a").eq(0).animate({ top: "5rem" }, 900);
  $(".links li a").eq(1).animate({ top: "8rem" }, 900);
  $(".links li a").eq(2).animate({ top: "12rem" }, 900);
  $(".links li a").eq(3).animate({ top: "16rem" }, 900);
  $(".links li a").eq(4).animate({ top: "26rem" }, 900);
  closeMenu.classList.add("hidden");
  document.getElementById("menuButton").classList.replace("hidden", "block");
}

function showContactUsForm() {
  inputsRow.classList.replace("myRow", "hidden"); //hide search inputs if it is not
  myRow.innerHTML = `
    <div
        class="flex justify-center content-center flex-wrap md:h-screen "
      >
        <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="text"
            placeholder="Enter Your Name"
            id="name"
            class="w-[90%] input my-4 border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
            required
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline"
              >Special characters and numbers not allowed.</span
            >
          </div>
        </div>
        <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            class="input w-[90%]  my-4 border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
            required
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline"
              >Email not valid *exemple@yyy.zzz.</span
            >
          </div>
        </div> 

      <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="tel"
            placeholder="Enter Your phone"
            id="phone"
            class="input w-[90%] my-4 border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
            required
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline">Enter valid Phone Number.</span>
          </div>
        </div>
        <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="number"
            placeholder="Enter Your Age"
            id="age"
            class="input my-4 w-[90%] border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
            required
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline">Enter valid age.</span>
          </div>
        </div>

       <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="password"
            placeholder="Enter Your Password"
            id="pass"
            class="input my-4 w-[90%] border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline"
              >Enter valid password *Minimum eight characters, at least one
              letter and one number:*.</span
            >
          </div>
        </div>
        <div class="w-[90%] md:w-[40%] m-2">
          <input
            type="password"
            placeholder="Renter Your Password"
            id="repass"
            class=" my-4 w-[90%] border-2 outline-blue-500 text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:shadow-md focus:shadow-blue-500"
            required
          />
          <div
            class="w-[90%] hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Danger!</strong>
            <span class="block sm:inline"
              >Enter a Valid Repassword.</span
            >
          </div>
        </div>
        <button
          disabled
          id="submitButton"
          type="submit"
          class="w-1/3 mx-2 outline-red-800 bg-black text-red-800 px-2 py-2 rounded-lg border-2 border-red-800"
        >
          Submit
        </button>
      </div> `;

  $(".input").on("keyup", function (e) {
    inputsValidation(e.target);
    //validateToEnableButton();
  });
  $("#repass").on("keyup", function (e) {
    validateForRepassword(e.target);
    validateToEnableButton();
  });
}

function inputsValidation(input) {
  var inputRegex = {
    name: /^[a-zA-Z ]{1,20}$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    pass: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
  };

  let value = input.value;
  let id = input.id;

  if (inputRegex[id].test(value) == true) {
    console.log("match");
    input.classList.replace("outline-red-500", "outline-blue-500");
    input.nextElementSibling.classList.replace("block", "hidden");
    return true;
  } else {
    console.log("not match");
    input.classList.replace("outline-blue-500", "outline-red-500");
    input.nextElementSibling.classList.replace("hidden", "block");
    return false;
  }
}

function validateForRepassword(repassElement) {
  let pass = document.getElementById("pass").value;
  let repass = repassElement.value;
  if (repass == pass) {
    console.log("match");
    repassElement.classList.replace("outline-red-500", "outline-blue-500");
    repassElement.nextElementSibling.classList.replace("block", "hidden");
    return true;
  } else {
    console.log("not match");
    repassElement.classList.replace("outline-blue-500", "outline-red-500");
    repassElement.nextElementSibling.classList.replace("hidden", "block");
    return false;
  }
}

function validateToEnableButton() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let pass = document.getElementById("pass");
  let repass = document.getElementById("repass");
  let age = document.getElementById("age");
  let submitButton = document.getElementById("submitButton");
  if (
    inputsValidation(name) &&
    inputsValidation(email) &&
    inputsValidation(phone) &&
    inputsValidation(pass) &&
    inputsValidation(age) &&
    validateForRepassword(repass)
  ) {
    console.log("true");
    submitButton.removeAttribute("disabled");
    submitButton.classList.add("hover:bg-red-800");
    submitButton.classList.add("hover:text-white");
  } else {
    console.log("false");
    submitButton.setAttribute("disabled", ""); //set attribute disabled
    submitButton.classList.remove("hover:bg-red-800");
    submitButton.classList.remove("hover:text-white");
  }
}
