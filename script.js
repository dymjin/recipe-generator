const whatsappLink = document.querySelector(".share");
// const whatsappLink = encodeURI("https://wa.me/?text=urlencodedtext");
let recipeCounter = 1,
  stepCounter = 1,
  ingredientCounter = 1;
let recipes = [];
function addElement(class_name, type, parent) {
  const elem = document.createElement(type);
  elem.className = class_name;
  parent.appendChild(elem);
  return elem;
}

function storeRecipe() {
  const recipeTitle = document.querySelector(".recipe-title");
  const recipeDesc = document.querySelector(".recipe-desc");
  const recipeSteps = Array.from(
    document.querySelector(".recipe-step-wrapper").children
  ).map((step) => step.firstChild.value);
  const recipeIngredients = Array.from(
    document.querySelector(".recipe-ingredient-wrapper").children
  ).map((ingredient) => ingredient.firstChild.value);
  localStorage.setItem("recipe_title", recipeTitle.value);
  localStorage.setItem("recipe_desc", recipeDesc.value);
  localStorage.setItem("recipe_steps", JSON.stringify(recipeSteps));
  localStorage.setItem("recipe_ingredients", JSON.stringify(recipeIngredients));
  localStorage.setItem(
    "recipe_full",
    JSON.stringify({
      title: recipeTitle.value,
      desc: recipeDesc.value,
      steps: recipeSteps,
      ingredients: recipeIngredients,
      id: recipeTitle.parentElement.getAttribute("data"),
    })
  );
  recipes[recipeTitle.parentElement.getAttribute("data") - 1] = {
    title: recipeTitle.value,
    desc: recipeDesc.value,
    steps: recipeSteps,
    ingredients: recipeIngredients,
    id: recipeTitle.parentElement.getAttribute("data"),
  };

  localStorage.setItem("recipe_list", JSON.stringify(recipes));
}

function storeRecipeIngredient(ingredient, data) {
  const arr = JSON.parse(localStorage.getItem("recipe_ingredients"));
  if (data) {
    arr.splice(data - 1, 1, ingredient);
  } else {
    arr.push(ingredient);
  }
  localStorage.setItem("recipe_ingredients", JSON.stringify(arr));
  storeRecipe();
}

function addRecipeIngredientDOM(ingredientTitle = "") {
  const recipeIngredientItemContainer = addElement(
    "recipe-ingredient-item-container",
    "div",
    document.querySelector(".recipe-ingredient-wrapper")
  );

  ingredientCounter = 0;
  Array.from(recipeIngredientItemContainer.parentElement.children).forEach(
    (elem) => {
      ingredientCounter++;
    }
  );
  recipeIngredientItemContainer.setAttribute("data", ingredientCounter);

  const recipeIngredientTitle = addElement(
    "recipe-ingredient-title",
    "input",
    recipeIngredientItemContainer
  );
  recipeIngredientTitle.value = ingredientTitle;
  recipeIngredientTitle.setAttribute("placeholder", "Tasty ingredient");
  recipeIngredientTitle.addEventListener("input", () => {
    storeRecipeIngredient(
      recipeIngredientTitle.value,
      recipeIngredientItemContainer.getAttribute("data")
    );
  });
  const recipeIngredientRemove = addElement(
    "recipe-ingredient-remove",
    "button",
    recipeIngredientItemContainer
  );
  recipeIngredientRemove.textContent = "Remove ingredient";
  recipeIngredientRemove.onclick = () => {
    recipeIngredientRemove.parentElement.parentElement.removeChild(
      recipeIngredientRemove.parentElement
    );
    Array.from(
      document.querySelector(".recipe-ingredient-wrapper").children
    ).forEach((child, index) => {
      child.setAttribute("data", index + 1);
    });
    const recipeIngredients = Array.from(
      JSON.parse(localStorage.getItem("recipe_ingredients"))
    );
    recipeIngredients.splice(
      recipeIngredientItemContainer.getAttribute("data") - 1,
      1
    );
    localStorage.setItem(
      "recipe_ingredients",
      JSON.stringify(recipeIngredients)
    );
  };

  ingredientCounter++;
  return recipeIngredientTitle;
}

function storeRecipeStep(step, data) {
  const arr = JSON.parse(localStorage.getItem("recipe_steps"));
  if (!data) {
    arr.push(step.value);
  } else {
    arr.splice(data - 1, 1, step.value);
  }
  localStorage.setItem("recipe_steps", JSON.stringify(arr));
  storeRecipe();
}

function addRecipeStepDOM(stepTitle = "") {
  const recipeStepItemContainer = addElement(
    "recipe-step-item-container",
    "div",
    document.querySelector(".recipe-step-wrapper")
  );

  stepCounter = 0;
  Array.from(recipeStepItemContainer.parentElement.children).forEach((elem) => {
    stepCounter++;
  });
  recipeStepItemContainer.setAttribute("data", stepCounter);

  const recipeStepTitle = addElement(
    "recipe-step-title",
    "input",
    recipeStepItemContainer
  );
  recipeStepTitle.value = stepTitle;
  recipeStepTitle.setAttribute("placeholder", "Cook meal until done.");
  recipeStepTitle.addEventListener("input", () => {
    storeRecipeStep(
      recipeStepTitle,
      recipeStepItemContainer.getAttribute("data")
    );
  });

  const recipeStepRemove = addElement(
    "recipe-step-remove",
    "button",
    recipeStepItemContainer
  );
  recipeStepRemove.textContent = "Remove step";
  recipeStepRemove.onclick = () => {
    recipeStepRemove.parentElement.parentElement.removeChild(
      recipeStepRemove.parentElement
    );
    Array.from(document.querySelector(".recipe-step-wrapper").children).forEach(
      (child, index) => {
        child.setAttribute("data", index + 1);
      }
    );
    const recipeSteps = Array.from(
      JSON.parse(localStorage.getItem("recipe_steps"))
    );
    recipeSteps.splice(recipeStepItemContainer.getAttribute("data") - 1, 1);
    localStorage.setItem("recipe_steps", JSON.stringify(recipeSteps));
  };

  stepCounter++;
  return recipeStepTitle;
}

