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
  ).map((step) => step.firstChild.firstChild.value);
  const recipeIngredients = Array.from(
    document.querySelector(".recipe-ingredient-wrapper").children
  ).map((ingredient) => ingredient.firstChild.firstChild.value);
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

  let currRecipe = {};
  const recipeList = JSON.parse(localStorage.getItem("recipe_list"));
  if (recipeList.length) {
    currRecipe = recipeList.at(
      document.querySelector(".recipe-container").getAttribute("data") - 1
    );
    recipes = recipeList;
  }
  currRecipe.title = recipeTitle.value;
  currRecipe.desc = recipeDesc.value;
  currRecipe.steps = recipeSteps;
  currRecipe.ingredients = recipeIngredients;

  localStorage.setItem("recipe_list", JSON.stringify(recipes));
  localStorage.setItem(
    "current_recipe_id",
    document.querySelector(".recipe-container").getAttribute("data")
  );
  linkHandler();

  // const mappedRecipes = Array.from(recipes).map((recipe) => {
  //   return {
  //     title: currRecipe.title,
  //     desc: currRecipe.desc,
  //     steps: currRecipe.steps,
  //     ingredients: currRecipe.ingredients,
  //     id: currRecipe.id,
  //   };
  // });
  // console.log(mappedRecipes);
  // if (mappedRecipes.length) {
  //   localStorage.setItem("recipe_list", JSON.stringify(mappedRecipes));
  // }

  // recipes[recipeTitle.parentElement.getAttribute("data") - 1] = {
  //   title: recipeTitle.value,
  //   desc: recipeDesc.value,
  //   steps: recipeSteps,
  //   ingredients: recipeIngredients,
  //   id: recipeTitle.parentElement.getAttribute("data"),
  // };
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
  const recipeIngredientItemWrapper = addElement(
    "recipe-ingredient-item-wrapper",
    "li",
    document.querySelector(".recipe-ingredient-wrapper")
  );
  const recipeIngredientItemContainer = addElement(
    "recipe-ingredient-item-container",
    "div",
    recipeIngredientItemWrapper
  );

  ingredientCounter = 0;
  Array.from(
    document.querySelector(".recipe-ingredient-wrapper").children
  ).forEach((elem) => {
    ingredientCounter++;
  });
  recipeIngredientItemWrapper.setAttribute("data", ingredientCounter);

  const recipeIngredientTitle = addElement(
    "recipe-ingredient-title",
    "textarea",
    recipeIngredientItemContainer
  );
  recipeIngredientTitle.setAttribute("rows", 1);
  recipeIngredientTitle.value = ingredientTitle;
  recipeIngredientTitle.setAttribute("placeholder", "Tasty ingredient");
  recipeIngredientTitle.addEventListener("input", () => {
    recipeIngredientTitle.style.height = "";
    recipeIngredientTitle.style.height =
      recipeIngredientTitle.scrollHeight + "px";
    storeRecipeIngredient(
      recipeIngredientTitle.value,
      recipeIngredientItemContainer.getAttribute("data")
    );
  });
  const recipeIngredientRemove = addElement(
    "fa-solid fa-trash",
    "i",
    recipeIngredientItemContainer
  );
  recipeIngredientRemove.onclick = () => {
    recipeIngredientItemWrapper.parentElement.removeChild(
      recipeIngredientItemWrapper
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
    storeRecipe();
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
  const recipeStepItemWrapper = addElement(
    "recipe-step-item-wrapper",
    "li",
    document.querySelector(".recipe-step-wrapper")
  );
  const recipeStepItemContainer = addElement(
    "recipe-step-item-container",
    "div",
    recipeStepItemWrapper
  );

  stepCounter = 0;
  Array.from(document.querySelector(".recipe-step-wrapper").children).forEach(
    (elem) => {
      stepCounter++;
    }
  );
  recipeStepItemWrapper.setAttribute("data", stepCounter);

  const recipeStepTitle = addElement(
    "recipe-step-title",
    "textarea",
    recipeStepItemContainer
  );
  recipeStepTitle.setAttribute("rows", 1);
  recipeStepTitle.value = stepTitle;
  recipeStepTitle.setAttribute("placeholder", "Cook meal until done.");
  recipeStepTitle.addEventListener("input", () => {
    recipeStepTitle.style.height = "";
    recipeStepTitle.style.height = recipeStepTitle.scrollHeight + "px";
    storeRecipeStep(
      recipeStepTitle,
      recipeStepItemContainer.getAttribute("data")
    );
  });

  const recipeStepRemove = addElement(
    "fa-solid fa-trash",
    "i",
    recipeStepItemContainer
  );
  recipeStepRemove.onclick = () => {
    recipeStepItemWrapper.parentElement.removeChild(recipeStepItemWrapper);

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
    storeRecipe();
  };

  stepCounter++;
  return recipeStepTitle;
}

function addRecipeDOM(
  title = "",
  desc = "",
  steps = [],
  ingredients = [],
  id = 1
) {
  if (document.querySelector(".recipe-container")) {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.parentElement.removeChild(recipeContainer);
  }

  const recipeContainer = addElement(
    "recipe-container",
    "div",
    document.querySelector(".recipe-body")
  );
  recipeContainer.setAttribute("data", 1);

  const recipeTitle = addElement("recipe-title", "textarea", recipeContainer);
  recipeTitle.setAttribute("placeholder", "Recipe Title");
  recipeTitle.setAttribute("rows", 1);
  recipeTitle.value = title;
  recipeTitle.addEventListener("input", () => {
    recipeTitle.style.height = "";
    recipeTitle.style.height = recipeTitle.scrollHeight + "px";
    document.querySelector(
      `.tab-recipe[data="${document
        .querySelector(".recipe-container")
        .getAttribute("data")}"]`
    ).textContent = recipeTitle.value || "Amazing recipe";
    localStorage.setItem("recipe_title", recipeTitle.value);
    storeRecipe();
  });

  const recipeDesc = addElement("recipe-desc", "textarea", recipeContainer);
  recipeDesc.setAttribute("placeholder", "Describe your recipe");
  recipeDesc.textContent = desc;
  recipeDesc.setAttribute("rows", 1);
  recipeDesc.addEventListener("input", () => {
    recipeDesc.style.height = "";
    recipeDesc.style.height = recipeDesc.scrollHeight + "px";
    localStorage.setItem("recipe_desc", recipeDesc.value);
    storeRecipe();
  });

  const recipeStepContainer = addElement(
    "recipe-step-container",
    "div",
    recipeContainer
  );
  const recipeStepHeader = addElement(
    "recipe-step-header",
    "div",
    recipeStepContainer
  );
  recipeStepHeader.textContent = "Steps";
  const recipeStepWrapper = addElement(
    "recipe-step-wrapper",
    "ol",
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
  const recipeIngredientsHeader = addElement(
    "recipe-ingredients-header",
    "div",
    recipeIngredientsContainer
  );
  recipeIngredientsHeader.textContent = "Ingredients";
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

  // else {
  //   const tabRecipe = addElement(
  //     "tab-recipe",
  //     "div",
  //     document.querySelector(".saved-recipes-container")
  //   );
  //   tabRecipe.textContent = title || "Amazing recipe";
  //   tabRecipe.setAttribute("data", "1");
  //   tabClickHandler.onclick = () =>
  //     tabClickHandler(tabRecipe.getAttribute("data"));
  // }
  return [recipeTitle, recipeDesc];
}

function addRecipeTab(title = "") {
  const tabRecipeContainer = addElement(
    "tab-recipe-container",
    "div",
    document.querySelector(".saved-recipes-container")
  );
  const tabRecipe = addElement("tab-recipe", "div", tabRecipeContainer);
  tabRecipe.textContent = title || "Amazing recipe";
  const recipes = JSON.parse(localStorage.getItem("recipe_list"));
  tabRecipe.setAttribute("data", recipes.at(-1).id);
  tabRecipe.onclick = () => tabClickHandler(tabRecipe.getAttribute("data"));
  const tabRecipeRemove = addElement(
    "tab-recipe-remove",
    "i",
    tabRecipeContainer
  );
}

function addRecipeTabs() {
  const recipes = JSON.parse(localStorage.getItem("recipe_list"));
  if (recipes) {
    const savedRecipes = document.querySelector(".saved-recipes-container");
    if (savedRecipes.firstChild) {
      while (savedRecipes.firstChild) {
        savedRecipes.removeChild(savedRecipes.firstChild);
      }
    }
    recipes.forEach((recipe, index) => {
      const tabRecipeContainer = addElement(
        "tab-recipe-container",
        "div",
        document.querySelector(".saved-recipes-container")
      );
      const tabRecipe = addElement("tab-recipe", "div", tabRecipeContainer);
      tabRecipe.textContent = recipe.title || "Amazing recipe";
      tabRecipe.setAttribute("data", index + 1);
      tabRecipe.onclick = () => tabClickHandler(tabRecipe.getAttribute("data"));
    });
  }
}

function tabClickHandler(data) {
  const recipeList = JSON.parse(localStorage.getItem("recipe_list"))[data - 1];
  addRecipeDOM(
    recipeList.title,
    recipeList.desc,
    recipeList.steps,
    recipeList.ingredients,
    JSON.parse(localStorage.getItem("recipe_list")).at(-1).id
  );
  const sidebar = document.querySelector(".recipe-tab-wrapper");
  sidebar.classList.toggle("hidden");
  const recipeContainer = document.querySelector(".recipe-container");
  recipeContainer.setAttribute("data", data);
  storeRecipe();
  // addRecipeTab(document.querySelector(),recipeList.title);
}

const newRecipe = document.querySelector(".add-recipe");
newRecipe.onclick = () => {
  newRecipeClickHandler();
};

const toggleSidebar = document.getElementById("toggle-sidebar");
toggleSidebar.onclick = () => {
  const sidebar = document.querySelector(".recipe-tab-wrapper");
  sidebar.classList.toggle("hidden");
};

function newRecipeClickHandler() {
  const inputs = addRecipeDOM();
  const recipeList = JSON.parse(localStorage.getItem("recipe_list"));
  if (recipeList?.length) {
    recipes = recipeList;
  }
  if (recipes.length) {
    id = +recipes.at(-1).id + 1;
  } else {
    id = 1;
  }
  recipes.push({
    title: "",
    desc: "",
    steps: [],
    ingredients: [],
    id: id,
  });
  const recipeContainer = document.querySelector(".recipe-container");
  recipeContainer.setAttribute("data", recipes.at(-1)?.id || 1);
  localStorage.setItem("recipe_list", JSON.stringify(recipes));
  storeRecipe();
  addRecipeTab();

  // inputs.forEach((input) =>
  //   input.addEventListener("input", () => {
  //     storeRecipe();
  //   })
  // );
}

window.onload = () => {
  const recipes = JSON.parse(localStorage.getItem("recipe_list"));
  if (recipes && recipes.length) {
    addRecipeDOM(
      localStorage.getItem("recipe_title"),
      localStorage.getItem("recipe_desc"),
      JSON.parse(localStorage.getItem("recipe_steps")),
      JSON.parse(localStorage.getItem("recipe_ingredients")),
      localStorage.getItem("current_recipe_id") || 1
    );
    addRecipeTabs();
  } else {
    newRecipeClickHandler();
    storeRecipe();
  }
};

function linkHandler() {
  const whatsapplink = document.getElementById("whatsapplink");
  const recipeList = localStorage.getItem("recipe_list");

  const recipe = JSON.parse(recipeList).at(
    localStorage.getItem("current_recipe_id") - 1
  );
  let msg = `_*${recipe.title || "Amazing recipe"}*_\n\n*Description*\n${
    recipe.desc || "Easy and delicious recipe"
  }\n\n`;

  msg += `*Steps*\n`;
  if (recipe.steps.length) {
    if (!recipe.steps.every((step) => step === "")) {
      recipe.steps
        .filter((step) => step !== "")
        .forEach((step, index) => {
          msg += `${index + 1}) ${step}\n`;
        });
    } else {
      msg += `None yet\n`;
    }
  } else {
    msg += `None yet\n`;
  }
  msg += `\n*Ingredients*\n`;
  if (recipe.ingredients.length) {
    if (!recipe.ingredients.every((ingredient) => ingredient === "")) {
      recipe.ingredients
        .filter((ingredient) => ingredient !== "")
        .forEach((ingredient) => {
          msg += `- ${ingredient}\n`;
        });
    } else {
      msg += `None yet\n`;
    }
  } else {
    msg += `None yet\n`;
  }
  const link = encodeURIComponent(msg);
  whatsapplink.href = `https://wa.me/?text=${link}`;
}
