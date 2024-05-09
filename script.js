// console.log(window.location.href)
const submit = document.getElementById("submit");
const title = document.getElementById("title");
// const params = new URL(window.location.href).searchParams;

function setStorage(item, src) {
  if (localStorage.getItem(item)) {
    localStorage.setItem(item, src);
  } else {
    localStorage.setItem("test", "");
  }
}

// const whatsappLink = encodeURI("https://wa.me/?text=urlencodedtext");

window.onload = () => {
  // title.value = params.get("recipeTitle");
  setStorage("test", params.get("recipeTitle"));
  setStorage("recipe_link", new URL(window.location.href));
  // console.log(JSON.stringify(new URL(window.location.href)));
};

const whatsappLink = document.querySelector(".share");
whatsappLink.href = encodeURI(
  "_%2AAssassin%27s%20Pasta%2A_%0A%0A%2ADescription%2A%0APasta%20with%20a%20hint%20of%20suffering%20and%20pain%0A%0A%2ASteps%2A%0A1%29%20Preheat%20oven%20to%20700C.%0A2%29%20Die.%0A%0A%2AIngredients%2A%0A-%20wet%20bread%0A-%202%20ghost%20scorpion%20wet%20sock%20radioactive%20donkey%20chillies%0A%0AEnjoy%21"
);
