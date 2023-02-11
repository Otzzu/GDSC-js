import {API} from "./model.js";

const recipeContainer = document.querySelector(".container");
const main = document.querySelector(".main");
const search = document.querySelector(".search");
const title = document.querySelector(".title");
let meals;

title.addEventListener("mouseenter", function(){
    title.style.textDecoration = "underline";
});

title.addEventListener("mouseleave", function(){
    title.style.textDecoration = "";
});

title.addEventListener("click", async function(){
    search.classList.remove("hidden");
    recipeContainer.classList.remove("hidden");
    main.innerHTML = "";
    main.style.visibility = "hidden";
    meals = await API();
    renderMain(meals);
});

main.addEventListener("mouseover", function(e) {
    if (e.target.classList.contains("back")){
        e.target.style.textDecoration = "underline";
    }
});

main.addEventListener("mouseout", function(e) {
    if (e.target.classList.contains("back")){
        e.target.style.textDecoration = "";
    }
});

main.addEventListener("click", function(e) {
    if (e.target.classList.contains("back")){
        recipeContainer.classList.remove("hidden");
        search.classList.remove("hidden");
        main.innerHTML = "";
        main.style.visibility = "hidden";
    }
});

recipeContainer.addEventListener("mouseover", function(e) {
    const target = e.target.closest(".recipe-box");
    if (target){
        target.style.backgroundColor = "#ECE8DD";
    }
});

recipeContainer.addEventListener("mouseout", function(e) {
    const target = e.target.closest(".recipe-box");
    if (target){
        target.style.backgroundColor = "";
    }
});

recipeContainer.addEventListener("click", function(e){
    const target = e.target.closest(".recipe-box");
    recipeContainer.classList.add("hidden");
    search.classList.add("hidden");
    const recipe = meals.filter((menu) => menu.id == target.dataset.num)[0];
    main.style.visibility = "visible";

    let ingredientsText = "";

    for (const ingridient of recipe.ingredients){
        ingredientsText += `
            <p>- ${ingridient.quantity} ${ingridient.name}</p>
        `;
    }

    main.innerHTML = `
        <div class="left-div">
            <h4 class="back">< Back</h4>
            
            <div class="text">
                <img src="${recipe.imageURL}" class="big-img">
                <h1>${recipe.nama}</h1>
                <h3>Category: ${recipe.category}</h3>
                <h3>From ${recipe.area}</h3>
            </div>   
        </div>
        <div class="right-div">
            <div class="ingredients-box">
                <h3>Ingredients</h3>
                <div class="ingredients">
                    ${ingredientsText}
                </div>
            </div>
            <div class="steps-box">
                <h3>Step</h3>
                <div class="steps">
                    ${recipe.steps}
                </div>
            </div>
        </div>
    `;
});

function renderMain(recipes) {
    recipeContainer.innerHTML = "";
    for (const menu of recipes) {
        recipeContainer.insertAdjacentHTML("beforeend",`
        <div class="recipe-box" data-num="${menu.id}">
            <img class="small-img" src="${menu.imageURL}">
            <p>${menu.nama}</p>
        </div>
        `);
    }
}

search.querySelector(".search-btn").addEventListener("click", async function(e){
    e.preventDefault();
    const query = search.querySelector(".search-field").value.toLowerCase();
    meals = await API(query);
    renderMain(meals);
    search.reset();
});

(async () => {
    meals = await API();
    renderMain(meals);
})();