function addRecipeDOM(title = "", desc = "", steps = [], ingredients = []) {
  if (document.querySelector(".recipe-container")) {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.parentElement.removeChild(recipeContainer);
  }

  const recipeContainer = addElement(
    "recipe-container",
    "div",
    document.querySelector(".recipe-body")
  );
  recipeContainer.setAttribute("data", recipeCounter);
  recipeCounter++;

  const recipeTitle = addElement("recipe-title", "input", recipeContainer);
  recipeTitle.setAttribute("placeholder", "Recipe Title");
  recipeTitle.value = title;
  recipeTitle.addEventListener("input", () => {
    tabRecipe.textContent = recipeTitle.value || "Amazing recipe";
    localStorage.setItem("recipe_title", recipeTitle.value);
  });

  const recipeDesc = addElement("recipe-desc", "textarea", recipeContainer);
  recipeDesc.setAttribute("placeholder", "Describe your recipe");
  recipeDesc.textContent = desc;
  recipeDesc.addEventListener("input", () => {
    localStorage.setItem("recipe_desc", recipeDesc.value);
  });

  const recipeStepContainer = addElement(
    "recipe-step-container",
    "div",
    recipeContainer
  );
  const recipeStepWrapper = addElement(
    "recipe-step-wrapper",
    "div",
    recipeStepContainer
  );
  if (steps.length) {
    steps.forEach((step) => addRecipeStepDOM(step));
  }
  const recipeStepAdd = addElement(
    "recipe-step-add",
    "button",
    recipeStepContainer
  );
  recipeStepAdd.textContent = "Add step";
  recipeStepAdd.onclick = () => {
    const recipeStep = addRecipeStepDOM();
    storeRecipeStep(recipeStep);
  };

  const recipeIngredientsContainer = addElement(
    "recipe-ingredients-container",
    "div",
    recipeContainer
  );
  const recipeIngredientWrapper = addElement(
    "recipe-ingredient-wrapper",
    "ul",
    recipeIngredientsContainer
  );
  if (ingredients.length) {
    ingredients.forEach((ingredient) => addRecipeIngredientDOM(ingredient));
  }
  const recipeIngredientAdd = addElement(
    "recipe-ingredient-add",
    "button",
    recipeIngredientsContainer
  );
  recipeIngredientAdd.textContent = "Add ingredient";
  recipeIngredientAdd.onclick = () => {
    const recipeIngredient = addRecipeIngredientDOM();
    storeRecipeIngredient(recipeIngredient.value);
  };

  const tabRecipe = addElement(
    "tab-recipe",
    "div",
    document.querySelector(".saved-recipes-container")
  );
  tabRecipe.textContent = title || "Amazing recipe";
  tabRecipe.setAttribute("contenteditable", true);
  tabRecipe.setAttribute("data", recipeContainer.getAttribute("data"));
  return [recipeTitle, recipeDesc];
}

const newRecipe = addElement("add-recipe", "button", document.body);
newRecipe.textContent = "Add recipe";
newRecipe.onclick = () => {
  newRecipeClickHandler();
};

function newRecipeClickHandler() {
  const inputs = addRecipeDOM();
  const recipeTitle = document.querySelector(".recipe-title");
  const recipeDesc = document.querySelector(".recipe-desc");
  const recipeSteps = Array.from(
    document.querySelector(".recipe-step-wrapper").children
  ).map((step) => step.firstChild.value);
  const recipeIngredients = Array.from(
    document.querySelector(".recipe-ingredient-wrapper").children
  ).map((ingredient) => ingredient.firstChild.value);
  recipes.push({
    title: recipeTitle.value,
    desc: recipeDesc.value,
    steps: recipeSteps,
    ingredients: recipeIngredients,
    id: recipeTitle.parentElement.getAttribute("data"),
  });
  console.log(recipes);
  localStorage.setItem("recipe_list", JSON.stringify(recipes));
  inputs.forEach((input) =>
    input.addEventListener("input", () => {
      storeRecipe();
    })
  );
  storeRecipe();
}

window.onload = () => {
  if (localStorage.getItem("recipe_full")) {
    addRecipeDOM(
      localStorage.getItem("recipe_title"),
      localStorage.getItem("recipe_desc"),
      JSON.parse(localStorage.getItem("recipe_steps")),
      JSON.parse(localStorage.getItem("recipe_ingredients"))
    );
  } else {
    newRecipeClickHandler();
  }
  // title.value = params.get("recipeTitle");
  // setStorage("test", params.get("recipeTitle"));
  // setStorage("recipe_link", new URL(window.location.href));
  // console.log(JSON.stringify(new URL(window.location.href)));
};

// [title, desc].forEach((input) =>
//   input.addEventListener("input", () => {
//     const msg = encodeURIComponent(
//       `_*${title.value}*_\n\n*Description*\n${desc.value}`
//     );
//     whatsappLink.href = `https://wa.me/?text=${msg}`;
//   })
// );
